<template>
  <div>
    <AnnotationPage/>
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
    };
  },
  components: {
    AnnotationPage,
  },
  methods: {
    ...mapMutations(["setInputSentences"]),
  },
  created() {
    axios
        .get("/api/1")
        .then((res) => {
          this.setInputSentences(res.data['testo_iniziale']);
          //this.setInitialAnnotations(res.data['initial_blocks']);
          ////console.log(res.data['testo_iniziale']);
        })
    .catch((err) => alert(err));
  }

};
</script>
