const niceColors = [
  "#FFEE00", //giallo
  "#FCD060", //giallo scuro
  "#B4FFB3", //verde chiaro
  "#85DE77", //verde
  "#8DA290", //verde scuro
  "#B8E1ED", //azzurro
  "#95B4CC", //turchese
  "#63CBBF", //cobalto
  "#4F9EC4", //blu
  "#9375C3", //viola
  "#D95DEA", //fucsia
  "#C7A4DA", //violetto
  "#FFB8DE", //rosa
  "#FF5147", //rosso
  "#B22E56", //bordeaux
  "#f7933b", //arancio
  "#DFA995", //marrone
  "#D5D5D5", //grigio (15)

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
    // let existing = state.classes.find((c) => c.name == payload[0]);
    // if (existing) {
    //   return;
    // }
    let lastIndex = state.classes.reduce((p, c) => {
      return c.id > p ? c.id : p;
    }, 0);
    state.classes.push({
      id: lastIndex + 1,
      name: payload[0],
      attributes: payload[1],
      color: niceColors[lastIndex % niceColors.length],
    });
    if (state.classes.length === 1) {
      state.currentClass = state.classes[0];
    }
  },
  removeClass(state, payload) {
    state.classes = state.classes.filter((c) => c.id != payload);
    if (state.currentClass.id === payload) {
      state.currentClass = state.classes[0];
    }
  },
  setCurrentClass(state, payload) {
    state.currentClass = state.classes.find((c) => c.id === payload);
  },
  // setCurrentBlock(state, payload) {
  //   state.currentBlock = payload;
  // },
  addAnnotation(state, payload) {
    state.annotations.push(payload);
  },
};

export const getters = {};
export default {
  state() {
    return {
      originalText: "",
      classes: [],
      inputSentences: [],
      annotations: [],
      currentClass: {},
      //currentBlock: -1,
    };
  },
  getters,
  mutations,
  actions: {},
};
