<template>
  <div class="panel">
    <div class="panel-heading">
      <classes-block />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClassesBlock from "./components/ClassesBlock.vue";
import "./assets/styles.scss";

export default {
  name: "Classes",
  components: {
    ClassesBlock,
  },
  computed: {
    ...mapState(["classes", "currentClass"]),
  },

  methods: {
  },

};
</script>
