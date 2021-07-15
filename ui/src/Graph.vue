<template>
  <div class="columns is-desktop" style="margin:1px">
    <div class="column">
      <div class="panel">
        <div class="panel-heading" style="position:relative;">
            <a class="button is-link" :href="/sentenza/ + tagging_id">
              <span class="icon is-small">
                <font-awesome-icon icon="angle-left" />
              </span>
              <span>Edit Tagging</span>
            </a>
            <strong style="position:absolute; left:180px; top:20px;">Graph {{tagging_title}}</strong>
        </div>
        <DxDiagram
          id="diagram"
          ref="diagram"
          :simple-view="true"
          @request-edit-operation="onRequestEditOperation"
          @selection-changed="onSelectionChanged"
          @item-dbl-click="onItemDblClick"
        >
          <DxDefaultItemProperties :type-expr="'support'" />

          <DxNodes
            :data-source="orgItemsDataSource"
            :type-expr="'ellipse'"
            :text-expr="'attrs[ID]'"
            :text-style-expr="itemTextStyleExpr"
            :style-expr="itemStyleExpr"
          >
            <DxAutoLayout
              :type="'layered'"
              :orientation="'horizontal'"
            />
          </DxNodes>
          <DxEdges
            :data-source="orgLinksDataSource"
            :style-expr="linkStyleExpr"
          />
          <DxToolbox :visibility="'disabled'"/>
        </DxDiagram>
        <div class="panel-block">
          <div class="field is-grouped is-pulled-left">
            <p class="control">
              <button class="button is-link" @click="save">
                <span class="icon is-small">
                  <font-awesome-icon icon="check" />
                </span>
                <span>Save</span>
              </button>
            </p>
          </div>
        </div>
        <button class="button" @click="diag">diag</button>
      </div>
    </div>
  </div>
</template>

<script>
import { DxDiagram, DxNodes, DxEdges, DxToolbox, DxAutoLayout, DxDefaultItemProperties } from 'devextreme-vue/diagram';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import axios from 'axios'
import TokenManager from "./components/token-manager";
import $ from 'jquery'
import { toast } from "bulma-toast"

export default {
  components: {
    DxDiagram, DxNodes, DxEdges,DxToolbox, DxAutoLayout, DxDefaultItemProperties
  },
  data() {
    return {
      tm: {},
      orgItemsDataSource: {},
      orgLinksDataSource: {},
    };
  },
  created() {
    this.tagging_id = document.querySelector("meta[name='id-tagging']").getAttribute('content')
    this.tagging_title = document.querySelector("meta[name='title-tagging']").getAttribute('content')

    axios
        .get("/api/" + this.tagging_id)
        .then(res => {

          // the old token manager
          this.tm = res.data['token_manager']
          this.tm = new TokenManager([],JSON.parse(JSON.parse(this.tm)))

          // flatten tm with the stack technique
          const stack = [...this.tm.tokens];
          const result = [];
          while(stack.length) {
            const next = stack.pop();
            if(next.type === "token-block" && Array.isArray(next.tokens)) {
              stack.push(...next.tokens);
            }
            result.push(next);
          }
          // reverse order
          const flattened_tm = result.reverse();
          const nodes = flattened_tm.filter(token => token.graph)
          
          // console.log({'tm':this.tm})

          this.orgItemsDataSource = new ArrayStore({
            key: 'id',
            data: nodes,
          })

          this.orgLinksDataSource =  new ArrayStore({
            key: 'id',
            data: [],
          })

          for(var node of nodes) {
            if(node.attrs['A'] !== "") { // if this node has a supporter
              this.orgLinksDataSource.push([{
                type:"insert",
                data:{'from':nodes.filter(n => n.attrs['ID'] == node.attrs['A'])[0].id,'to':node.id, 'type':"support"}
              }])
            }
            else if(node.attrs['CON'] !== "") { // if this node attaks another one
              this.orgLinksDataSource.push([{
                type:"insert",
                data:{'to':nodes.filter(n => n.attrs['ID'] == node.attrs['CON'])[0].id,'from':node.id, 'type': "attack"}
              }])
            }
          }
          
        })
        .catch((err) => alert(err));
  },
  /*
  mounted() {
    setTimeout(() => {  this.initializeEdgeTypes(); }, 1000);
  }, */
  methods: {
    /*
    initializeEdgeTypes() {
      const edges = this.orgLinksDataSource._array.slice()
      console.log(edges)
      const diagram = $("#diagram").dxDiagram("instance");
      
      for(var edge of edges) {
        if(diagram.getItemByKey(edge.to)["A"] !== "") {
          console.log("support")
          diagram.getItemByKey(edge.id).texts.push("+")
          console.log(diagram.getItemByKey(edge.id).texts)
        } 
        else if(diagram.getItemByKey(edge.from)["CON"] !== "") {
          console.log("attack")
        }
      }
    },*/
    diag() {
      var diagram = $("#diagram").dxDiagram("instance")
      console.log(diagram.export())
    },
    save() {
      /*
       * save the updated tm to database
       */

      // get diagram data using jquery 
      // var diagram = $("#diagram").dxDiagram("instance");
      // // var diagramContent = diagram.export(); // load diagram content to a variable
      // console.log({'diagram SHAPES':diagram})

      // remove every old graph-related attribute
      for(var node in this.orgItemsDataSource._array) {
        for(var key in Object.keys(node.attrs)){
          if(key === "A" || key === "CON") { // TODO: 'S' attr???
            node.attrs[key] = ""
          }
        }
      }

      for(let node of this.orgItemsDataSource._array) {
        console.log(node.attrs)
      }


      // add new attrs based on connections
      for(let connector of this.orgLinksDataSource._array) {
        console.log({'connector':connector})

        var connectorType = connector.type

        // get the start and end nodes
        var fromNode = this.orgItemsDataSource._array.filter(item => item['id'] == connector.from)[0]
        var toNode = this.orgItemsDataSource._array.filter(item => item['id'] == connector.to)[0]
        console.log({'from': fromNode})
        console.log({'to'  : toNode})

        // modify their attributes: 'A', 'CON'
        //    NOTE: this pushes the changes into the tokenManger already
        //    TODO: 'S' attribute???
        if(connectorType === "support") {  // SUPPORT CONNECTOR
          if(toNode.attrs['A'] !== "") { // if not empty
            toNode.attrs['A'] = toNode.attrs['A'] + "," + fromNode.attrs['ID']
          } else {
            toNode.attrs['A'] = fromNode.attrs['ID']
          }
          console.log("SAVED A SUPPORT CONNECTOR")

        } else if(connectorType === "attack") {  // ATTACK CONNECTOR
          fromNode.attrs['CON'] = toNode.attrs['ID']
          console.log("SAVED AN ATTACK CONNECTOR")
        }
      }

      // TODO: RIMUOVI ATTRS RELATIVI A CONNECTORS RIMOSSI

      // now that all the changes have been made, push the token manager into the database
      //retrieve CSRF_TOKEN
      function getCookie(name) {
      let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken'); 
      const params = {
        'tm': JSON.stringify(this.tm),
        'cp': false, // set as not completed: the tagger will have to manually set it in the tagging page
      } 
      axios
        .post(
          "/api/update/"+this.tagging_id, 
          params,
          {  
            headers: {
              "X-CSRFToken": csrftoken,
              "content-type": "application/json",
          }}
        )
        .then(
          toast({
            message:'Graph saved',
            type:'is-success',
            dismissible:'true',
            pauseOnHover:'true',
            duration:2000,
            position:'bottom-right'
          }),
        )
        .catch((e) => {
          console.log(e);
        });
    },
    itemTextStyleExpr() {
      return { 'font-weight': 'bold', 'text-decoration': '', 'font-size': 15 };
    },
    itemStyleExpr(obj) {
      let style = { 'stroke': obj.backgroundColor.substring(0, obj.backgroundColor.length -2), 'stroke-width':4 };
      return style;
    },
    linkStyleExpr(obj) {
      // console.log({"STYLE":obj})
      if(obj.type === "attack")
        return { 'stroke': '#FF0000' }; // TODO: set color based on link text
      else if(obj.type === "support")
        return { 'stroke': "#22FF11"}
      
      return {'stroke': "#000000"}
    },
    showToast(text) {
      notify({
        position: { at: 'top', my: 'top', of: '#diagram', offset: '0 4' },
        message: text,
        type: 'warning',
        delayTime: 2000
      });
    },
    onRequestEditOperation(e) {
      if(e.operation === 'addShape') {
        if(e.reason !== 'checkUIElementAvailability') {
          this.showToast('You cannot add a Tag through the Graph interface.');
        }
        e.allowed = false;
      }
      else if(e.operation === 'deleteShape') {
        if(e.reason !== 'checkUIElementAvailability') {
          this.showToast('You cannot delete a Tag.');
        }
        e.allowed = false;
      }
      else if(e.operation === 'resizeShape') {
        if(e.args.newSize.width < 1 || e.args.newSize.height < 0.75) {
          if(e.reason !== 'checkUIElementAvailability') {
            this.showToast('The Tag size is too small.');
          }
          e.allowed = false;
        }
      } 
      else if(e.operation === 'beforeChangeShapeText') {
        if(e.reason !== 'checkUIElementAvailability') {
          this.showToast('You cannot change a Tag\'s ID through the Graph interface.');
        }
        e.allowed = false;
      }
      else if(e.operation === 'changeConnection') {
        // IF A NEW CONNECTION IS CREATED this will trigger twice: once for 'start' and once for 'end' node
        if(e.args.connector !== undefined && e.args.connector.fromId && e.args.connector.toId && e.reason !== 'checkUIElementAvailability') {
          console.log(e.args)
          console.log("connection created: " + e.args.connector.fromId + " -> " + e.args.connector.toId)
          // if(!e.args.connector.dataItem.type){
          //   console.log("DEVO ASSEGNARE TYPE")
          // }
        }
        e.allowed = true;
      }
      else if(e.operation === 'beforeChangeConnectorText') {
        e.allowed = false;
      }
      else if(e.operation === 'changeConnectorText') {
        console.log({'E':e})
        if(e.args.text === "+") {
          const key = e.args.connector.key
          const dataObj = e.args.connector.dataItem
          dataObj.type = "support"
          this.orgLinksDataSource.push([{ 
            type: "update", 
            data: dataObj, 
            key: key }]);
        }
        else if(e.args.text === "-") {
          const key = e.args.connector.key
          const dataObj = e.args.connector.dataItem
          dataObj.type = "attack"
          this.orgLinksDataSource.push([{ 
            type: "update", 
            data: dataObj, 
            key: key }]);
        }
        e.allowed = true;
      }
    },
    onSelectionChanged({ items }) {
      // if(items.length === 1 && items[0].itemType === 'connector'){
          console.log({'selected item':items[0]})
      // }
    },
    onItemDblClick(obj) {
      if(obj.item.itemType === "connector" && obj.item.dataItem.type === "attack") {
        console.log("attack => support")
        const key = obj.item.key
        const dataObj = obj.item.dataItem
        dataObj.type = "support"
        this.orgLinksDataSource.push([{ 
          type: "update", 
          data: dataObj, 
          key: key }]);
      } else if(obj.item.itemType === "connector" && obj.item.dataItem.type === "support") {
        console.log("support => attack")
        const key = obj.item.key
        const dataObj = obj.item.dataItem
        dataObj.type = "attack"
        this.orgLinksDataSource.push([{ 
          type: "update", 
          data: dataObj, 
          key: key }]);
      } else if (obj.item.itemType === "connector"){
        console.log("null => support")
        const key = obj.item.key
        const dataObj = obj.item.dataItem
        dataObj.type = "support"
        this.orgLinksDataSource.push([{ 
          type: "update", 
          data: dataObj, 
          key: key }]);
      }
    }
  }
};
</script>
<style scoped>
    #diagram {
         height: 650px;
     }
</style>
