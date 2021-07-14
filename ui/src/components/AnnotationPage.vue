<template>
  <div class="columns is-desktop">
    <div class="column">
      <div class="panel">
        <div class="panel-heading" style="position:relative;">
          <strong>Tag {{title}}</strong>
            <a class="button is-link" style="position:absolute; right:16px; top:8px;" :href="/graph/ + tagging_id">
              <span>Edit Graph</span>
              <span class="icon is-small">
                <font-awesome-icon icon="angle-right" />
              </span>
            </a>
        </div>
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
        <div class="panel-block is-justify-content-space-between">
          <div class="field is-grouped is-pulled-left">
            <p class="control">
              <button class="button is-danger is-outlined" @click="resetBlocks">
                <span class="icon is-small">
                  <font-awesome-icon icon="undo" />
                </span>
                <span>Reset</span>
              </button>
            </p>
            <p class="control">
              <button class="button is-link" @click="saveTags">
                <span class="icon is-small">
                  <font-awesome-icon icon="check" />
                </span>
                <span>Save</span>
              </button>
            </p>
          </div>

          <div class="is-pulled-right">
            <input id="switchRoundedSuccess" v-model="done" type="checkbox" name="switchRoundedSuccess" class="switch is-rounded is-success">
            <label for="switchRoundedSuccess">Completed</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { toast } from "bulma-toast"
import "bulma-switch"
import axios from "../axios";
import Token from "./Token";
import TokenBlock from "./TokenBlock";
import TokenManager from "./token-manager";


export default {
  name: "AnnotationPage",
  data: function() {
    return {
      tm: {},
      currentSentence: {},
    };
  },
  props: ['title','oldtm'],
  components: {
    Token,
    TokenBlock,
  },
  computed: {
    ...mapState(["inputSentences", "classes", "annotations", "currentClass", "currentBlock", "unsavedWork"]),
    done: {
      get() {
        return this.$store.state.done
      },
      set(value) {
        if (value != this.$store.state.done) {
          this.$store.commit('setDone', value)
        }
      }
    }
  },
  watch: {
    inputSentences() {
      this.tokenizeCurrentSentence();
    },
    done() {       
      //when done changes because of this component or because of AttributesBlock
      this.completed()
    }
  },
  created() {
    //console.log(this.oldtm.length)
    if (this.oldtm.length) {
      this.tm = new TokenManager([],JSON.parse(JSON.parse(this.oldtm)))
      //note: double json parsing is needed
    } else { 
      this.tokenizeCurrentSentence();
    }

    document.addEventListener("mouseup", this.selectTokens);
    window.onbeforeunload = () => (this.unsavedWork ? true : null);

    this.tagging_id = document.querySelector("meta[name='id-tagging']").getAttribute('content'),
    this.switchState = this.done;
  },
  beforeUnmount() {
    document.removeEventListener("mouseup", this.selectTokens);
  },
  methods: {
    print() {
      console.log(this.done);
      console.log(this.switchState);
      
    },
    ...mapMutations(["setCurrentBlock", "setUnsavedWork"]),
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
      // try {
      startIdx = parseInt(
        selection.anchorNode.parentElement.id.replace("t", "")
      );
      endIdx = parseInt(
        selection.focusNode.parentElement.id.replace("t", "")
      );
      // } catch (e) {
      //   console.log("selected text were not tokens");
      //   return;
      // }
      if (!isNaN(startIdx) && !isNaN(endIdx)) {
        let cb = this.tm.addNewBlock(startIdx, endIdx, this.currentClass);
        if(cb) {
          this.setCurrentBlock(cb);
        }
        this.setUnsavedWork(true);
        this.done = false;
      }
      selection.empty();
    },
    onRemoveBlock(data) {
      this.tm.removeBlock(data.start,data.end);
      this.setCurrentBlock(new Object());
      this.setUnsavedWork(true);
      this.done = false;
    },
    resetBlocks() {
      if(confirm("Are you sure you want to reset ALL the annotations? The unsaved work will be lost"))
      this.tm.resetBlocks();
      this.setUnsavedWork(true);
      this.done = false;
    },
    saveTags() {
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
      const params = {
        'tm': JSON.stringify(this.tm),
        'cp': this.done,
      } 
      axios
        .post(
          "/api/update/"+this.tagging_id, 
          params,
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
          this.setUnsavedWork(false)
        )
        .catch((e) => {
          console.log(e);
        });
    },
    completed() {
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
      // console.log("done")
      const csrftoken = getCookie('csrftoken'); 
      const params = {
        'tm': JSON.stringify(this.tm),
        'cp': this.done,
        } 

      axios
        .post(
          "/api/completed/"+this.tagging_id,
          params,
          {  
            headers: {
              "X-CSRFToken": csrftoken,
              "content-type": "application/json",
              // "Access-Control-Allow-Origin": "*"
          }}
        )
        .then( () => {
          toast({
            message:'Annotations saved',
            type:'is-success',
            dismissible:'true',
            pauseOnHover:'true',
            duration:2000,
            position:'bottom-right'
          });
          if (this.done) { 
            toast({
              message:'Tagging Completed',
              type:'is-info',
              dismissible:'true',
              pauseOnHover:'true',
              duration:2000,
              position:'bottom-right',
            });
          } else {
            toast({
              message:'Set Uncompleted',
              type:'is-warning',
              dismissible:'true',
              pauseOnHover:'true',
              duration:2000,
              position:'bottom-right',
            });
          }
          this.setUnsavedWork(false);
        })
        .catch((e) => {
          // console.log(e);
          // alert(e)
          alert(e.response.data[0])
          this.done = false
        });
    },
  },
}
</script>

<style lang="scss">
#editor {
  padding: 0.2rem;
}
.right {
  margin-left:100px;
  margin-right:0px;
}
</style>
