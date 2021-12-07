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
// :disabled="graph_type == 'rel'"
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
  created() {
    // retrive this tagging's ID and Title
    this.tagging_id = document
      .querySelector("meta[name='id-tagging']")
      .getAttribute("content");
    this.tagging_title = document
      .querySelector("meta[name='title-tagging']")
      .getAttribute("content");

    // also retrive the typology of graph this is: either 'arg' or 'rel'
    // console.log(this.graph_type);
  },
  methods: {
    save() {
      // use $refs to invoke a child-component's method
      if (this.graph_type === "arg") this.$refs.arggraph.save();
      else if (this.graph_type === "rel") this.$refs.relgraph.save();
    },
  },
};
</script>

<style scoped>
</style>
