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
          @request-edit-operation="onRequestEditOperation"
          :simple-view="true"
        >
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
// import $ from 'jquery'

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
        .get("/api/"+this.tagging_id)
        .then((res) => {

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
          
          console.log({'tm':this.tm})

          this.orgItemsDataSource = new ArrayStore({
            key: 'id',
            // FILTRO SUI TOKEN: PER ORA SELEZIONO TUTTI I BLOCKS CON ID VALIDO, BISOGNA IMPLEMENTARE
            //    LA SELEZIONE TRAMITE xs:attribute "isNode"
            data: flattened_tm.filter(token => token.type === "token-block" && token.attrs.ID)
          }),
          this.orgLinksDataSource =  new ArrayStore({
            key: 'id',
            data: []
          })
        })
    .catch((err) => alert(err));
  },
  methods: {
    
    // addNode() {
    //   this.items.push({
    //     'id':this.id++,
    //     'name': 'added',
    //     'type': 'group'
    //   });

    //   this.orgItemsDataSource.push([{
    //     type: "insert",
    //     data: this.items[this.items.length -1],
    //   }])

    //   console.log(this.items);
    // },
    

    save() {
      /*
       * save the updated tm to database
       */

      // get diagram data using jquery 
      // var diagram = $("#diagram").dxDiagram("instance");
      // var diagramContent = diagram.export(); // load diagram content to a variable

      // console.log(typeof diagramContent)

      // for each created connection 
      for(let connector of this.orgLinksDataSource._array) {
        console.log(connector)

        // get the start and end nodes
        var from = this.orgItemsDataSource._array.filter(item => item['id'] == connector.from)[0]
        var to = this.orgItemsDataSource._array.filter(item => item['id'] == connector.to)[0]
        console.log({'from': from})
        console.log({'to'  : to})


        // TODO: modify their attributes: 'S', 'A', 'CON'

        // TODO: propagate the changes to the TokenManager
        //       and POST it into the DATABASE

      }

    },
    itemTextStyleExpr() {
      return { 'font-weight': 'bold', 'text-decoration': 'underline', 'font-size': 15 };
    },
    itemStyleExpr(obj) {
      let style = { 'stroke': obj.backgroundColor.substring(0, obj.backgroundColor.length -2), 'stroke-width':4 };
      return style;
    },
    linkStyleExpr() {
      return { 'stroke': '#444444' }; // TODO: set color based on link text
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
          this.showToast('You cannot ad a Tag through the Graph interface.');
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
        console.log(e)
        }
      }
      else if(e.operation === 'beforeChangeConnectorText') {
        e.allowed = true;
      }
      else if(e.operation === 'changeConnectorText') {
        e.allowed = false;
      }
    },
  }
};
</script>
<style scoped>
    #diagram {
         height: 650px;
     }
</style>
