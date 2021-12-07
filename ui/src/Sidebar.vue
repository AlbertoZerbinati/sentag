<template>
  <div class="columns is-mobile">
    <div class="column">
      <div class="panel">
        <p class="panel-tabs">
          <a
            class="tags-tab"
            :class="{ 'is-active': tab == 'tags' }"
            @click.prevent="setTab('tags')"
            >Tags</a
          >
          <a
            class="comments-tab"
            :class="{ 'is-active': tab == 'comments' }"
            @click.prevent="setTab('comments')"
            >Comments</a
          >
        </p>
        <div class="tags-tab" v-if="tab == 'tags'">
          <div class="panel-block block">
            <classes-block />
          </div>
          <div class="panel-block block" style="display: block; width=100%;">
            <attributes-block />
          </div>
        </div>
        <div v-else-if="tab == 'comments'">
          <div class="panel-block" style="display: block; width=100%;">
            <comments-block />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassesBlock from "./components/ClassesBlock.vue";
import CommentsBlock from "./components/CommentsBlock.vue";
import AttributesBlock from "./components/AttributesBlock.vue";
import "./assets/styles.scss";

export default {
  name: "Sidebar",
  data: function () {
    return {
      tab: "tags",
    };
  },
  components: {
    ClassesBlock,
    AttributesBlock,
    CommentsBlock,
  },
  methods: {
    setTab(tab) {
      this.tab = tab;
    },
  },
};
</script>

<style lang="css" scoped>
.block {
  height: 42vh;
  margin-bottom: 5px;
}
</style>