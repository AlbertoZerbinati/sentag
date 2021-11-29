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
        <span v-if="token.attrs['ID']">
          <strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
            token.attrs["ID"]["value"][0]
          }}</strong>
          <span class="icon">
            <font-awesome-icon color="#0c66a1" icon="angle-right" /> </span
        ></span>
        <span v-else
          ><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
            token.label
          }}</strong
          ><span class="icon">
            <font-awesome-icon color="#0c66a1" icon="angle-right" /> </span
        ></span>
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
          <span v-if="token.attrs['ID']">
            <span class="icon">
              <font-awesome-icon color="#0c66a1" icon="angle-left" /> </span
            ><strong :style="{ color: 'rgb(	12, 102, 161)' }"
              >{{ token.attrs["ID"]["value"][0] }}
            </strong>
          </span>
          <span v-else>
            <span class="icon">
              <font-awesome-icon color="#0c66a1" icon="angle-left" /> </span
            ><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{
              token.label
            }}</strong>
          </span>
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

<style lang="scss" scoped>
mark {
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 3.2px;
  padding-bottom: 3.2px;
  position: relative;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 2px;
  box-decoration-break: clone;
  // z-index: 100;
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
  // z-index: 1000;
  position: relative;
}
.label-start {
  margin-right: 5px;
  // padding-right: 4px;
  // top: -2px;
  // position: relative;
}
// .label-start::after {
//   content: "";
//   border-style: solid;
//   border-width: 6px 0 6px 8px;
//   border-color: transparent transparent transparent #0c66a1;
//   margin-left: 5px;
// }

#tags {
  display: inline-flex;
}

// .label-end::before {
//   content: "";
//   border-style: solid;
//   border-width: 6px 8px 6px 0;
//   border-color: transparent #0c66a1 transparent transparent;
//   margin-right: 5px;
// }
</style>
