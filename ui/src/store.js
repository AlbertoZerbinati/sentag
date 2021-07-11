const niceColors = [
  "#FFEE00BB", //giallo
  "#FCD060BB", //giallo scuro
  "#B4FFB3BB", //verde chiaro
  "#85DE77BB", //verde
  "#8DA290BB", //verde scuro
  "#B8E1EDBB", //azzurro
  "#95B4CCBB", //turchese
  "#63CBBFBB", //cobalto
  "#4F9EC4BB", //blu
  "#9375C3BB", //viola
  "#E078EDBB", //fucsia
  "#C7A4DABB", //violetto
  "#FFB8DEBB", //rosa
  "#F65151BB", //rosso
  "#CB3461BB", //bordeaux
  "#f7933bBB", //arancio
  "#DFA995BB", //marrone
  "#D5D5D5BB", //grigio (18)

];

export const mutations = {
  setInputSentences(state, payload) {
    if (!Array.isArray(payload)) {
      state.originalText = payload;
      payload = payload.split();
    }
    state.inputSentences = payload.map((s, i) => ({ id: i, text: s }));
  },
  addClass(state, payload) {
    let lastIndex = state.classes.reduce((p, c) => {
      return c.id > p ? c.id : p;
    }, 0);
    state.classes.push({
      id: lastIndex + 1,
      name: payload[0],
      attributes: payload[1].filter(a => a !== "GRAPH"),
      color: niceColors[lastIndex % niceColors.length],
      graph: payload[1].includes("GRAPH"),
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
  },
  setDone(state, payload) {
    state.done = payload;
  },
  setUnsavedWork(state, payload) {
    state.unsavedWork = payload;
  },
};

export const getters = {};
export default {
  state() {
    return {
      originalText: "",
      classes: [],
      inputSentences: [],
      currentClass: {},
      currentBlock: {},
      unsavedWork: false,
      done: false,
    };
  },
  getters,
  mutations,
  actions: {},
};
