<template>
  <div class="columns is-multiline" v-if="!attr">
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
  <div class="columns is-multiline" v-if="attr">
    <div class="tags is-medium">
      <div class="column is-one-half" v-for="at in currentClass.attributes" :key="at.id">
        <a
          class="tag is-medium"
        >
          <span class="panel-icon color-box" :style="{ backgroundColor: currentClass.color }"></span>
            {{ at }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
          // :style="{ border: cl.color}"   
          // @click="setCurrentClass(cl.id)"
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
</style>