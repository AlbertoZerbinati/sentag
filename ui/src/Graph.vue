<template>
  <div class="columns is-desktop" style="margin:1px">
    <div class="column">
      <div class="panel">
        <div class="panel-heading">
          <div class="is-pulled-left">
            <a class="button is-primary" align="center" :href="/sentenza/ + tagging_id"> >- Edit Tagging</a>
          </div>
            <strong style="margin-left:12px;">Graph {{tagging_title}}</strong>
        </div>
          <DxDiagram
            id="diagram"
            ref="diagram"
            :simple-view="true"
          >
            <DxNodes
              :data-source="orgItemsDataSource"
              :type-expr="itemTypeExpr"
              :text-expr="'attrs[ID]'"
              :width-expr="itemWidthExpr"
              :height-expr="itemHeightExpr"
              :text-style-expr="itemTextStyleExpr"
              :style-expr="itemStyleExpr"
              :color="'backgroundColor'"
            >
              <DxAutoLayout
                :type="'tree'"
                :orientation="'vertical'"
              />
            </DxNodes>
            <DxToolbox :visibility="'disabled'"/>
          </DxDiagram>
      </div>
    </div>
  </div>

<button class="button" @click="addNode()">add</button>
</template>

<script>
import { DxDiagram, DxNodes, DxAutoLayout, DxToolbox } from 'devextreme-vue/diagram';
import ArrayStore from 'devextreme/data/array_store';
import service from './assets/data.js';
import axios from 'axios'
import TokenManager from "./components/token-manager";

export default {
  components: {
    DxDiagram, DxNodes, DxAutoLayout, DxToolbox
  },
  data() {
    return {
      tm: {},
      items: service.getOrgItems(),
      id:1111,
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
          console.log({'tm':this.tm})


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
          // reverse to restore order
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
            data: service.getOrgLinks()
          })
        })
    .catch((err) => alert(err));
  },
  methods: {
    addNode() {
      this.items.push({
        'id':this.id++,
        'name': 'added',
        'type': 'group'
      });

      this.orgItemsDataSource.push([{
        type: "insert",
        data: this.items[this.items.length -1],
      }])

      console.log(this.items);
    },
    itemTypeExpr(obj, value) {
      if(value) {
        obj.type = (value === 'rectangle') ? undefined : 'group';
      } else {
        return obj.type === 'group' ? 'ellipse' : 'rectangle';
      }
    },
    itemWidthExpr(obj, value) {
      if(value) {
        obj.width = value;
      } else {
        return obj.width || (obj.type === 'group' && 1.5) || 1;
      }
    },
    itemHeightExpr(obj, value) {
      if(value) {
        obj.height = value;
      } else {
        return obj.height || (obj.type === 'group' && 1) || 0.75;
      }
    },
    itemTextStyleExpr(obj) {
      if(obj.level === 'senior') {
        return { 'font-weight': 'bold', 'text-decoration': 'underline' };
      }
      return {};
    },
    itemStyleExpr(obj) {
      let style = { 'stroke': '#444444' };
      if(obj.type === 'group') {
        style['fill'] = '#f3f3f3';
      }
      return style;
    },
    linkStyleExpr() {
      return { 'stroke': '#444444' };
    },
    linkFromLineEndExpr() {
      return 'none';
    },
    linkToLineEndExpr() {
      return 'none';
    }
  }
};
    // #diagram {
    //      height: 1200px;
    //  }
</script>
<style scoped>
</style>
