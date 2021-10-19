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
        :text-expr="'attrs[ID][value][0]'"
        :text-style-expr="itemTextStyleExpr"
        :style-expr="itemStyleExpr"
        :custom-data-expr="'attrs[ID][value][0]'"
        :key-expr="'id'"
      >
        <DxAutoLayout :type="'tree'" :orientation="'horizontal'" />
      </DxNodes>

      <DxEdges :data-source="edgesDataSource" :style-expr="linkStyleExpr" />

      <DxToolbox :visibility="'disabled'" />
      <DxContextToolbox :enabled="false" />
    </DxDiagram>

    <DxPopup
      v-model:visible="popupVisible"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :show-close-button="true"
      :width="200"
      :height="180"
      container="#diagram"
      :title="popupTitleText"
      ><DxPosition my="left top" :of="target" />
      <p>{{ popupContentText }}</p>
    </DxPopup>
  </div>
</template>

<script>
// <a @click="print">print</a>

// <DxTooltip
//   v-model:visible="popupVisible"
//   :close-on-outside-click="false"
//   target="#node2"
// >
//   Tooltip content
// </DxTooltip>

// <!-- @item-click="onItemClick" -->

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
      nodesDataSource: {},
      edgesDataSource: {},
      popupVisible: false,
      selectedNode: {},
      target: "",
    };
  },
  computed: {
    popupTitleText: {
      get() {
        if (!this.selectedNode.dataItem) return "";
        else return this.selectedNode.dataItem.attrs["ID"].value[0];
      },
    },
    popupContentText: {
      get() {
        // if not initialized
        if (!this.selectedNode.dataItem) return "";
        // if initialized
        else {
          // use stack unfolding of token structure to build the text
          let ret = "";
          let stack = this.selectedNode.dataItem.tokens.slice();
          // console.log({'initial stack':JSON.parse(JSON.stringify(stack))})
          while (stack.length !== 0 && ret.length < 100) {
            const token = stack.shift();
            if (token.type === "token-block") {
              stack = token.tokens.slice().concat(stack);
            } else {
              // type = 'token'
              ret += " " + token["text"];
            }
          }
          return ret.length >= 100 ? ret + "..." : ret; // eventual '...' if text is too long
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

    axios
      .get("/api/" + this.tagging_id)
      .then((res) => {
        // get the old token manager, if available
        this.tm = res.data["token_manager"];
        if (this.tm === "") {
          return;
        }

        this.tm = new TokenManager([], JSON.parse(JSON.parse(this.tm)));

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

        // get the graph's nodes
        const nodes = flattened_tm.filter((token) => token.graph);

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

        // populate the edges datsource with correct type of edges, based on nodes' attributes
        for (var node of nodes) {
          if (node.attrs["A"]["value"][0] !== "") {
            // if this node has supporters
            const supporters = node.attrs["A"]["value"][0].split(",");
            for (const supporter of supporters) {
              const fromNode = nodes.filter(
                (n) => n.attrs["ID"]["value"][0] === supporter
              )[0].id;
              if (fromNode) {
                // push a support edge
                this.edgesDataSource.push([
                  {
                    type: "insert",
                    data: { from: fromNode, to: node.id, type: "support" },
                  },
                ]);
              }
            }
          }
          if (node.attrs["CON"]["value"][0] !== "") {
            // if this node attacks others
            const attacked_nodes = node.attrs["CON"]["value"][0].split(",");
            for (const attacked of attacked_nodes) {
              const toNode = nodes.filter(
                (n) => n.attrs["ID"]["value"][0] === attacked
              )[0].id;
              if (toNode) {
                // push an attack edge
                this.edgesDataSource.push([
                  {
                    type: "insert",
                    data: { to: toNode, from: node.id, type: "attack" },
                  },
                ]);
              }
            }
          }
        }
      })
      .catch((err) => alert(err));
  },
  methods: {
    print() {
      console.log(this.popupContentText);
    },
    save() {
      console.log("saving...");

      // remove every old graph-related attribute
      for (var node of this.nodesDataSource._array) {
        node.attrs["A"]["value"][0] = "";
        node.attrs["CON"]["value"][0] = "";
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

        // modify their attributes: 'A', 'CON'
        //    NOTE: this also pushes the changes into the tokenManger already
        //    TODO: 'S' attribute??
        if (connectorType === "support") {
          // support edge
          if (toNode.attrs["A"]["value"][0] !== "") {
            // if there already is a supporter, append the new one
            toNode.attrs["A"]["value"][0] =
              toNode.attrs["A"]["value"][0] +
              "," +
              fromNode.attrs["ID"]["value"][0];
          } else {
            // else just set the supporter
            toNode.attrs["A"]["value"][0] = fromNode.attrs["ID"]["value"][0];
          }
        } else if (connectorType === "attack") {
          // attack edge
          if (fromNode.attrs["CON"]["value"][0] !== "") {
            // if there already is an attacked, append the new one
            fromNode.attrs["CON"]["value"][0] =
              fromNode.attrs["CON"]["value"][0] +
              "," +
              toNode.attrs["ID"]["value"][0];
          } else {
            // else just set the attacked
            fromNode.attrs["CON"]["value"][0] = toNode.attrs["ID"]["value"][0];
          }
        }

        // ignore edges without an assigned type (the black ones)!!!
      }

      // ######################################
      // TODO: manage the nested arguments ????
      // ######################################

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
      const csrftoken = getCookie("csrftoken");
      const params = {
        tm: JSON.stringify(this.tm),
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
          })
        )
        .catch((e) => {
          console.log(e);
        });
    },
    itemTypeExpr() {
      return "rectangle";
    },
    itemTextStyleExpr() {
      return { "font-weight": "bold", "font-size": 15 };
    },
    itemStyleExpr(obj) {
      let style = { stroke: obj.backgroundColor, "stroke-width": 4 };
      return style;
    },
    linkStyleExpr(obj) {
      // set edge color based on its type
      if (obj.type === "attack") return { stroke: "#EE5555" };
      else if (obj.type === "support") return { stroke: "#22DD66" };

      return { stroke: "#000000" }; // default for a newly created edge
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
      }
    },
    // onSelectionChanged({ items }) {
    //   console.log({ "selected item": items[0] });
    //   console.log(this.selectedNode)
    // },
    onItemClick(obj) {
      // console.log({ "item click": obj});
      if (obj.item.itemType === "shape") {
        this.selectedNode = obj.item;
        // this.popupContentText = this.selectedNode.dataItem.tokens.slice(0,15).map(t => t.text).join(' ') + "..."
      } else {
        this.selectedNode = {};
        // this.popupContentText = ""
      }
    },
    onItemDblClick(obj) {
      // if a connector is double clicked, change its type
      // not a connector -> popup
      if (obj.item.itemType === "shape") {
        this.popupVisible = true;
        return;
      }

      // get connector type and set parameters to push
      let key;
      let dataObj;
      if (obj.item.dataItem.type === "support") {
        // console.log("support => attack")
        key = obj.item.key;
        dataObj = obj.item.dataItem;
        dataObj.type = "attack";
      } else {
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
    },
    setPosition: function (event) {
      this.target = event;
    },
  },
};
</script>

<style scoped>
</style>
