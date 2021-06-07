import { createApp } from "vue";
import Editor from "./Editor.vue";
import Sidebar from "./Sidebar.vue";
import Graph from "./Graph.vue";
import "es6-promise/auto";
import { createStore } from "vuex";
import store from "./store.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import 'devextreme/dist/css/dx.light.css';

library.add(faCheck);
library.add(faUndo);

const editor = createApp(Editor);
const sidebar = createApp(Sidebar);
const graph = createApp(Graph);

const oneStore = createStore(store);
editor.use(oneStore);
sidebar.use(oneStore);
graph.use(oneStore);

editor.component("font-awesome-icon", FontAwesomeIcon);
sidebar.component("font-awesome-icon", FontAwesomeIcon);
graph.component("font-awesome-icon", FontAwesomeIcon);

editor.mount("#editor");
sidebar.mount("#sidebar");
graph.mount("#graph");