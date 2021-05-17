<template>
  <div id="column">
  <div class="is-multiline" v-if="!attr">
    <div class="tags is-medium">
      <div class="column" v-for="cl in classes" :key="cl.id">
        <a
          :style="{ border: cl.color}"   
          class="tag is-medium"
          :class="{ 'is-info': cl.id === currentClass.id}"
          @click="setCurrentClass(cl.id)"
        >
          <span class="panel-icon color-box" :style="{ backgroundColor: cl.color }"></span>
            <strong>{{ cl.name }}</strong>
        </a>
        <br>
      <span v-for="at in cl.attributes" :key="at.id">
          <span class="" v-if="at !== 'ID'">
            <span class="tag supertiny"><i><strong :style="{ color: cl.color }">{{at}}</strong></i></span>
          </span>
      </span>
      </div>
    </div>
  </div>
  <br>
  <div v-if="attr && Object.keys(currentBlock).length && Object.keys(currentBlock.attrs)">
    <div class="field is-horizontal" v-for="at in Object.keys(currentBlock.attrs)" :key="at.id">
      <div class="row" v-if="at !== 'ID'">
        <div class="field-label is-normal">
          <label class="label tag is-dark"><strong :style="{color: currentBlock.backgroundColor }">{{at}}</strong></label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input 
                @keyup="setUnsavedWork(true)"
                v-model="currentBlock.attrs[at]" 
                class="input is-normal" 
                type="text" >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import { mapState, mapMutations } from "vuex";

export default {
  name: "ClassesBlock",
  props:['attr'],
  computed: {
    ...mapState(["classes", "currentClass", "currentBlock", "unsavedWork"]),
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass", "setUnsavedWork"]),
    print(data) {
      console.log(data)
    }
  }
};
</script>

<style lang="css" scoped>
.color-box {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 1rem;
  border-radius:5px;
}
#column {
  height:400px;
  overflow-y: auto;
  overflow-x:hidden;
}
.supertiny {
  height:16px;
  width:16px;
  font-size:14px;
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