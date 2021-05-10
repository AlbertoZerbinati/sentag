<template>
  <mark class="is-multiline is-rounded" v-bind:style="{backgroundColor:backgroundColor}">
    <Token 
      :token="t" 
      v-for="t in token.tokens" 
      :key="t.start" />
    <span class="tag is-light is-info is-small" >
      <a @click="setCurrentBlock">{{ token.label }}</a>
      <a class="tag delete is-small is-danger" @click="$emit('remove-block', token.start)"></a>
    </span>
  </mark>
</template>

<script>
import Token from "./Token";

export default {
  name: "TokenBlock",
  emits: ["remove-block"],
  data:function() {
    return {
      showClose: false,
    }
  },
  props: {
    token: {
      type: Object,
      requried: true
    },
    backgroundColor: {
      type: String,
      required: false
    }
  },
  components: {
    Token
  },
  methods: {
    setCurrentBlock(){
      alert("ciao")
    }
  }
}
</script>

<style lang="scss">
mark {
  padding: 0.3rem;
  position: relative;
  border-radius:8px;
  // &::after {
  //   content: var(--tag);
  //   padding: 0.2rem;
  //   color: darkslategray;
  //   font-size: small;
  // }
}
.delete {
  margin-left: 4px;
}
</style>