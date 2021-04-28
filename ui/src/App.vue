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
          for(var i = 0; i<res.data['tags'].length; i++) {
            var cls = res.data['tags'][i];
            this.addClass(cls);
          }
          ////console.log(res.data['testo_iniziale']);
        })
    .catch((err) => alert(err));
  }

};
</script>
