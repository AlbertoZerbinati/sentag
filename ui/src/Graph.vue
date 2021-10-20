<template>
  <div class="columns is-desktop" style="margin: 1px">
    <div class="column">
      <div class="panel">
        <div class="panel-heading" style="position: relative">
          <a class="button is-link" :href="/sentenza/ + tagging_id">
            <span class="icon is-small">
              <font-awesome-icon icon="angle-left" />
            </span>
            <span>Text Tagging</span>
          </a>
          <strong
            style="position: absolute; left: 180px; top: 20px"
            v-if="graph_type === 'arg'"
            >Arguments Graph {{ tagging_title }}</strong
          >
          <strong style="position: absolute; left: 180px; top: 20px" v-else
            >Relations Graph {{ tagging_title }} [NOT YET IMPLEMENTED]</strong
          >
        </div>

        <arguments-graph ref="arggraph" v-if="graph_type === 'arg'" />
        <relations-graph ref="relgraph" v-else />

        <div class="panel-block">
          <div class="field is-grouped is-pulled-left">
            <p class="control">
              <button class="button is-link" @click="save" :disabled="graph_type == 'rel'">
                <span class="icon is-small">
                  <font-awesome-icon icon="check" />
                </span>
                <span>Save</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgumentsGraph from "./components/ArgumentsGraph.vue";
import RelationsGraph from "./components/RelationsGraph.vue";

export default {
  components: {
    ArgumentsGraph,
    RelationsGraph,
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    // retrive this tagging's ID and Title
    this.tagging_id = document
      .querySelector("meta[name='id-tagging']")
      .getAttribute("content");
    this.tagging_title = document
      .querySelector("meta[name='title-tagging']")
      .getAttribute("content");

    // also retrive the typology of graph this is: either 'arg' or 'rel'
    this.graph_type = document
      .querySelector("meta[name='graph-type']")
      .getAttribute("content");

    console.log(this.graph_type);
  },
  methods: {
    save() {
      this.$refs.arggraph.save(); // use $refs to invoke a child-component's method
    },
  },
};
</script>

<style scoped>
</style>
