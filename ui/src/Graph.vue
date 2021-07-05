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
          >
            <DxNodes
              :data-source="orgItemsDataSource"
              :type-expr="itemTypeExpr"
              :text-expr="'name'"
              :width-expr="itemWidthExpr"
              :height-expr="itemHeightExpr"
              :text-style-expr="itemTextStyleExpr"
              :style-expr="itemStyleExpr"
            >
              <DxAutoLayout
                :type="'tree'"
                :orientation="'vertical'"
              />
            </DxNodes>
            <DxEdges
              :data-source="orgLinksDataSource"
              :from-line-end-expr="linkFromLineEndExpr"
              :style-expr="styleExpr"
            />
            <DxToolbox>
              <DxGroup
                :category="'general'"
                :title="'General'"
              />
            </DxToolbox>
          </DxDiagram>
      </div>
    </div>
  </div>

<button class="button" @click="addNode()">add</button>
</template>

<script>
import { DxDiagram, DxNodes, DxAutoLayout, DxEdges, DxToolbox, DxGroup } from 'devextreme-vue/diagram';
import ArrayStore from 'devextreme/data/array_store';
import service from './assets/data.js';

export default {
  components: {
    DxDiagram, DxNodes, DxAutoLayout, DxEdges, DxToolbox, DxGroup
  },
  data() {
    return {
      items: service.getOrgItems(),
      id:1111,
      orgItemsDataSource: new ArrayStore({
        key: 'id',
        data: service.getOrgItems()
      }),
      orgLinksDataSource: new ArrayStore({
        key: 'id',
        data: service.getOrgLinks()
      })
    };
  },
  created() {
    this.tagging_id = document.querySelector("meta[name='id-tagging']").getAttribute('content')
    this.tagging_title = document.querySelector("meta[name='title-tagging']").getAttribute('content')
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
