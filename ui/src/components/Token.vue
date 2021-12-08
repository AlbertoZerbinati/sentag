<template>
  <span
    v-if="token.type === 'token' && token.text != '<br/>'"
    class="token"
    :id="'t' + token.start + '-' + token.end"
  >
    {{ token.text }}
  </span>
  <br v-else />
</template>

<script>
export default {
  name: "Token",
  props: {
    token: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.token {
  font-size: 90%;
  display: inline-flex;
  margin-right: 6px;
  // line-height: normal;
}
</style>
