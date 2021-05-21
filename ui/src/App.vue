<template>
  <div>
    <AnnotationPage v-if="go" :title="title" :oldtm="oldtm"/>
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
      oldtm: "",
      go:false,
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
    const numero_sentenza = url.split('/')[2]
    axios
        .get("/api/"+numero_sentenza)
        .then((res) => {
          // console.table(res.data)

          //la risposta contiene:
          //le parole della sentenza
          this.setInputSentences(res.data['initial_text']);
          //il titolo della sentenza
          this.title = res.data['name'];
          //il vecchio token manager
          this.oldtm = res.data['token_manager'];

          //il fatto che la sentenza sia già stata completata o meno 
          //this.completed = res.sata['completed']

          //i tag da parsare, perché passati come xsd string
          let xml = res.data['tags']

          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(xml,"text/xml");
          let elements = xmlDoc.evaluate("//xs:element", xmlDoc, 
            function(prefix) { 
              if (prefix === 'xs') { 
                return 'http://www.w3.org/2001/XMLSchema'; 
              } else { 
                return null; 
                }},XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

          for(let i = 1; i < elements.snapshotLength; i++) {
            let element = elements.snapshotItem(i);
            //console.log(element);
            let name = element.getAttribute('name');
            //console.log(name);
            let attributes = xmlDoc.evaluate('//xs:element[@name=\''+name+'\']/xs:complexType/xs:attribute', xmlDoc, 
            function(prefix) { 
              if (prefix === 'xs') { 
                return 'http://www.w3.org/2001/XMLSchema';
              } else { 
                return null;
              }
            },XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            if (attributes.snapshotLength == 0) {
              attributes = xmlDoc.evaluate('//xs:element[@name=\''+name+'\']/xs:complexType/xs:simpleContent/xs:extension/xs:attribute', xmlDoc, 
              function(prefix) { 
                if (prefix === 'xs') { 
                  return 'http://www.w3.org/2001/XMLSchema'; 
                } else { 
                  return null; 
                }
              },XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            }
            let attrs = []
            for(let i = 0; i < attributes.snapshotLength; i++) {
              let attribute = attributes.snapshotItem(i); 
              let attr = attribute.getAttribute('name');
              //console.log(attr);
              attrs.push(attr);
            }
            this.addClass([name,attrs])
            element.setAttribute('name','CONSUMED')
            
            //console.log("\n");
          }
          this.go=true; //now we can load the annotation page
        })
    .catch((err) => alert(err));
  }
};
</script>
