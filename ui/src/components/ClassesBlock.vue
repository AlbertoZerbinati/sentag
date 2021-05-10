<template>
  <div id="column">
  <div class="is-multiline" v-if="!attr">
    <div class="tags is-medium">
      <div class="column is-one-half" v-for="cl in classes" :key="cl.id">
        <a
          :style="{ border: cl.color}"   
          class="tag is-medium"
          :class="{ 'is-info': cl.id === currentClass.id}"
          @click="setCurrentClass(cl.id)"
        >
          <span class="panel-icon color-box" :style="{ backgroundColor: cl.color }"></span>
            {{ cl.name }}
        </a>
      </div>
    </div>
  </div>
  <br>
  <div v-if="attr">
    <div class="field is-horizontal" v-for="at in currentClass.attributes" :key="at.id">
      <div class="field-label is-normal">
        <label class="label" :style="{color: currentClass.color }">{{at}}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-small" type="text" >
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
  name: "ClassesBlock",
  props:['attr'],
  computed: {
    ...mapState(["classes", "currentClass"]),
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    
  },
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
</style>