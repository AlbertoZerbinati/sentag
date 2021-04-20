import { mutations } from "../src/store";

const { addClass } = mutations;

test("Mutation: addClass assigns the right id", () => {
  // first class
  let state = { classes: [] };
  addClass(state, "test");
  expect(state.classes[0].id).toBe(1);

  // bunch of classes with random ids
  state.classes = [
    { id: 2, name: "class one" },
    { id: 45, name: "class 2" },
  ];
  addClass(state, "test");
  expect(state.classes[2].id).toBe(46);
});

test("Mutation: addClass always assigns a color", () => {
  let state = { classes: [] };
  for (let i = 0; i < 100; i++) {
    addClass(state, "class " + i);
    expect(typeof state.classes[i].color).toBe("string");
  }
});
