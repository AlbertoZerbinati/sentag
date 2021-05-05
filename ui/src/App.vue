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
    const url = new URL(location.href)['pathname'];
    const numero_sentenza = url[url.length-2]
    //console.log(numero_sentenza);
    axios
        .get("/api/"+numero_sentenza)
        .then((res) => {
          this.setInputSentences(res.data['testo_iniziale']);
          this.title = res.data['nome'];
          //console.log(Object.keys(JSON.parse(res.data['tags'])))
          // readJsonObject(JSON.parse(res.data['tags']))
          for(var i = 0; i<Object.keys(JSON.parse(res.data['tags'])).length; i++) {          
            for(var j = 0; j<Object.keys(Object.keys(JSON.parse(res.data['tags']))[i]).length; j++) {
              var cls = Object.keys(Object.keys(JSON.parse(res.data['tags']))[i])[j];
              console.log(cls);
              this.addClass(cls);
            }
          }
          ////console.log(res.data['testo_iniziale']);
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
