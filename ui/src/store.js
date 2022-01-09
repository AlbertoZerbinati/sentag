const niceColors = [
  "#F3F389",
  "#FFEE00", // giallo
  "#FF9F00", // giallo scuro
  "#DD4444", // giallo scuro
  "#BFD200",
  "#38B000",
  "#8FA290", // verde scuro
  "#60D394", // verde
  "#B4FFB3", // verde chiaro
  "#B8E1ED", // azzurro
  "#95B4CC", // turchese
  "#62929E",
  "#4EA8DE",
  "#90CAF9",
  "#63CBBF", // cobalto
  "#9375C3", // viola
  "#C7A4DA", // violetto
  "#FFB8DE", // rosa
  "#EC91D8",
  "#E078ED", // fucsia
  "#FB8F7E", // bordeaux
  "#F03151", // rosso
  "#E06055",
  "#D16A8F", // arancio
  "#B29479", // marrone
  "#D08C60",
  "#D1D1DA", // grigio (18)
];

export const mutations = {
  setInputText(state, payload) {
    state.inputText = payload;
  },
  setXMLText(state, payload) {
    state.XMLText = payload;
  },
  setTokenManager(state, payload) {
    state.tokenManager = payload;
  },
  addClass(state, payload) {
    let lastIndex = state.classes.reduce((p, c) => {
      return c.id > p ? c.id : p;
    }, 0);
    state.classes.push({
      id: lastIndex + 1,
      name: payload[0],
      attributes: payload[1].filter(a => a.name !== "ARGUMENT" && a.name !== "RELATIONS" && a.name !== "PICKER"),
      color: niceColors[lastIndex % niceColors.length],
      graph: payload[1].some(a => a.name === "ARGUMENT"),
      relations: payload[1].some(a => a.name === "RELATIONS"),
    });
    if (state.classes.length === 1) {
      state.currentClass = state.classes[0];
    }
  },
  setCurrentClass(state, payload) {
    state.currentClass = state.classes.find((c) => c.id === payload);
  },
  setCurrentBlock(state, payload) {
    state.currentBlock = payload;
    console.log({
      "current block: ": payload
    })
  },
  setDone(state, payload) {
    state.done = payload;
  },
  setUnsavedWork(state, payload) {
    state.unsavedWork = payload;
  },
  setComments(state, payload) {
    state.comments = payload;
  },
  setMainTab(state, payload) {
    state.mainTab = payload;
  },
  setArgumentsGraphJSON(state, payload) {
    state.argumentsGraphJSON = payload;
  },
  setRelationsGraphJSON(state, payload) {
    state.relationsGraphJSON = payload;
  }
};

export default {
  state() {
    return {
      tokenManager: {},
      comments: "",
      classes: [],
      inputText: "",
      XMLText: "",
      currentClass: {},
      currentBlock: {},
      done: false,
      unsavedWork: false,
      mainTab: "Tag",
      argumentsGraphJSON: {},
      relationsGraphJSON: {},
    };
  },
  mutations,
};