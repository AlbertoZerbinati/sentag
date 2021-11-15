<template>
  <mark
    class="is-multiline is-rounded"
    :style="{ backgroundColor: backgroundColor }"
    :id="'tb' + token.start"
    :class="{ current: isCurrent }"
    @click.stop="setCurrentBlock(token)"
  >
    <span class="control">
      <span class="tag label-start">
        <span v-if="token.attrs['ID']"
          ><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
            token.attrs["ID"]["value"][0]
          }}</strong></span
        >
        <span v-if="!token.attrs['ID']"
          ><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
            token.label
          }}</strong></span
        >
      </span>
    </span>

    <component
      v-for="t in token.tokens"
      :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
      :token="t"
      :key="t.start"
      :backgroundColor="t.backgroundColor"
      :isCurrent="t.id === currentBlock.id"
      @remove-block="removeBlock"
    />
    <span class="control">
      <span class="tags has-addons" id="tags">
        <span class="tag label-end">
          <span v-if="token.attrs['ID']"
            ><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
              token.attrs["ID"]["value"][0]
            }}</strong></span
          >
          <span v-if="!token.attrs['ID']"
            ><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
              token.label
            }}</strong></span
          >
        </span>
        <span
          class="tag is-delete is-light is-danger"
          @click.stop="$emit('remove-block', token.id)"
        >
        </span>
      </span>
    </span>
  </mark>
</template>

<script>
import Token from "./Token";
import { mapState, mapMutations } from "vuex";

export default {
  name: "TokenBlock",
  emits: ["remove-block"],
  data: function () {
    return {
      showClose: false,
    };
  },
  props: {
    token: {
      type: Object,
      requried: true,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentBlock"]),
  },
  components: {
    Token,
  },
  methods: {
    ...mapMutations(["setCurrentBlock"]),
    removeBlock: function (id) {
      this.$emit("remove-block", id);
    },
  },
};
</script>

<style lang="scss">
mark {
  // padding-right: 0.3rem;
  // padding-left: 0.3rem;
  // padding-top: 0.2rem;
  // padding-bottom: 0.2rem;
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 2px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone; /* most browsers need -webkit */

  // &::after {
  //   content: var(--tag);
  //   padding: 0.2rem;
  //   color: darkslategray;
  //   font-size: small;
  // }
}
.current {
  border: 2.2px solid orange;
}
.label-start {
  margin-right: 2px;
  padding-right: 0px;
  // top: 2px;
}
.label-start::after {
  content: "";
  border-style: solid;
  border-width: 6px 0 6px 8px;
  border-color: transparent transparent transparent #0c66a1;
  margin-left: 5px;
}

#tags {
  display: inline-flex;
}

.label-end::before {
  content: "";
  border-style: solid;
  border-width: 6px 8px 6px 0;
  border-color: transparent #0c66a1 transparent transparent;
  margin-right: 5px;
}
</style>
