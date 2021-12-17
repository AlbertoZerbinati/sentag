<template>
  <div>
    <DxDiagram
      id="diagram"
      ref="diagram"
      :simple-view="true"
      :show-grid="false"
      :snap-to-grid="false"
      :page-color="'#F9F9F9'"
      :units="'px'"
      @request-edit-operation="onRequestEditOperation"
      @item-dbl-click="onItemDblClick"
      @item-click="onItemClick"
    >
      <DxNodes
        :data-source="nodesDataSource"
        :type-expr="itemTypeExpr"
        :text-expr="itemTextExpr"
        :text-style-expr="itemTextStyleExpr"
        :style-expr="itemStyleExpr"
        :key-expr="'id'"
      >
        <DxAutoLayout :type="'layered'" :orientation="'horizontal'" />
      </DxNodes>

      <DxEdges
        :data-source="edgesDataSource"
        :text-expr="edgeTextExpr"
        :style-expr="edgeStyleExpr"
        :text-style-expr="edgeTextStyleExpr"
      />

      <DxToolbox :visibility="'disabled'" />
      <DxContextToolbox :enabled="false" />
    </DxDiagram>
  </div>
</template>

<script>
import {
  DxDiagram,
  DxNodes,
  DxEdges,
  DxToolbox,
  DxAutoLayout,
  DxContextToolbox,
} from "devextreme-vue/diagram";
import ArrayStore from "devextreme/data/array_store";
import notify from "devextreme/ui/notify";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    DxDiagram,
    DxNodes,
    DxEdges,
    DxToolbox,
    DxAutoLayout,
    DxContextToolbox,
  },
  data() {
    return {
      tm: {},
      comments: "",
      nodesDataSource: {},
      edgesDataSource: {},
      popupVisible: false,
      target: "",
      nodesTextLengths: {},
    };
  },
  computed: {
    ...mapState([
      "unsavedWork",
      "tokenManager",
      "currentBlock",
      "argumentsGraphJSON",
    ]),
  },
  beforeUnmount() {
    this.save();
  },
  created() {
    // build the initial graph from token manager
    this.initializeGraph();
  },
  mounted() {
    // reload the graphical configuration of the graph
    if (this.argumentsGraphJSON && this.argumentsGraphJSON.includes("shapes")) {
      // memorize the edge type in order to reset after the import
      let edges = [];
      for (let edge of this.edgesDataSource._array) {
        edges.push({ ...edge });
      }

      // import old configuration
      this.$refs.diagram.instance.import(this.argumentsGraphJSON, true);

      // reset the edge types
      for (let edge of this.edgesDataSource._array) {
        const key = edge.id;
        const dataObj = edge;
        let old_edge = edges.find(
          (e) => e.from == edge.from && e.to == edge.to
        );
        dataObj.type = old_edge.type;

        const index = edges.indexOf(old_edge);
        if (index > -1) {
          edges.splice(index, 1);
        }

        // push the change
        this.edgesDataSource.push([
          {
            type: "update",
            data: dataObj,
            key: key,
          },
        ]);
      }

      // set the nodesTextLengths
      for (let shape of JSON.parse(this.argumentsGraphJSON)["shapes"]) {
        const w = shape.width / 15;
        const h = shape.height / 15;
        this.nodesTextLengths[shape.dataKey] = this.findTextLength(w, h);
      }
    }
  },
  methods: {
    ...mapMutations([
      "setUnsavedWork",
      "setCurrentBlock",
      "setArgumentsGraphJSON",
    ]),
    initializeGraph() {
      // initialize the graph with nodes and connectors

      // flatten tm with the stack technique
      const stack = [...this.tokenManager.tokens];
      const flattened_tm = [];
      while (stack.length) {
        const next = stack.pop();
        if (next.type === "token-block" && Array.isArray(next.tokens)) {
          stack.push(...next.tokens);
          flattened_tm.push(next);
        }
      }

      // get the graph's nodes
      const nodes = flattened_tm.filter((token) => token.graph).reverse();
      for (let i = 0; i < nodes.length; i++) {
        this.nodesTextLengths[nodes[i].id] = 100; // initialize length of every node to 100
      }

      // istantiate nodes datasource
      this.nodesDataSource = new ArrayStore({
        key: "id",
        data: nodes,
      });

      // istantiate edges datasource (initially empty)
      this.edgesDataSource = new ArrayStore({
        key: "id",
        data: [],
        onUpdated: () => {
          // b.type = "support";
          // console.log("update");
          // console.log(a, b);
          this.save();
        },
        onPush: (a) => {
          console.log(a);
          if (
            a[0].type == "insert" &&
            a[0].data.type != "support" &&
            a[0].data.type != "attack"
          )
            a[0].data.type = "support";
        },
      });

      // populate the edges datsource with correct type of edges, based on nodes' attributes
      for (var node of nodes) {
        if (node.attrs["PRO"] && node.attrs["PRO"]["value"][0] !== "") {
          // if this node supportes others
          if (node.attrs["PRO"]["value"][0].split(" | ").length > 1) {
            const supported = node.attrs["PRO"]["value"][0]
              .split(" | ")[1]
              .split(" ");
            for (const sup of supported) {
              const toNode = nodes.filter((n) => n.id.toString() === sup)[0];
              if (toNode) {
                // push a support edge
                this.edgesDataSource.push([
                  {
                    type: "insert",
                    data: { from: node.id, to: toNode.id, type: "support" },
                  },
                ]);
              }
            }
          }
        }
        if (node.attrs["CON"] && node.attrs["CON"]["value"][0] !== "") {
          // if this node attacks others
          if (node.attrs["CON"]["value"][0].split(" | ").length > 1) {
            const attacked_nodes = node.attrs["CON"]["value"][0]
              .split(" | ")[1]
              .split(" ");
            // console.log(attacked_nodes);
            for (const attacked of attacked_nodes) {
              const toNode = nodes.filter(
                (n) => n.id.toString() === attacked
              )[0];
              // console.log(nodes.map((n) => n.id));
              if (toNode) {
                // push an attack edge
                this.edgesDataSource.push([
                  {
                    type: "insert",
                    data: { from: node.id, to: toNode.id, type: "attack" },
                  },
                ]);
              }
            }
          }
        }
      }
    },
    save() {
      // console.log("saving arg graph...");

      // remove every old graph-related attribute
      for (var node of this.nodesDataSource._array) {
        if (node.attrs["PRO"]) node.attrs["PRO"]["value"] = [""];
        if (node.attrs["CON"]) node.attrs["CON"]["value"] = [""];
        // TODO: 'S' attribute??
      }

      // add new attrs based on existing connections
      for (let connector of this.edgesDataSource._array) {
        // get the connector type
        var connectorType = connector.type;

        // get the start and end nodes
        var fromNode = this.nodesDataSource._array.filter(
          (item) => item["id"] == connector.from
        )[0];
        var toNode = this.nodesDataSource._array.filter(
          (item) => item["id"] == connector.to
        )[0];
        if (!toNode || !fromNode) {
          continue;
        }

        // modify their attributes: 'PRO', 'CON'
        //    NOTE: this also pushes the changes into the tokenManger already
        //    TODO: 'S' attribute??
        if (connectorType === "support") {
          // support edge
          if (fromNode.attrs["PRO"]) {
            if (fromNode.attrs["PRO"]["value"][0] !== "") {
              // if there already is a supporter, append the new one
              fromNode.attrs["PRO"]["value"][0] =
                toNode.attrs["ID"]["value"][0] +
                " " +
                fromNode.attrs["PRO"]["value"][0] +
                " " +
                toNode.id.toString();
            } else {
              // else just set the supporter
              fromNode.attrs["PRO"]["value"][0] =
                toNode.attrs["ID"]["value"][0] + " | " + toNode.id.toString();
            }
          } else {
            this.showToast(
              "PRO connection from " +
                fromNode.attrs["ID"]["value"][0] +
                " to " +
                toNode.attrs["ID"]["value"][0] +
                " not allowed!"
            );
          }
        } else if (connectorType === "attack") {
          // attack edge
          if (fromNode.attrs["CON"]) {
            if (fromNode.attrs["CON"]["value"][0] !== "") {
              // if there already is an attacked, append the new one
              fromNode.attrs["CON"]["value"][0] =
                toNode.attrs["ID"]["value"][0] +
                " " +
                fromNode.attrs["CON"]["value"][0] +
                " " +
                toNode.id.toString();
            } else {
              // console.log("from", fromNode.id, "to", toNode.id, connector.type);
              // else just set the attacked
              fromNode.attrs["CON"]["value"][0] =
                toNode.attrs["ID"]["value"][0] + " | " + toNode.id.toString();
            }
          } else {
            this.showToast(
              "CON connection from " +
                fromNode.attrs["ID"]["value"][0] +
                " to " +
                toNode.attrs["ID"]["value"][0] +
                " not allowed!"
            );
          }
        }
        // else {
        //   // no-type edge
        //   this.showToast(
        //     "Please select a relation type from " +
        //       fromNode.attrs["ID"]["value"][0] +
        //       " to " +
        //       toNode.attrs["ID"]["value"][0] +
        //       " !"
        //   );
        // }

        // ignore edges without an assigned type (the black ones)!!!
      }

      // updated attributes of nested blocks
      for (let t of this.nodesDataSource._array) {
        this.tokenManager.updateBlockAttrs(t);
      }

      // after saving the arcs in the TM, we need to save the graph's layout as JSON string
      // so we export it and then we will reimport it in order to have the same positions and everything as we left it
      this.setArgumentsGraphJSON(this.$refs.diagram.instance.export());
    },
    itemTypeExpr() {
      return "ellipse";
    },
    itemTextExpr(item) {
      let completeText = item.label.toUpperCase() + " - ";
      if (
        item.attrs &&
        item.attrs["ID"] &&
        Object.keys(item.attrs["ID"]).length
      ) {
        completeText += item.attrs["ID"]["value"][0];
      }
      completeText += "\n";
      completeText += item.text;

      return completeText.substring(0, this.nodesTextLengths[item.id]);
    },
    itemTextStyleExpr() {
      return { "font-weight": "bold", "font-size": 15 };
    },
    itemStyleExpr(obj) {
      let style = { stroke: obj.backgroundColor, "stroke-width": 4 };
      return style;
    },
    edgeStyleExpr(obj) {
      // set edge color based on its type
      if (obj.type === "attack")
        return { stroke: "#EE5555", "stroke-width": 2 };
      else if (obj.type === "support")
        return { stroke: "#22DD66", "stroke-width": 2 };

      return { stroke: "#000000", "stroke-width": 2 }; // default for a newly created edge
    },
    edgeTextStyleExpr() {
      return { "font-size": 13 };
    },
    edgeTextExpr(obj) {
      if (obj.type === "attack") return "CON";
      else if (obj.type === "support") return "PRO";
      return "double click to change the relation type";
    },
    showToast(text) {
      // function for in-graph toast messages
      notify({
        position: { at: "top", my: "top", of: "#diagram", offset: "0 4" },
        message: text,
        type: "warning",
        delayTime: 2500,
      });
    },
    onRequestEditOperation(e) {
      // manage the edit requests...
      if (e.operation === "addShape") {
        e.allowed = false;
      } else if (e.operation === "deleteShape") {
        e.allowed = false;
      } else if (e.operation === "resizeShape") {
        const w = e.args.newSize.width;
        const h = e.args.newSize.height;
        const l = this.findTextLength(w, h);
        // console.log({ w: w, h: h, l: l });
        this.nodesTextLengths[e.args.shape.key] = l;
      } else if (e.operation === "beforeChangeShapeText") {
        e.allowed = false;
      } else if (e.operation === "beforeChangeConnectorText") {
        // do not allow having text in the connector: double click has another behaviour!!!
        e.allowed = false;
      } else if (e.operation === "changeConnectorText") {
        e.allowed = false;
      } else {
        this.setUnsavedWork(true); // some modifications have occurred -> need to save before exiting
      }
    },
    // onSelectionChanged({ items }) {
    //   console.log({ "selected item": items[0] });
    //   console.log(this.selectedNode)
    // },
    onItemClick(obj) {
      // console.log({ "item click": obj.item.dataItem });

      if (obj.item.itemType === "shape") {
        // this.save();
        this.setCurrentBlock(
          this.tokenManager.findTokenBlock(obj.item.dataItem.id)
        );
        // console.log(this.currentBlock);
      } else {
        // if a connector is clicked, change its type
        let key;
        let dataObj;
        if (
          obj.item.itemType == "connector" &&
          obj.item.dataItem.type === "support"
        ) {
          // console.log("support => attack")
          key = obj.item.key;
          dataObj = obj.item.dataItem;
          dataObj.type = "attack";
        } else if (obj.item.itemType == "connector") {
          // default connector does not have any type!! -> on double click assing support type
          // console.log("null or attack => support")
          key = obj.item.key;
          dataObj = obj.item.dataItem;
          dataObj.type = "support";
        }

        // push the change
        this.edgesDataSource.push([
          {
            type: "update",
            data: dataObj,
            key: key,
          },
        ]);

        if (this.currentBlock && obj.item.itemType === "connector") {
          this.setCurrentBlock(
            this.tokenManager.findTokenBlock(this.currentBlock.id)
          );
        }
      }
      // else {
      //   this.setCurrentBlock(
      //     this.tokenManager.findTokenBlock(this.currentBlock.id)
      //   );
      // }
    },
    onItemDblClick() {},
    findTextLength(w, h) {
      // these coefficients were calculated through linear regression, after collecting empirical data
      let val =
        -8.126482949847684 +
        w * -0.13599902 +
        h * -0.2172954 +
        w * h * 0.00569047;
      return val * 0.95 <= 5 ? 5 : val * 0.95;
    },
  },
};
</script>

<style scoped>
#diagram {
  position: relative;
  height: 700px;
}
</style>
