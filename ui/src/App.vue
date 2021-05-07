<template>
  <div>
    <AnnotationPage :title="title"/>
  </div>
</template>

<script>
import AnnotationPage from "./components/AnnotationPage";
import { mapMutations } from "vuex";
import axios from "axios"

import "./assets/styles.scss";

export default {
  name: "App",
  data: function() {
    return {
      currentPage: "annotator",
      title: "",
    };
  },
  components: {
    AnnotationPage,
  },
  methods: {
    ...mapMutations(["setInputSentences","addClass"]),
  },
  created() {
    //ottengo il numero sentenza dall'url
    const url = new URL(location.href)['pathname'];
    const numero_sentenza = url[url.length-2]
    axios
        .get("/api/"+numero_sentenza)
        .then((res) => {
          //la risposta contiene:
          //le parole della sentenza
          this.setInputSentences(res.data['testo_iniziale']);
          //il titolo della sentenza
          this.title = res.data['nome'];

          //i tag da parsare, perché passati come xsd string
          let xml = res.data['tags']
          console.log(xml)
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(xml,"text/xml");
          let elements = xmlDoc.getElementsByTagName("xs:element");
          for (let element of elements) {
            this.addClass(element.getAttribute("name"))
            console.log(element.getAttribute("name"));
          }

        })
    .catch((err) => alert(err));
  }

};

// function readJsonObject(jsonObject) {
//   if (Array.isArray(jsonObject)) {
//     for (var el of jsonObject) {
//       readJsonObject(el)
//     }
//     return
//   } else if (typeof jsonObject === 'object' && jsonObject.constructor === Object) {
//     for (var key of Object.keys(jsonObject)) {
//       var value = jsonObject[key];
//       var toDisplay;

//       if (value && typeof value === 'object' && value.constructor === Object) {
//         toDisplay = readJsonObject(value);
//       } else if (Array.isArray(value)) {
//         toDisplay = JSON.stringify(value);
//         readJsonObject(value);
//       } else {
//         toDisplay = value;
//       }
//      console.log(key + ": " + toDisplay);
//     }
//   }

//   return jsonObject;
// }
</script>
