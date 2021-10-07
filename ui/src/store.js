const niceColors = [
  "#FFEE00", // giallo
  "#FCD060", // giallo scuro
  "#B4FFB3", // verde chiaro
  "#85DE77", // verde
  "#8DA290", // verde scuro
  "#B8E1ED", // azzurro
  "#95B4CC", // turchese
  "#63CBBF", // cobalto
  "#4F9EC4", // blu
  "#9375C3", // viola
  "#E078ED", // fucsia
  "#C7A4DA", // violetto
  "#FFB8DE", // rosa
  "#F65151", // rosso
  "#CB3461", // bordeaux
  "#f7933b", // arancio
  "#DFA995", // marrone
  "#D5D5D5", // grigio (18)
];

export const mutations = {
  setInputText(state, payload) {
    state.inputText = payload;
  },
  addClass(state, payload) {
    let lastIndex = state.classes.reduce((p, c) => {
      return c.id > p ? c.id : p;
    }, 0);
    state.classes.push({
      id: lastIndex + 1,
      name: payload[0],
      attributes: payload[1].filter(a => a.name !== "GRAPH"),
      color: niceColors[lastIndex % niceColors.length],
      graph: payload[1].some(a => a.name === "GRAPH"),
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
    console.log({"current block: ": payload})
  },
  setDone(state, payload) {
    state.done = payload;
  },
  setUnsavedWork(state, payload) {
    state.unsavedWork = payload;
  },
};

export default {
  state() {
    return {
      classes: [],
      inputText: "",
      currentClass: {},
      currentBlock: {},
      done: false,
      unsavedWork: false,
    };
  },
  mutations,
};
