<template>
  <div id="column">
  <div v-if="Object.keys(currentBlock).length && Object.keys(currentBlock.attrs)">
    <div class="field is-horizontal" v-for="at in Object.keys(currentBlock.attrs)" :key="at.id">
      <div class="field-label is-normal">
        <label class="label tag is-dark"><strong :style="{color: currentBlock.backgroundColor }">{{at}}</strong></label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input 
              @keyup="setUnsavedWork(true); setDone(false)"
              v-model="currentBlock.attrs[at]" 
              class="input is-normal" 
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

export default {
  name: "AttributesBlock",
  computed: {
    ...mapState(["classes", "currentClass", "currentBlock", "unsavedWork", "done"]),
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass", "setUnsavedWork", "setDone"]),
  }
};
</script>

<style lang="css" scoped>
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