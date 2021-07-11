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
        >

          <DxNodes
            :data-source="orgItemsDataSource"
            :type-expr="'Ellipse'"
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
import { DxDiagram, DxNodes,DxEdges, DxToolbox, DxAutoLayout } from 'devextreme-vue/diagram';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import axios from 'axios'
import TokenManager from "./components/token-manager";
import $ from 'jquery'
import { toast } from "bulma-toast"

export default {
  components: {
    DxDiagram, DxNodes, DxEdges,DxToolbox, DxAutoLayout
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

          //il vecchio token manager
          this.tm = res.data['token_manager']
          this.tm = new TokenManager([],JSON.parse(JSON.parse(this.tm)))

          // flatten tm with the stack technique
          const stack = [...this.tm.tokens];
          const result = [];
          while(stack.length) {
            // pop value from stack
            const next = stack.pop();
            if(next.type === "token-block" && Array.isArray(next.tokens)) {
              // push back array items, won't modify the original input
              stack.push(...next.tokens);
            }
            result.push(next);
            
          }
          // reverse order
          const flattened_tm = result.reverse();
          const nodes = flattened_tm.filter(token => token.graph)
          
          console.log({'tm':this.tm})

          this.orgItemsDataSource = new ArrayStore({
            key: 'id',
            // FILTRO SUI TOKEN: PER ORA SELEZIONO TUTTI I BLOCKS CON ID VALIDO, BISOGNA IMPLEMENTARE
            //    LA SELEZIONE TRAMITE xs:attribute "isNode"
            data: nodes,
          })

          this.orgLinksDataSource =  new ArrayStore({
            key: 'id',
            data: [],
            reshapeOnPush: true
          })


          this.initialize()

          // var diagram = $("#diagram").dxDiagram("instance")
          // diagram.contentReady(() => {
          //   this.initialize()
          // })
          

        })
        .catch((err) => alert(err));
  },
  methods: {
    initialize() {
      console.log({'INITIALIZE:TM':this.tm})
      const stack = [...this.tm.tokens];
      const result = [];
      while(stack.length) {
        // pop value from stack
        const next = stack.pop();
        if(next.type === "token-block" && Array.isArray(next.tokens)) {
          // push back array items, won't modify the original input
          stack.push(...next.tokens);
        }
        result.push(next);
        
      }
      // reverse order
      const flattened_tm = result.reverse();
      const nodes = flattened_tm.filter(token => token.graph)
      var lastId = 100

      for(var node of nodes) {
        if(node.attrs['A'] !== "") { // if this node has a supporter
          this.orgLinksDataSource.push([{
            type:"insert",
            data:{'id':lastId,'from':nodes.filter(n => n.attrs['ID'] == node.attrs['A'])[0].id,'to':node.id}
          }])

          var x = this.$refs;
          console.log(x)
          
          // var diagram = $("#diagram").dxDiagram("instance")
          // console.log(diagram.export())
          // var connector = diagram.getItemByKey(lastId)
          // console.log({'INITIALIZE:CONN':connector})
          // connector.texts.push("+")

          lastId = lastId+1
        }
        else if(node.attrs['CON'] !== "") { // if this node attaks another one
          this.orgLinksDataSource.push([{
            type:"insert",
            data:{'id':lastId,'to':nodes.filter(n => n.attrs['ID'] == node.attrs['CON'])[0].id,'from':node.id, 'text':"-"}
          }])
          lastId = lastId+1
        }
      }
    },
    diag() {
      var diagram = $("#diagram").dxDiagram("instance")
      console.log(diagram.export())
    },
    save() {
      /*
       * save the updated tm to database
       */

      // get diagram data using jquery 
      var diagram = $("#diagram").dxDiagram("instance");
      // var diagramContent = diagram.export(); // load diagram content to a variable

      console.log({'diagram':diagram})

      // console.log({'links':this.orgLinksDataSource})

      // for each created connection 
      for(let connector of this.orgLinksDataSource._array) {
        console.log({'connector':connector})

        // extract the full connector object from the diagram 
        var fullConnector = diagram.getItemByKey(connector.id)
        console.log({'full connector':fullConnector})
        var connectorType = fullConnector.texts[0] // ASSUMING THERE IS ONLY AND EXACTLY ONE TEXT PER CONNECTOR, RATHER '+' OR '-'

        // get the start and end nodes
        var fromNode = this.orgItemsDataSource._array.filter(item => item['id'] == connector.from)[0]
        var toNode = this.orgItemsDataSource._array.filter(item => item['id'] == connector.to)[0]
        console.log({'from': fromNode})
        console.log({'to'  : toNode})


        // modify their attributes: 'A', 'CON'
        //    NOTE: this pushes the changes into the tokenManger already
        //    TODO: 'S' attribute???
        if(connectorType.trim() === "+") {  // SUPPORT CONNECTOR
          toNode.attrs['A'] = fromNode.attrs['ID']
          console.log("THIS IS A SUPPORT CONNECTOR")

        } else if(connectorType.trim() === "-") {  // ATTACK CONNECTOR
          fromNode.attrs['CON'] = toNode.attrs['ID']
          console.log("THIS IS AN ATTACK CONNECTOR")
        }
      }

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
      return { 'font-weight': 'bold', 'text-decoration': 'underline', 'font-size': 15 };
    },
    itemStyleExpr(obj) {
      let style = { 'stroke': obj.backgroundColor.substring(0, obj.backgroundColor.length -2), 'stroke-width':4 };
      return style;
    },
    linkStyleExpr() {
      return { 'stroke': '#FF0000' }; // TODO: set color based on link text
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
          console.log("connection created: " + e.args.connector.fromId + " -> " + e.args.connector.toId)
        }
        e.allowed = true;
      }
      else if(e.operation === 'beforeChangeConnectorText') {
        e.allowed = true;
      }
      else if(e.operation === 'changeConnectorText') {
        e.allowed = true;
      }
    },
    onSelectionChanged({ items }) {
      // if(items.length === 1 && items[0].itemType === 'connector'){
          console.log({'selected item':items[0]})
      // }
    }
  }
};
</script>
<style scoped>
    #diagram {
         height: 650px;
     }
</style>
