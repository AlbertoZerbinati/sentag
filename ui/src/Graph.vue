<template>
  <div class="column">
    <arguments-graph ref="arggraph" v-if="graph_type === 'arg'" />
    <relations-graph ref="relgraph" v-else />

    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn3.devexpress.com/jslib/21.1.3/css/dx-diagram.min.css"
    />
  </div>
</template>

<script>
import ArgumentsGraph from "./components/ArgumentsGraph.vue";
import RelationsGraph from "./components/RelationsGraph.vue";
import { mapState } from "vuex";

export default {
  components: {
    ArgumentsGraph,
    RelationsGraph,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["mainTab"]),
    graph_type: function () {
      return this.mainTab == "Arguments Graph" ? "arg" : "rel";
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
</style>
