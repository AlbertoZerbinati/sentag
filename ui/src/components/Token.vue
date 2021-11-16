<template>
  <span
    v-if="token.type === 'token' && token.text != '<br/>'"
    class="token"
    :id="'t' + token.start"
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
  font-size: medium;
  display: inline-flex;
  margin-right: 5px;
  // line-height: normal;
}
</style>
