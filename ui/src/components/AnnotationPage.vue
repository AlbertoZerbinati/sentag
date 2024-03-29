<template>
  <div>
    <div class="column">
      <div class="panel">
        <div class="panel-heading">
          <strong>{{ mainTab }} {{ title }}</strong>
          <div class="push-right">
            <button class="button is-link" @click="changeMainTab('Tag')">
              <span>Text Tagging</span>
            </button>
          </div>
          <div>
            <button
              class="button is-link"
              @click="changeMainTab('Relations Graph')"
            >
              <!-- :href="'/graph/rel/' + tagging_id" -->
              <span>Relations Graph</span>
            </button>
          </div>
          <div>
            <button
              class="button is-link"
              @click="changeMainTab('Arguments Graph')"
            >
              <!-- :href="'/graph/arg/' + tagging_id" -->
              <span>Arguments Graph</span>
            </button>
          </div>
        </div>

        <div class="panel-block text" v-show="mainTab == 'Tag'">
          <div id="editor" style="white-space: pre-line">
            <component
              v-for="t in tokenManager.tokens"
              :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
              :token="t"
              :key="t.id"
              :backgroundColor="t.backgroundColor"
              :isCurrent="currentBlock != null && t.id === currentBlock.id"
              @remove-block="onRemoveBlock"
            />
          </div>
        </div>
        <div class="dx-viewport" v-if="mainTab != 'Tag'">
          <graph ref="graph" />
        </div>

        <!-- <div v-else-if="mainTab == 'Arguments Graph'">
          <arguments-graph ref="arggraph"/>
        </div>
        <div v-else>
          <relations-graph ref="relgraph"/>
        </div> -->

        <div class="panel-block is-justify-content-space-between">
          <div class="field is-grouped is-pulled-left">
            <p class="control" v-if="mainTab == 'Tag'">
              <button class="button is-danger is-outlined" @click="resetBlocks">
                <span class="icon is-small">
                  <font-awesome-icon icon="undo" />
                </span>
                <span>Reset</span>
              </button>
            </p>
            <p class="control">
              <button
                class="button"
                :class="{ 'is-link': unsavedWork }"
                @click="saveTags"
              >
                <span class="icon is-small">
                  <font-awesome-icon icon="check" />
                </span>
                <span>Save</span>
              </button>
            </p>
          </div>

          <div class="is-pulled-right" v-if="mainTab == 'Tag'">
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
import Graph from "../Graph";

export default {
  name: "AnnotationPage",
  data: function () {
    return {
      tm: {},
    };
  },
  props: ["title"],
  components: {
    Token,
    TokenBlock,
    Graph,
  },
  computed: {
    ...mapState([
      "inputText",
      "XMLText",
      "tokenManager",
      "argumentsGraphJSON",
      "relationsGraphJSON",
      "comments",
      "classes",
      "annotations",
      "currentClass",
      "currentBlock",
      "unsavedWork",
      "mainTab",
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

    if (this.tokenManager) {
      this.setTokenManager(new TokenManager([], this.tokenManager));
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
    ...mapMutations([
      "setCurrentBlock",
      "setUnsavedWork",
      "setTokenManager",
      "setMainTab",
    ]),
    changeMainTab(tab) {
      // if(this.mainTab != tab)
      //   if (this.unsavedWork && confirm("Changes you made may not be saved.")) {
      //     this.setMainTab(tab);
      //   } else if (!this.unsavedWork) {
      this.setMainTab(tab);
      // }
    },
    tokenizeCurrentSentence() {
      // function used for parsing xml input
      let parseNode = (xmlNode, last_index_token) => {
        // base case is just text, no tags
        if (xmlNode.nodeName == "#text" || xmlNode.nodeName == "br") {
          return;
        }
        let content = xmlNode.textContent
          .trim()
          .replace(/ {2}/g, " <br/> ")
          .replace(/ {2}/g, " <br/> ")
          .replace(/(<br\/> *){3,}/g, "<br/> <br/> ")
          .replace(/(<br\/> *){3,}/g, "<br/> <br/> ");
        let start = this.inputText.indexOf(content, last_index_token);
        let end =
          start + content.length - content.trimEnd().split(" ").at(-1).length;

        // console.log("content", content);
        // console.log("start", start);
        // console.log("end", end);

        // otherwise th is a node
        // apart for the initial tag (<sentag>) and the <br/> 's we need to add the block into the TM
        // retrieve all classes with current name from the store
        let currentClass = this.classes.find(
          (cl) => cl.name === xmlNode.nodeName
        );

        // build the attributes array:
        let attrs = {}; // {attr_name : "attr_values"} object
        if (xmlNode.attributes) {
          for (let attribute of xmlNode.attributes) {
            let attribute_name = attribute.name.toString();
            // manage <part> separately...
            if (xmlNode.nodeName == "part" && attribute_name == "P") {
              attribute_name = "ID";
              let value = xmlNode.getAttribute(attribute.name);
              attrs[attribute_name] = value.toLowerCase().includes("part")
                ? value
                : "Part" + value;
            } else if (attribute_name == "P") {
              let value = xmlNode.getAttribute(attribute.name);
              attrs[attribute_name] = value.toLowerCase().includes("part")
                ? value
                : "Part" + value.split(/ +|,|\|/).join(" Part");
            } else {
              attrs[attribute_name] = xmlNode.getAttribute(attribute.name);
            }
          }
        }
        // if (xmlNode.nodeName == "part") {
        // console.log("attrs", attrs);
        // }

        // console.log(currentClass)
        // console.log("attrs",attrs)

        if (currentClass) {
          // set the indices of start and end and the current class and add the token-block into the token manager
          this.tokenManager.addNewBlock(start, end, currentClass, attrs);
        }

        // recursion over cihldren
        for (let node of xmlNode.childNodes) {
          parseNode(node, start);
        }
      };

      // tokenize the input text (always trim the multiple spaces)
      // let text = "";
      // if (!this.htbp)
      let text = this.inputText;
      // else

      // console.log(text);

      let words = text.split(" ");
      let tokens = [];
      let last_index = 0;

      for (let i = 0; i < words.length; i += 1) {
        let token = [];

        let start = text.indexOf(words[i], last_index);
        let end = start + words[i].length;

        token.push(start);
        token.push(end);
        token.push(words[i]);

        tokens.push(token);

        last_index = end;
      }

      // istanzia token manager coi tokens
      this.setTokenManager(new TokenManager(tokens));
      // console.log(this.tokenManager);

      // if this judgment has to be parsed -> parse it recursively
      if (this.htbp == "True") {
        // console.log("now I have to build the appropriate TM");
        let xml = this.XMLText;

        // replace the \r\n with <br/>
        xml = xml.split(/\r?\n/).join(" <br/> ");
        // remove multi spaces
        xml = xml.trim().split(/\s+/g).join(" ");
        // remove excessive \n
        xml = xml.replace(/(<br\/> *){3,}/g, "<br/> <br/> ");

        // console.log(xml);
        // console.log(this.inputText);

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");

        // add the blocks recursively
        for (let node of xmlDoc.childNodes) parseNode(node, 0);
        this.tokenManager.adjustIDs();

        // and save as completed into database
        this.saveTags();
        this.done = true;
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

      // else get indices
      const anchorNode = selection.anchorNode.parentElement.id;
      const focusNode = selection.focusNode.parentElement.id;

      if (anchorNode && focusNode) {
        // if valid indices then add the new block, of type currentClass
        const idxAnchor = anchorNode.match(/\d+/g);
        const idxFocus = focusNode.match(/\d+/g);
        let startIdx, endIdx;
        if (parseInt(idxAnchor[0]) < parseInt(idxFocus[0])) {
          startIdx = parseInt(idxAnchor[0]);
          endIdx = parseInt(idxFocus[1]);
        } else {
          startIdx = parseInt(idxFocus[0]);
          endIdx = parseInt(idxAnchor[1]);
        }
        console.log(startIdx, endIdx);

        let cb = this.tokenManager.addNewBlock(
          startIdx,
          endIdx,
          this.currentClass
        );
        if (cb) {
          this.setCurrentBlock(cb);
        }
        this.setUnsavedWork(true);
        this.done = false;
      }
      selection.empty();
    },
    onRemoveBlock(id, start, end) {
      this.tokenManager.removeBlock(id, start, end);
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
        this.tokenManager.resetBlocks();
      this.setUnsavedWork(true);
      this.done = false;
    },
    saveTags() {
      if (this.mainTab == "Arguments Graph")
        this.$refs.graph.$refs.arggraph.save();
      else if (this.mainTab == "Relations Graph")
        this.$refs.graph.$refs.relgraph.save();

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
      } // retrieve CSRF_TOKEN
      const csrftoken = getCookie("csrftoken");
      const params = {
        tm: JSON.stringify(this.tokenManager),
        arggraph: JSON.stringify(this.argumentsGraphJSON),
        relgraph: JSON.stringify(this.relationsGraphJSON),
        comments: this.comments,
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
        tm: JSON.stringify(this.tokenManager),
        arggraph: JSON.stringify(this.argumentsGraphJSON),
        relgraph: JSON.stringify(this.relationsGraphJSON),
        comments: this.comments,
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
.panel {
  position: sticky;
  overflow-y: auto;
  top: 0;
  bottom: 0;
}
.panel-heading {
  display: flex;
  gap: 20px;
  align-items: center;
}
.push-right {
  margin-left: auto;
}
#editor {
  // position: relative;
  // overflow-y: auto;
  // height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 70vh;
  width: 100%;
  padding-top: 2px;
  // padding-left: 2px;
}
.column {
  padding-top: 0px;
  padding-bottom: 0px;
}
.right {
  margin-left: 100px;
  margin-right: 0px;
}
</style>
