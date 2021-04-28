<template>
  <div class="columns is-multiline">
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
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ClassesBlock",
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