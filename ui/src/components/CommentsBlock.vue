<template>
  <div id="column">
    <div class="is-multiline">
      <div class="attribute-title stroke">
        <strong> Comments </strong>
      </div>
      <textarea
        class="textarea"
        rows="10"
        placeholder="Write here personal comments"
        v-model="comments"
        @keyup="onKeyUp"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CommentsBlock",
  computed: {
    comments: {
      get() {
        return this.$store._state.data.comments;
      },
      set(value) {
        this.$store.commit("updateComments", value);
      },
    },
  },
  methods: {
    ...mapMutations(["setUnsavedWork", "setDone"]),
    onKeyUp(e) {
      if (e.key === ">" || e.key === "<" || e.key === " " || e.key === '"') {
        e.preventDefault();
      } else {
        this.setUnsavedWork(true);
        this.setDone(false);
      }
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
}
</style>
