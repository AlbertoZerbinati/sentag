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
              :isCurrent="t.id === currentBlock.id"
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
import { mapState, mapMutations } from "vuex";
import { toast } from "bulma-toast"
import axios from "../axios";
import Token from "./Token";
import TokenBlock from "./TokenBlock";
import TokenManager from "./token-manager";
import Export from "./Export.vue";


export default {
  name: "AnnotationPage",
  data: function() {
    return {
      tm: {},
      currentSentence: {},
      unsavedWork: false,
    };
  },
  props: ['title','oldtm'],
  components: {
    Token,
    TokenBlock,
    Export,
  },
  computed: {
    ...mapState(["inputSentences", "classes", "annotations", "currentClass", "currentBlock"]),
  },
  watch: {
    inputSentences() {
      this.tokenizeCurrentSentence();
    }
  },
  created() {
    //console.log(this.oldtm.length)
    if(this.oldtm.length) {
      this.tm = new TokenManager([],JSON.parse(this.oldtm))
    } else { 
      this.tokenizeCurrentSentence();
    }

    document.addEventListener("mouseup", this.selectTokens);
    window.onbeforeunload = () => (this.unsavedWork ? true : null);

  },
  beforeUnmount() {
      console.log(this.unsavedWork)
    document.removeEventListener("mouseup", this.selectTokens);
  },
  methods: {
    ...mapMutations(["setCurrentBlock"]),
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
      let cb = this.tm.addNewBlock(startIdx, endIdx, this.currentClass);
      if(cb) {
        this.$store.commit('setCurrentBlock',cb);
      }
      selection.empty();
      this.unsavedWork = true;
    },
    onRemoveBlock(data) {
      this.tm.removeBlock(data.start,data.end);
      this.setCurrentBlock(new Object());
      this.unsavedWork = true;
    },
    resetBlocks() {
      if(confirm("Are you sure you want to reset ALL the annotations? The unsaved work will be lost"))
      this.tm.resetBlocks();
      this.unsavedWork = true;
    },
    saveTags() {
      // let tmjson = JSON.stringify(this.tm);
      // console.log(tmjson);
      
      // ( PROOF OF WORK
      // this.tm = new TokenManager({}, JSON.parse(tmjson));
      // console.log(this.tm); )

      //retrieve sentenza number
      const url = new URL(location.href)['pathname'];
      const numero_sentenza = url[url.length-2]

      //retrieve CSRF_TOKEN
      function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken'); 
      axios
        .post(
          "/api/update/"+numero_sentenza, 
          JSON.stringify(this.tm),
          {  
            headers: {
              "X-CSRFToken": csrftoken,
              "content-type": "application/json",
              // "Access-Control-Allow-Origin": "*"
          }}
        )
        .then(
          toast({
            message:'Annotations saved',
            type:'is-success',
            dismissible:'true',
            pauseOnHover:'true',
            duration:2000,
            position:'bottom-right'
          }),
          this.unsavedWork = false
        )
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
