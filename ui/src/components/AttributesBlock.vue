<template>
  <div id="column">
  <div class="attribute-title">
    <strong v-if="Object.keys(currentBlock).length && Object.keys(currentBlock.attrs).length && currentBlock.attrs['ID']">{{currentBlock.attrs['ID']['value']}}</strong>
    <strong v-else >{{currentBlock.label}}</strong>
  </div>

  <div v-if="Object.keys(currentBlock).length && Object.keys(currentBlock.attrs)">
    <div class="field is-horizontal" v-for="at in Object.keys(currentBlock.attrs)" :key="at.id">
      <div class="field-label is-normal">
        <label class="label tag"><strong :style="{color: currentBlock.backgroundColor }">{{at}}</strong></label>
      </div>
      <div class="field-body" v-if="at !== 'A' && at !== 'CON'">
        <div class="field">
          <p class="control">
            <input 
              v-if="currentBlock.attrs[at]['options'] && !currentBlock.attrs[at]['options'].length"
              @keydown="onKeyUp"
              v-model="currentBlock.attrs[at]['value']" 
              class="input is-normal" 
              type="text" >
          </p>
            <VueMultiselect 
              v-if="currentBlock.attrs[at]['options'] && currentBlock.attrs[at]['options'].length"
              :options="currentBlock.attrs[at]['options']"
              v-model="currentBlock.attrs[at]['value']"
              :searchable="false"
              :show-labels="false"
              style="width:100%;"
              />
        </div>
      </div>     
      <div class="field-body" v-if="at === 'A' || at === 'CON'">
        <div class="field">
          <p class="control">
            <input 
              @keydown="onKeyUp"
              v-model="currentBlock.attrs[at]['value']" 
              class="input is-normal"
              disabled
              title="You can only edit this through the Graph interface"
              type="text" >
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueMultiselect from 'vue-multiselect'

export default {
  name: "AttributesBlock",
  components: {
    VueMultiselect,
  },
  computed: {
    ...mapState(["currentBlock", "unsavedWork", "done"]),
  },
  methods: {
    ...mapMutations(["setUnsavedWork", "setDone"]),
    onKeyUp(e) {
      if (e.key === ">" || e.key === "<" || e.key === " " || e.key === '"') {
        e.preventDefault()
      } else {
        this.setUnsavedWork(true);
        this.setDone(false); 
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="css" scoped>
.attribute-title {
  width:100%; 
  margin-top:20px; 
  margin-bottom:20px; 
  text-align:center;
}
#column {
  height:400px;
  overflow-y: auto;
  overflow-x:hidden;
}
.column {
  height:80px;
}
.tag {
  padding-right: 11px; 
  padding-left: 11px; 
  margin-right: 4px;
  margin-bottom: 0px;

}
.field-label {
  margin-right: 5px;
}
</style>
