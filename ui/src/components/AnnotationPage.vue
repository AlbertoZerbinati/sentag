<template>
  <div class="columns is-desktop">
    <div class="column">
      <div class="panel">
        <p class="panel-heading">
          <strong>Tagga {{title}}</strong>
        </p>
        <div class="panel-block">
          <div id="editor">
            <component
              :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
              :id="'t' + t.start"
              v-for="t in tm.tokens"
              :token="t"
              :key="t.start"
              :backgroundColor="t.backgroundColor"
              @remove-block="onRemoveBlock"
            />
          </div>
        </div>
        <div class="panel-block">
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-danger is-outlined" @click="resetBlocks">
                Reset
              </button>
            </p>
            <p class="control">
              <button class="button is-link" @click="saveTags">Salva</button>
            </p>
            <p class="control">
                <export/>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "../axios";
import Token from "./Token";
import TokenBlock from "./TokenBlock";
import TokenManager from "./token-manager";
import Export from "./Export.vue";

export default {
  name: "AnnotationPage",
  data: function() {
    return {
      tm: new TokenManager([]),
      currentSentence: {},
    };
  },
  props: ['title'],
  components: {
    Token,
    TokenBlock,
    Export,
  },
  computed: {
    ...mapState(["inputSentences", "classes", "annotations", "currentClass"]),
  },
  watch: {
    inputSentences() {
      this.tokenizeCurrentSentence();
    }
  },
  created() {
    if (this.inputSentences.length) {
      this.tokenizeCurrentSentence();
    }
    document.addEventListener("mouseup", this.selectTokens);
  },
  beforeUnmount() {
    document.removeEventListener("mouseup", this.selectTokens);
  },
  methods: {
    tokenizeCurrentSentence() {
      this.currentSentence = this.inputSentences[0];

      let words = this.currentSentence["text"].split(" ");
      let tokens = [];
      let last_index = 0;
      for(let i=0; i<words.length; i+=1){
          let token = [];
          let start = this.currentSentence["text"].indexOf(words[i],last_index);
          let end = start+words[i].length; 
          token.push(start);
          token.push(end);
          token.push(words[i]);

          tokens.push(token);

          last_index = end;
      }

      this.tm = new TokenManager(tokens);

      //for each annotation in this.$store.annotations
      //    this.tm.addNewBlock(annotation.startIdx, annotation.endIdx, annotation.class);
    },
    selectTokens() {
      //console.log(this.classes);
      let selection = document.getSelection();

      if (
        selection.anchorOffset === selection.focusOffset &&
        selection.anchorNode === selection.focusNode
      )
        return;
      let startIdx, endIdx;
      try {
        startIdx = parseInt(
          selection.anchorNode.parentElement.id.replace("t", "")
        );
        endIdx = parseInt(
          selection.focusNode.parentElement.id.replace("t", "")
        );
      } catch (e) {
        console.log("selected text were not tokens");
        return;
      }

      if (!this.classes.length && selection.anchorNode) {
        alert(
          "There are no Tags available. Kindly add some Tags before tagging."
        );
        selection.empty();
        return;
      }

      this.tm.addNewBlock(startIdx, endIdx, this.currentClass);
      selection.empty();
    },
    onRemoveBlock(data) {
      this.tm.removeBlock(data.start,data.end);
    },
    resetBlocks() {
      this.tm.resetBlocks();
    },
    saveTags() {
      axios
        .post("/detokenize/", { tokens: this.tm.words })
        .then((res) => {
          this.$store.commit("addAnnotation", [
            res.data.text,
            { entities: this.tm.exportAsAnnotation() },
          ]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss">
#editor {
  padding: 0.2rem;
}
</style>
