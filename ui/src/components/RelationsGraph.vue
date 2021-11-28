<template>
  <div>
    <DxDiagram
      id="diagram"
      ref="diagram"
      :simple-view="true"
      :show-grid="false"
      :snap-to-grid="false"
      :page-color="'#F9F9F9'"
      custom-shape-template="GraphNodeTemplate"
      @request-edit-operation="onRequestEditOperation"
      @item-dbl-click="onItemDblClick"
      @item-click="onItemClick"
      @click="setPosition"
    >
      <DxNodes
        :data-source="nodesDataSource"
        :type-expr="itemTypeExpr"
        :text-expr="itemTextExpr"
        :text-style-expr="itemTextStyleExpr"
        :style-expr="itemStyleExpr"
        :key-expr="'id'"
      >
        <DxAutoLayout :orientation="'horizontal'" :type="'layered'" />
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

    <DxPopup
      v-model:visible="popupVisible"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :show-close-button="true"
      :width="250"
      :height="200"
      container="#diagram"
      :title="popupTitleText"
      ><DxPosition my="left top" :of="target" />
      <p>{{ popupContentText }}</p>
    </DxPopup>
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
// import { DxTooltip } from 'devextreme-vue/tooltip';
import { DxPopup, DxPosition } from "devextreme-vue/popup";
import ArrayStore from "devextreme/data/array_store";
import notify from "devextreme/ui/notify";
import axios from "axios";
import TokenManager from "./token-manager";
import { toast } from "bulma-toast";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    DxDiagram,
    DxNodes,
    DxEdges,
    DxToolbox,
    DxAutoLayout,
    DxContextToolbox,
    DxPopup,
    DxPosition, //DxTooltip,
  },
  data() {
    return {
      tm: {},
      comments: "",
      nodesDataSource: {},
      edgesDataSource: {},
      popupVisible: false,
      selectedNode: {},
      target: "",
    };
  },
  computed: {
    ...mapState(["unsavedWork"]),
    popupTitleText: {
      get() {
        if (!this.selectedNode.dataItem) return "";
        else
          return (
            this.selectedNode.dataItem.label.toUpperCase() +
            " - " +
            this.selectedNode.dataItem.attrs["ID"].value[0]
          );
      },
    },
    popupContentText: {
      get() {
        // if not initialized
        if (!this.selectedNode.dataItem) return "";
        // if initialized
        else {
          return this.selectedNode.dataItem.text.length >= 100
            ? this.selectedNode.dataItem.text.substring(0, 100) + "..."
            : this.selectedNode.dataItem.text; // eventual '...' if text is too long
        }
      },
    },
  },
  created() {
    // retrive this tagging's ID and Title
    this.tagging_id = document
      .querySelector("meta[name='id-tagging']")
      .getAttribute("content");
    this.tagging_title = document
      .querySelector("meta[name='title-tagging']")
      .getAttribute("content");

    // exit confirmation if there is unsaved work
    this.setUnsavedWork(false);
    window.onbeforeunload = () => (this.unsavedWork ? true : null);

    // query for the initial token manager
    axios
      .get("/api/" + this.tagging_id)
      .then((res) => {
        // get the comments
        this.comments = res.data["comments"];
        // get the old token manager, if available
        this.tm = res.data["token_manager"];
        if (!this.tm.length) {
          return;
        }
        this.tm = new TokenManager([], JSON.parse(JSON.parse(this.tm)));
        this.initializeGraph();
      })
      .catch((err) => alert(err));
  },
  methods: {
    ...mapMutations(["setUnsavedWork"]),
    print() {
      console.log(this.popupContentText);
    },
    initializeGraph() {
      // initialize the graph with nodes and connectors

      // flatten tm with the stack technique
      const stack = [...this.tm.tokens];
      const flattened_tm = [];
      while (stack.length) {
        const next = stack.pop();
        if (next.type === "token-block" && Array.isArray(next.tokens)) {
          stack.push(...next.tokens);
          flattened_tm.push(next);
        }
      }
      // console.log(flattened_tm)

      // get the graph's nodes
      const nodes = flattened_tm.filter((token) => token.relations);

      // istantiate nodes datasource
      this.nodesDataSource = new ArrayStore({
        key: "id",
        data: nodes,
      });

      // istantiate edges datasource (initially empty)
      this.edgesDataSource = new ArrayStore({
        key: "id",
        data: [],
      });

      // populate the edges datasoruce, based on nodes' attributes
      for (let node of nodes) {
        // console.log(node);
        // for each node, check if there exist another node with the label of one of its attributes
        for (let attr_label of Object.keys(node.attrs)) {
          // ignore empty attributes
          if (!node.attrs[attr_label]["value"].length) continue;

          // extract the true label (for ex from O_REQ extract REQ)
          let target_label = "";
          if (attr_label.includes("_")) target_label = attr_label.split("_")[1];
          else target_label = attr_label;

          // if there is at least one node labelled as targetLabel
          if (
            nodes.map((node) => node.label.toUpperCase()).includes(target_label)
          ) {
            // check if there must be an edge between the two (by comparing id's)
            if (
              node.attrs[attr_label]["value"][0] &&
              nodes
                .map((n) => n.id)
                .filter(
                  (id) =>
                    node.attrs[attr_label]["value"][0]
                      .split(" | ")[1] // access id's
                      .split(" ")
                      .includes(id.toString())
                  /*|| node.attrs[attr_label]["value"].includes(id.toString()) // multi attr */
                ).length
            ) {
              // here we are sure there exist a connection between two nodes:
              // the pointer one is 'node', the pointed one has ID in node.attrs[attr_label]["value"]

              // we then cycle over every toNode:
              // not multi attr
              if (node.attrs[attr_label]["type"] === "string") {
                for (let to_id of node.attrs[attr_label]["value"][0]
                  .split(" | ")[1] // access id's
                  .split(" ")) {
                  let toNode = nodes.filter(
                    (n) => n.id.toString() === to_id.toString()
                  )[0];
                  if (toNode) {
                    // so we create the edge and push it
                    this.edgesDataSource.push([
                      {
                        type: "insert",
                        data: { to: toNode.id, from: node.id },
                      },
                    ]);
                  }
                }
              }
              /*else {
                // multi attr
                for (let to_id of node.attrs[attr_label]["value"]) {
                  let toNode = nodes.filter(
                    (n) => n.id.toString() === to_id.toString()
                  )[0];
                  if (toNode) {
                    // so we create the edge and push it
                    this.edgesDataSource.push([
                      {
                        type: "insert",
                        data: { to: toNode.id, from: node.id },
                      },
                    ]);
                  }
                }
              }
                */
            }
          }
        }
      }
    },
    save() {
      // console.log("saving...");

      // remove every old relations-graph related attribute
      for (let node of this.nodesDataSource._array) {
        for (var node2 of this.nodesDataSource._array) {
          let trueLabel = null;
          // build the true label name (containing "_")
          for (let label of Object.keys(node2.attrs)) {
            if (label.includes(node.label.toUpperCase())) {
              trueLabel = label;
              break;
            }
          }
          if (trueLabel)
            if (node2.attrs[trueLabel]["type"] !== "multi") {
              // not multi attr
              node2.attrs[trueLabel]["value"][0] = "";
            } /* else {
              node2.attrs[trueLabel]["value"] = [];
            } */
        }
      }

      // add new attrs based on existing connections
      for (let connector of this.edgesDataSource._array) {
        // get the start and end nodes
        var fromNode = this.nodesDataSource._array.filter(
          (item) => item["id"] === connector.from
        )[0];
        var toNode = this.nodesDataSource._array.filter(
          (item) => item["id"] === connector.to
        )[0];

        if (!toNode || !fromNode) {
          continue;
        }
        let trueLabel = null;
        // build the true label name (containing "_")
        for (let label of Object.keys(fromNode.attrs)) {
          if (label.includes(toNode.label.toUpperCase())) {
            trueLabel = label;
            break;
          }
        }
        // modify the fromNode attribute labelled as toNode
        if (trueLabel && fromNode.attrs[trueLabel]["value"][0] !== "") {
          // if (fromNode.attrs[trueLabel]["type"] === "multi")
          //   fromNode.attrs[trueLabel]["value"] = fromNode.attrs[trueLabel][
          //     "value"
          //   ].concat([toNode.id]);
          /* else */

          // if there already is relation from that toNode class append id and attrs['ID']
          if (fromNode.attrs[trueLabel]["type"] === "string") {
            fromNode.attrs[trueLabel]["value"][0] =
              toNode.attrs["ID"]["value"][0] +
              " " +
              fromNode.attrs[trueLabel]["value"][0] +
              " " +
              toNode.id.toString();
          }
        } else if (trueLabel) {
          // else set the first relation
          fromNode.attrs[trueLabel]["value"][0] =
            toNode.attrs["ID"]["value"][0] + " | " + toNode.id.toString();
        } else {
          this.showToast(
            "Relation from " +
              fromNode.attrs["ID"]["value"] +
              " to " +
              toNode.attrs["ID"]["value"] +
              " is not allowed and won't be saved!"
          );
        }
      }

      // for (let node of this.nodesDataSource._array) {
      //   console.log(node);
      // }

      // now that all the changes have been pushed into the TM,
      // PUT the token manager into the database, via an axios call
      function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
          const cookies = document.cookie.split(";");
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
              cookieValue = decodeURIComponent(
                cookie.substring(name.length + 1)
              );
              break;
            }
          }
        }
        return cookieValue;
      }

      // updated attributes of nested blocks
      for (let t of this.nodesDataSource._array) {
        this.tm.updateBlockAttrs(t);
      }

      const csrftoken = getCookie("csrftoken");
      const params = {
        tm: JSON.stringify(this.tm),
        comments: this.comments,
        cp: false, // set as not completed: the annotator will have to manually set it in the tagging page
      };
      axios
        .put("/api/update/" + this.tagging_id, params, {
          headers: {
            "X-CSRFToken": csrftoken,
            "content-type": "application/json",
          },
        })
        .then(
          toast({
            message: "Graph saved",
            type: "is-success",
            dismissible: "true",
            pauseOnHover: "true",
            duration: 2000,
            position: "bottom-right",
          }),
          this.setUnsavedWork(false) // no more need to ask for confirmation before exiting
        )
        .catch((e) => {
          // toast({
          //   message: "Something went wrong",
          //   type: "is-warning",
          //   dismissible: "true",
          //   pauseOnHover: "true",
          //   duration: 2000,
          //   position: "bottom-right",
          // }),
          console.log(e);
        });
    },
    itemTypeExpr() {
      return "rectangle";
    },
    itemTextExpr(item) {
      let ret = item.label.toUpperCase() + " - \n";
      if (item.text.length > 100) {
        ret += item.text.substring(0, 200) + "...";
      } else {
        ret += item.text;
      }
      if (
        item.attrs &&
        item.attrs["ID"] &&
        Object.keys(item.attrs["ID"]).length
      ) {
        ret =
          item.label.toUpperCase() +
          " - " +
          item.attrs["ID"]["value"][0] +
          "\n";
        if (item.text.length > 100) {
          ret += item.text.substring(0, 200) + "...";
        } else {
          ret += item.text;
        }
      }

      return ret;
    },
    itemTextStyleExpr() {
      return { "font-weight": "bold", "font-size": 15 };
    },
    itemStyleExpr(obj) {
      let style = { stroke: obj.backgroundColor, "stroke-width": 4 };
      return style;
    },
    edgeTextExpr(obj) {
      var fromNode = this.nodesDataSource._array.filter(
        (item) => item["id"] === obj.from
      )[0];
      var toNode = this.nodesDataSource._array.filter(
        (item) => item["id"] === obj.to
      )[0];

      if (fromNode && toNode)
        for (let label of Object.keys(fromNode.attrs)) {
          if (label.includes(toNode.label.toUpperCase())) {
            return label;
          }
        }

      return "";
    },
    edgeStyleExpr(obj) {
      var fromNode = this.nodesDataSource._array.filter(
        (item) => item["id"] === obj.from
      )[0];
      var toNode = this.nodesDataSource._array.filter(
        (item) => item["id"] === obj.to
      )[0];

      let connection_label = "";
      if (fromNode && toNode)
        for (let label of Object.keys(fromNode.attrs)) {
          if (label.includes(toNode.label.toUpperCase())) {
            connection_label = label;
          }
        }
      if (!connection_label.includes("I_")) {
        return { "stroke-dasharray": 5, "stroke-width": 1 };
      }
    },
    edgeTextStyleExpr(obj) {
      var fromNode = this.nodesDataSource._array.filter(
        (item) => item["id"] === obj.from
      )[0];
      var toNode = this.nodesDataSource._array.filter(
        (item) => item["id"] === obj.to
      )[0];

      let connection_label = "";
      if (fromNode && toNode)
        for (let label of Object.keys(fromNode.attrs)) {
          if (label.includes(toNode.label.toUpperCase())) {
            connection_label = label;
          }
        }
      if (!connection_label.includes("I_")) {
        return { "font-size": 10 };
      }

      return { "font-weight": "bold", "font-size": 15 };
    },
    showToast(text) {
      // function for in-graph toast messages
      notify({
        position: { at: "top", my: "top", of: "#diagram", offset: "0 4" },
        message: text,
        type: "warning",
        delayTime: 2000,
      });
    },
    onRequestEditOperation(e) {
      // manage the edit requests...
      if (e.operation === "addShape") {
        e.allowed = false;
      } else if (e.operation === "deleteShape") {
        e.allowed = false;
      } else if (e.operation === "resizeShape") {
        if (e.args.newSize.width < 1 || e.args.newSize.height < 0.75) {
          if (e.reason !== "checkUIElementAvailability") {
            this.showToast("The Tag size is too small.");
          }
          e.allowed = false;
        }
      } else if (e.operation === "beforeChangeShapeText") {
        e.allowed = false;
      } else if (e.operation === "beforeChangeConnectorText") {
        // do not allow having text in the connector: double click has another behaviour!!!
        e.allowed = false;
      } else if (e.operation === "changeConnectorText") {
        e.allowed = false;
      } else if (
        e.operation === "changeConnection" &&
        e.reason !== "checkUIElementAvailability"
      ) {
        if (!e.args.connector.fromKey || !e.args.connector.toKey) return;
        var fromNode = this.nodesDataSource._array.filter(
          (item) => item["id"] === e.args.connector.fromKey
        )[0];
        var toNode = this.nodesDataSource._array.filter(
          (item) => item["id"] === e.args.connector.toKey
        )[0];

        for (let label of Object.keys(fromNode.attrs)) {
          if (label.includes(toNode.label.toUpperCase())) {
            return;
          }
        }
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
      // console.log({ "item click": obj});
      if (obj.item.itemType === "shape") this.selectedNode = obj.item;
      else this.selectedNode = {};
      console.log(obj.item);
    },
    onItemDblClick(obj) {
      // not a connector -> popup
      if (obj.item.itemType === "shape") this.popupVisible = true;
    },
    setPosition: function (event) {
      this.target = event;
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
