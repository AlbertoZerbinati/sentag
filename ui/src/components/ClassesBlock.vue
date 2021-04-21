<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control" v-for="cl in classes" :key="cl.id">
      <div class="tags is-medium has-addons">
        <a
          class="tag is-medium"
          
          :class="{ 'is-info': cl.id === currentClass.id}"
          @click="setCurrentClass(cl.id)"
        >
          <span class="color-box" :style="{ backgroundColor: cl.color }"></span>
          <!--<span :style="{color:cl.color}">-->
            {{ cl.name }}
          <!--</span>-->
          <button 
          class="delete " 
          :class="{ 'is-dark': cl.id === currentClass.id }"
          @click="removeClass(cl.id)"></button>
        </a>
      </div>
    </div>

    <p class="control" v-if="showNewClassInput || classes.length === 0">
      <input
        type="text"
        class="input is-inline"
        v-model="newClassName"
        @keyup="onInputKeyup"
        placeholder="NER TAG"
      />
      <button class="button is-info is-inline" @click="saveNewClass">
        Add
      </button>
    </p>

    <p class="control">
      <button class="button is-primary" @click="showNewClassInput = true">
        <span class="icon">
          <font-awesome-icon class="fa-lg" icon="plus-square" />
        </span>
      </button>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ClassesBlock",
  data() {
    return {
      showNewClassInput: false,
      newClassName: "",
    };
  },
  computed: {
    ...mapState(["classes", "currentClass"]),
  },
  watch: {
    newClassName(now, then) {
      if (now != then) {
        this.newClassName = now.toUpperCase();
      }
    },
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    saveNewClass() {
      this.$store.commit("addClass", this.newClassName);
      this.showNewClassInput = false;
      this.newClassName = "";
    },
    onInputKeyup(e) {
      if (e.key === "Enter") {
        this.saveNewClass();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.color-box {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 1rem;
}

.input {
    width: 40%;
}
</style>