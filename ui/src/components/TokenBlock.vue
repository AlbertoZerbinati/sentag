<template>
  <mark class="is-multiline is-rounded" 
    :style="{backgroundColor:backgroundColor}"
    :id="'tb' + token.start"
    >
      <component 
        v-for="t in token.tokens" 
        :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
        :token="t" 
        :key="t.start" 
        :backgroundColor="t.backgroundColor"
        @remove-block="removeBlock"
      />
    <span class="tag is-light is-info is-small">
      {{ token.label }}
      <a class="tag delete is-small is-danger" @click="$emit('remove-block', {start:token.start, end:token.end})"></a>
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
    removeBlock: function(data) {
      this.$emit("remove-block",data)
    }
  }
}
</script>

<style lang="scss">
mark {
  padding: 0.3rem;
  position: relative;
  border-radius:8px;
  &::after {
    content: var(--tag);
    padding: 0.2rem;
    color: darkslategray;
    font-size: small;
  }
}
.delete {
  margin-left: 4px;
}
</style>