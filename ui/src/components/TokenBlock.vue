<template>
  <mark 
    class="is-multiline is-rounded"
    :style="{backgroundColor:backgroundColor}"
    :id="'tb' + token.start"
    :class="{ 'current': isCurrent}"
    @click.stop="setCurrentBlock(token)"
    >
      <component 
        v-for="t in token.tokens" 
        :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
        :token="t" 
        :key="t.start" 
        :backgroundColor="t.backgroundColor"
        :isCurrent="t.id === currentBlock.id"
        @remove-block="removeBlock"
      />
    <span class="tag is-light is-info is-small"
    >
      <span v-if="token.attrs['ID']"><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{ token.attrs['ID'] }}</strong></span>
      <span v-if="!token.attrs['ID']"><strong :style="{ color: 'rgb(	12, 102, 161)' }">{{ token.label }}</strong></span>
      
      <a class="tag delete is-small is-danger" 
      @click.stop="$emit('remove-block', {start:token.start, end:token.end}); ">
      </a>
    </span>
  </mark>
</template>

<script>
import Token from "./Token";
import { mapState, mapMutations } from "vuex";

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
    },
    isCurrent:{
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(["currentBlock"]),
  },
  components: {
    Token
  },
  methods: {
    ...mapMutations(["setCurrentBlock"]),
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
  cursor: pointer;

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
.current {
  border: 2px solid orange;
}
</style>