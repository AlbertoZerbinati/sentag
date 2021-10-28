<template>
  <div>
    <AnnotationPage v-if="go" :title="title" :oldtm="oldtm" />
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
    ...mapMutations(["setInputText", "addClass", "setDone"]),
  },
  created() {
    // ottengo il tagging ID dai metadati
    const tagging_id = document
      .querySelector("meta[name='id-tagging']")
      .getAttribute("content");

    // also discover wether I must parse the xml metadati
    const htbp = document
      .querySelector("meta[name='must-parse']")
      .getAttribute("content");
    
    console.log(htbp)

    // axios GET
    axios
      .get("/api/" + tagging_id)
      .then((res) => {
        // la risposta contiene:
        // 1) le parole della sentenza
        this.setInputText(res.data["initial_text"]);
        // 2) il titolo della sentenza
        this.title = res.data["name"];
        // 3) il vecchio token manager
        this.oldtm = res.data["token_manager"];
        // 4) il fatto che la sentenza sia già stata completata o meno: lo sincronizzo subito nello store
        this.setDone(res.data["completed"]);
        // 5) i tag da parsare, perché passati come xsd string
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
            attrs.push({ type: type, name: attr, options: options_arr });
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
