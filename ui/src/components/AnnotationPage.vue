<template>
  <div class="columns is-desktop">
    <div class="column">
      <div class="panel">
        <div class="panel-heading" style="position: relative">
          <strong>Tag {{ title }}</strong>
          <a
            class="button is-link"
            style="position: absolute; right: 220px; top: 8px"
            :href="'/graph/rel/' + tagging_id"
          >
            <span>Relations Graph</span>
            <span class="icon is-small">
              <font-awesome-icon icon="angle-right" />
            </span>
          </a>
          <a
            class="button is-link"
            style="position: absolute; right: 16px; top: 8px"
            :href="'/graph/arg/' + tagging_id"
          >
            <span>Arguments Graph</span>
            <span class="icon is-small">
              <font-awesome-icon icon="angle-double-right" />
            </span>
          </a>
        </div>
        <div class="panel-block">
          <div id="editor" style="white-space: pre-line">
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
            <input
              id="switchRoundedSuccess"
              v-model="done"
              type="checkbox"
              name="switchRoundedSuccess"
              class="switch is-rounded is-success"
            />
            <label for="switchRoundedSuccess">Completed</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { toast } from "bulma-toast";
import "bulma-switch";
import axios from "../axios";
import Token from "./Token";
import TokenBlock from "./TokenBlock";
import TokenManager from "./token-manager";

export default {
  name: "AnnotationPage",
  data: function () {
    return {
      tm: {},
    };
  },
  props: ["title", "oldtm"],
  components: {
    Token,
    TokenBlock,
  },
  computed: {
    ...mapState([
      "inputText",
      "XMLText",
      "classes",
      "annotations",
      "currentClass",
      "currentBlock",
      "unsavedWork",
    ]),
    done: {
      get() {
        return this.$store.state.done;
      },
      set(value) {
        if (value != this.$store.state.done) {
          this.$store.commit("setDone", value);
        }
      },
    },
  },
  watch: {
    done() {
      // when done changes because of this component or because of AttributesBlock
      this.completed();
    },
  },
  created() {
    this.tagging_id = document
      .querySelector("meta[name='id-tagging']")
      .getAttribute("content");

    // also discover wether I must parse the xml metadati
    this.htbp = document
      .querySelector("meta[name='must-parse']")
      .getAttribute("content");

    console.log(this.htbp);

    if (this.oldtm.length) {
      this.tm = new TokenManager([], JSON.parse(JSON.parse(this.oldtm))); // note: double json parsing is needed
    } else {
      this.tokenizeCurrentSentence();
    }

    document.addEventListener("mouseup", this.selectTokens);
    window.onbeforeunload = () => (this.unsavedWork ? true : null); // exit confirmation if there is unsaved work

    this.switchState = this.done;
  },
  beforeUnmount() {
    document.removeEventListener("mouseup", this.selectTokens);
  },
  methods: {
    ...mapMutations(["setCurrentBlock", "setUnsavedWork"]),
    tokenizeCurrentSentence() {
      // function used for parsing xml input
      let parseNode = (xmlNode, last) => {
        // base case is just text, no tags
        if (xmlNode.nodeName == "#text") {
          // console.log("just text");
          return;
        }

        console.log("\n\nlast", last);

        // otherwise the is a node
        console.log("node:");
        console.log(xmlNode);

        // find the indexes of start and end of the node's text and add the token-block:
        this.tm.addNewBlock(
          last,
          last + xmlNode.textContent.length - 1,
          this.currentClass
        );

        // let attrs = {};
        // if (xmlNode.attributes)
        //   for (let attribute of xmlNode.attributes) console.log(attribute);
        // console.log(attrs);

        // recursion
        let length = 0;
        for (let node of xmlNode.childNodes) {
          // console.log(node);
          parseNode(node, last + length);
          length += node.textContent.length;
        }
      };

      // tokenize the input text
      let words = this.inputText.split(" ");
      let tokens = [];
      let last_index = 0;

      for (let i = 0; i < words.length; i += 1) {
        let token = [];

        let start = this.inputText.indexOf(words[i], last_index);
        let end = start + words[i].length;

        token.push(start);
        token.push(end);
        token.push(words[i]);

        tokens.push(token);

        last_index = end;
      }

      // if this judgment does not have to be parsed
      // istanzia token manager coi tokens
      if (this.htbp == "False") {
        this.tm = new TokenManager(tokens);
      }
      // otherwise parse the xml
      else {
        this.tm = new TokenManager(tokens); // istanzia token manager coi tokens
        console.log("now I have to build the appropriate TM");
        let xml = this.XMLText;
        console.log(xml);

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");
        console.log(xmlDoc);

        last_index = 0;
        for (let node of xmlDoc.childNodes) parseNode(node, last_index);
      }
    },
    selectTokens() {
      let selection = document.getSelection();

      // if empty selection then return
      if (
        selection.anchorOffset === selection.focusOffset &&
        selection.anchorNode === selection.focusNode
      ) {
        return;
      }

      // else get indexes
      let startIdx, endIdx;
      startIdx = parseInt(
        selection.anchorNode.parentElement.id.replace("t", "")
      );
      endIdx = parseInt(selection.focusNode.parentElement.id.replace("t", ""));

      // if valid indexes then add the new block, of type currentClass
      if (!isNaN(startIdx) && !isNaN(endIdx)) {
        let cb = this.tm.addNewBlock(startIdx, endIdx, this.currentClass);
        if (cb) {
          this.setCurrentBlock(cb);
        }
        this.setUnsavedWork(true);
        this.done = false;
      }
      selection.empty();
    },
    onRemoveBlock(data) {
      this.tm.removeBlock(data.start, data.end);
      this.setCurrentBlock(new Object());
      this.setUnsavedWork(true);
      this.done = false;
    },
    resetBlocks() {
      if (
        confirm(
          "Are you sure you want to reset ALL the annotations? The unsaved work will be lost"
        )
      )
        this.tm.resetBlocks();
      this.setUnsavedWork(true);
      this.done = false;
    },
    saveTags() {
      // retrieve CSRF_TOKEN
      function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
          const cookies = document.cookie.split(";");
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
              cookieValue = decodeURIComponent(
                cookie.substring(name.length + 1)
              );
              break;
            }
          }
        }
        return cookieValue;
      }
      const csrftoken = getCookie("csrftoken");
      const params = {
        tm: JSON.stringify(this.tm),
        cp: this.done,
      };

      // axios PUT
      axios
        .put("/api/update/" + this.tagging_id, params, {
          headers: {
            "X-CSRFToken": csrftoken,
            "content-type": "application/json",
          },
        })
        .then(
          toast({
            message: "Annotations saved",
            type: "is-success",
            dismissible: "true",
            pauseOnHover: "true",
            duration: 2000,
            position: "bottom-right",
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
        if (document.cookie && document.cookie !== "") {
          const cookies = document.cookie.split(";");
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
              cookieValue = decodeURIComponent(
                cookie.substring(name.length + 1)
              );
              break;
            }
          }
        }
        return cookieValue;
      }
      const csrftoken = getCookie("csrftoken");
      const params = {
        tm: JSON.stringify(this.tm),
        cp: this.done,
      };
      axios
        .put("/api/completed/" + this.tagging_id, params, {
          headers: {
            "X-CSRFToken": csrftoken,
            "content-type": "application/json",
          },
        })
        .then(() => {
          toast({
            message: "Annotations saved",
            type: "is-success",
            dismissible: "true",
            pauseOnHover: "true",
            duration: 2000,
            position: "bottom-right",
          });
          if (this.done) {
            toast({
              message: "Tagging Completed",
              type: "is-info",
              dismissible: "true",
              pauseOnHover: "true",
              duration: 2000,
              position: "bottom-right",
            });
          } else {
            toast({
              message: "Set Uncompleted",
              type: "is-warning",
              dismissible: "true",
              pauseOnHover: "true",
              duration: 2000,
              position: "bottom-right",
            });
          }
          this.setUnsavedWork(false);
        })
        .catch((e) => {
          alert(e.response.data[0]); // if there was a validation problem, alert the user with the provided message
          this.done = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#editor {
  padding: 0.2rem;
  font-size: 1.2rem;
}
.right {
  margin-left: 100px;
  margin-right: 0px;
}
</style>
