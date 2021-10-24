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
        <DxAutoLayout :orientation="'vertical'" />
      </DxNodes>

      <DxEdges :data-source="edgesDataSource" />

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
        const nodes = flattened_tm.filter((token) => token.relations);
        // console.log(nodes)

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
          console.log(node);
          // for each node, check if there exist another node with the label of one of its attributes
          for (let attrs_label of Object.keys(node.attrs)) {
            if (!node.attrs[attrs_label]["value"].length) continue;

            // console.log(
            //   attrs_label + node.attrs[attrs_label]["value"][0].split(",")
            // );
            // console.log(attrs_label)
            if (
              nodes
                .map((node) => node.label.toUpperCase())
                .includes(attrs_label)
            ) {
              console.log(attrs_label);
              // if there's one, than check if there must be an edge between the two
              if (
                node.attrs[attrs_label]["value"][0] !== null &&
                nodes
                  .map((n) => n.attrs["ID"])
                  .filter((id) =>
                    node.attrs[attrs_label]["value"][0].split(",").includes(id)
                  )
              ) {
                // here we are sure there exist a connection between two nodes:
                // the pointed one is 'node', the other one has ID =  node.attrs[attrs_label]["value"][0]

                // we then cycle over every fromNode:
                // not multi attr
                if (node.attrs[attrs_label]["type"] !== "multi") {
                  for (let from_id of node.attrs[attrs_label]["value"][0].split(
                    ","
                  )) {
                    let fromNode = nodes.filter(
                      (n) => n.attrs["ID"]["value"][0] === from_id
                    )[0];
                    if (fromNode) {
                      // so we create the edge and push it
                      this.edgesDataSource.push([
                        {
                          type: "insert",
                          data: { from: fromNode.id, to: node.id },
                        },
                      ]);
                    }
                  }
                } else {
                  // multi attr
                  for (let from_id of node.attrs[attrs_label]["value"]) {
                    let fromNode = nodes.filter(
                      (n) => n.attrs["ID"]["value"][0] === from_id
                    )[0];
                    if (fromNode) {
                      // so we create the edge and push it
                      this.edgesDataSource.push([
                        {
                          type: "insert",
                          data: { from: fromNode.id, to: node.id },
                        },
                      ]);
                    }
                  }
                }
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

      // remove every old relations-graph related attribute
      for (let node of this.nodesDataSource._array) {
        for (var node2 of this.nodesDataSource._array) {
          if (node2.attrs[node.label.toUpperCase()])
            if (node2.attrs[node.label.toUpperCase()]["type"] !== "multi") {
              // not multi attr
              node2.attrs[node.label.toUpperCase()]["value"][0] = "";
            } else {
              node2.attrs[node.label.toUpperCase()]["value"] = [];
            }
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

        // modify the toNode attribute labelled as fromNode
        //    NOTE: this also pushes the changes into the tokenManger already
        if (toNode.attrs[fromNode.label.toUpperCase()]["value"][0] !== "") {
          // if there already is relation from that fromNode class, check if it is not a 'mutual' attr
          if (toNode.attrs[fromNode.label.toUpperCase()]["type"] === "multi")
            toNode.attrs[fromNode.label.toUpperCase()]["value"] = toNode.attrs[
              fromNode.label.toUpperCase()
            ]["value"].concat([fromNode.attrs["ID"]["value"][0]]);
          else if (
            toNode.attrs[fromNode.label.toUpperCase()]["type"] === "string"
          )
            toNode.attrs[fromNode.label.toUpperCase()]["value"][0] += ",";
          fromNode.attrs["ID"]["value"][0];
        } else {
          // else just set the relation
          toNode.attrs[fromNode.label.toUpperCase()]["value"][0] =
            fromNode.attrs["ID"]["value"][0];
        }
      }

      for (let node of this.nodesDataSource._array) {
        console.log(node);
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
      if (obj.item.itemType === "shape") this.selectedNode = obj.item;
      else this.selectedNode = {};
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
</style>
