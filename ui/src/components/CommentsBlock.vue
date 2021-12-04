<template>
  <div id="column">
    <div class="is-multiline">
      <div class="attribute-title stroke">
        <strong> Comments </strong>
      </div>
      <textarea
        class="textarea"
        rows="20"
        placeholder="Write here your comments"
        v-model="_comments"
        @keyup="onKeyUp"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommentsBlock",
  computed: {
    ...mapState(["comments"]),
    _comments: {
      get() {
        return this.comments;
      },
      set(value) {
        this.setComments(value);
      },
    },
  },
  methods: {
    ...mapMutations(["setUnsavedWork", "setDone", "setComments"]),
    onKeyUp() {
      this.setUnsavedWork(true);
      this.setDone(false);
    },
  },
};
</script>

<style lang="css" scoped>
.attribute-title {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
  text-align: center;
}
.stroke > strong {
  font-size: 130%;
  text-shadow: 0.6px 0.6px 0.8px #0c66a1;
  color: #0c66a1;
}
#column {
  width: 100%;
  position:relative;
  height: 40vh;
  overflow-y: auto;}
</style>
