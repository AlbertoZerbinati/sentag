<template>
  <div>
    <AnnotationPage v-if="go" :title="title" />
  </div>
</template>

<script>
import AnnotationPage from "./components/AnnotationPage";
import { mapMutations } from "vuex";
import axios from "axios";

import "./assets/styles.scss";

export default {
  name: "Editor",
  data: function () {
    return {
      currentPage: "annotator",
      title: "",
      oldtm: "",
      go: false,
    };
  },
  components: {
    AnnotationPage,
  },
  methods: {
    ...mapMutations([
      "setInputText",
      "setXMLText",
      "setTokenManager",
      "setComments",
      "addClass",
      "setDone",
      "setArgumentsGraphJSON",
      "setRelationsGraphJSON",
    ]),
  },
  created() {
    // ottengo il tagging ID dai metadati
    const tagging_id = document
      .querySelector("meta[name='id-tagging']")
      .getAttribute("content");

    // axios GET
    axios
      .get("/api/" + tagging_id)
      .then((res) => {
        // la risposta contiene:
        // 1) le parole della sentenza
        this.setInputText(res.data["initial_text"]);
        // 1.1) le parole xml
        this.setXMLText(res.data["xml_text"]);
        // 2) il titolo della sentenza
        this.title = res.data["name"];
        // 3) il vecchio token manager
        if (!this.tokenManager) {
          this.oldtm = res.data["token_manager"];
          if (this.oldtm != null && this.oldtm.length) {
            this.oldtm = JSON.parse(JSON.parse(this.oldtm));
          }
          this.setTokenManager(this.oldtm);
        }
        // 4) the arguments graph configuration
        this.setArgumentsGraphJSON(JSON.parse(res.data["arguments_graph"]));
        // 5) the relations graph configuration
        this.setRelationsGraphJSON(JSON.parse(res.data["relations_graph"]));
        // 6) the comments
        this.setComments(res.data["comments"]);
        // 7) il fatto che la sentenza sia già stata completata o meno: lo sincronizzo subito nello store
        this.setDone(res.data["completed"]);
        // 8) i tag da parsare, perché passati come xsd string
        let xml = res.data["tags"];

        // parsing delle classi di tag, sfrutta XPath
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");

        // tutti gli xs:element
        let elements = xmlDoc.evaluate(
          "//xs:element",
          xmlDoc,
          function (prefix) {
            if (prefix === "xs") {
              return "http://www.w3.org/2001/XMLSchema";
            } else {
              return null;
            }
          },
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );

        // get the picker elements (the ones imposing a multiselect based on their ID's)
        let pickerElementsXPath = xmlDoc.evaluate(
          "//xs:element[.//xs:attribute[@name='PICKER']]",
          xmlDoc,
          function (prefix) {
            if (prefix === "xs") {
              return "http://www.w3.org/2001/XMLSchema";
            } else {
              return null;
            }
          },
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );
        let pickerElements = [];
        for (let i = 1; i < pickerElementsXPath.snapshotLength; i++) {
          pickerElements.push(
            pickerElementsXPath.snapshotItem(i).getAttribute("name")
          );
        }

        // per ogni xs:element
        for (let i = 1; i < elements.snapshotLength; i++) {
          let element = elements.snapshotItem(i);
          // nome dell'element
          let name = element.getAttribute("name");
          // attributi dell'element (MODO 1)
          let attributes = xmlDoc.evaluate(
            "//xs:element[@name='" + name + "']/xs:complexType/xs:attribute",
            xmlDoc,
            function (prefix) {
              if (prefix === "xs") {
                return "http://www.w3.org/2001/XMLSchema";
              } else {
                return null;
              }
            },
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
          );
          // attributi dell'element (MODO 2, solo se MODO 1 non ne ha trovati)
          if (attributes.snapshotLength == 0) {
            attributes = xmlDoc.evaluate(
              "//xs:element[@name='" +
                name +
                "']/xs:complexType/xs:simpleContent/xs:extension/xs:attribute",
              xmlDoc,
              function (prefix) {
                if (prefix === "xs") {
                  return "http://www.w3.org/2001/XMLSchema";
                } else {
                  return null;
                }
              },
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              null
            );
          }

          // for each attribute, check if it is constrained to some options (enumerations)...
          let attrs = [];
          for (let i = 0; i < attributes.snapshotLength; i++) {
            let attribute = attributes.snapshotItem(i);
            let type = "mutual"; // the type of this attribute: string OR mutual OR multi

            // -mutual- attribute options
            let options = xmlDoc.evaluate(
              "./xs:simpleType/xs:restriction/xs:enumeration",
              attribute,
              function (prefix) {
                if (prefix === "xs") {
                  return "http://www.w3.org/2001/XMLSchema";
                } else {
                  return null;
                }
              },
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              null
            );

            // -multi- attribute
            if (options.snapshotLength === 0) {
              options = xmlDoc.evaluate(
                "./xs:simpleType/xs:restriction/xs:simpleType/xs:list/xs:simpleType/xs:restriction/xs:enumeration",
                attribute,
                function (prefix) {
                  if (prefix === "xs") {
                    return "http://www.w3.org/2001/XMLSchema";
                  } else {
                    return null;
                  }
                },
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
              );
              if (options.snapshotLength !== 0) {
                type = "multi";
              } else {
                type = "string";
              }
            }

            let options_arr = [];
            for (let i = 0; i < options.snapshotLength; i++) {
              let option = options.snapshotItem(i).attributes[0]["nodeValue"];
              options_arr.push(option);
            }

            // ... then push the attribute with its options
            let attr = attribute.getAttribute("name");

            // finally check if this attribute requires a picker
            let picker = pickerElements.find((a) =>
              attr.toString().toLowerCase().includes(a)
            );
            if (picker) type = "multi";

            attrs.push({
              type: type,
              name: attr,
              options: options_arr,
              picker: picker,
            });
          }

          // pusha la classe coi suoi attributi nello store
          this.addClass([name, attrs]);
          element.setAttribute("name", "CONSUMED");

          // console.log(attrs);
        }
        this.go = true; // now we can load the annotation page
      })
      .catch((err) => alert(err));
  },
};
</script>

<style scoped>
div {
  position: relative;
  height: 100%;
}
</style>
