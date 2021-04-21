import { createApp } from "vue";
import App from "./App.vue";
import Classes from "./Classes.vue";
import "es6-promise/auto";
import { createStore } from "vuex";
import store from "./store.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFileAlt);
library.add(faPlusSquare);

const app = createApp(App);
const classes = createApp(Classes)

const oneStore = createStore(store)
app.use(oneStore);
classes.use(oneStore);

app.component("font-awesome-icon", FontAwesomeIcon);
classes.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
classes.mount("#classes");