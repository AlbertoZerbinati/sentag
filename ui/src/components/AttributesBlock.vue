<template>
  <div id="root">
    <div class="attribute-title stroke">
      <strong
        v-if="
          currentBlock &&
          Object.keys(currentBlock).length &&
          Object.keys(currentBlock.attrs).length &&
          currentBlock.attrs['ID']
        "
        :style="{ color: currentBlock.backgroundColor }"
      >
        {{ currentBlock.attrs["ID"]["value"][0] }}
      </strong>
      <strong
        v-else-if="currentBlock && Object.keys(currentBlock).length"
        :style="{ color: currentBlock.backgroundColor }"
      >
        {{ currentBlock.label }}
      </strong>
      <strong v-else> Select a token... </strong>
    </div>

    <div id="column">
      <div class="is-multiline">
        <div
          v-if="
            currentBlock &&
            Object.keys(currentBlock).length &&
            Object.keys(currentBlock.attrs).length
          "
        >
          <div
            class="field is-horizontal"
            v-for="at in Object.keys(currentBlock.attrs)"
            :key="at.id"
          >
            <div class="field-label is-normal">
              <label class="label tag"
                ><strong class="tag"
                  >{{ at }}
                  <span class="star" v-if="currentBlock.attrs[at].required">
                    *
                  </span>
                </strong></label
              >
            </div>
            <div class="field-body" v-if="at === 'ID'">
              <div class="field">
                <p class="control">
                  <input
                    @keydown="onKeyUp"
                    v-model="currentBlock.attrs[at]['value'][0]"
                    class="input is-normal"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div class="field-body" v-else-if="at !== 'PRO' && at !== 'CON'">
              <div class="field">
                <p
                  class="control"
                  v-if="currentBlock.attrs[at]['type'] === 'string'"
                >
                  <input
                    @keydown="onKeyUp"
                    :value="currentBlock.attrs[at]['value'][0].split('|')[0]"
                    @change="
                      currentBlock.attrs[at]['value'][0] = $event.target.value
                    "
                    :disabled="at.includes('_')"
                    class="input is-normal"
                    type="text"
                  />
                </p>
                <p v-else-if="currentBlock.attrs[at]['type'] === 'mutual'">
                  <VueMultiselect
                    :options="currentBlock.attrs[at]['options']"
                    :searchable="false"
                    :show-labels="false"
                    :close-on-select="true"
                    open-direction="bottom"
                    v-model="currentBlock.attrs[at]['value'][0]"
                    style="width: 100%"
                  />
                </p>
                <p
                  class="select is-multiple"
                  v-else-if="currentBlock.attrs[at]['picker']"
                  style="display: block; max-width=100%; width=100%;"
                >
                  <select
                    multiple
                    :size="currentBlock.attrs[at]['options'].length"
                    v-model="currentBlock.attrs[at]['value']"
                    style="max-width=100%; width=100%; overflow-y: auto;"
                    @change="onSelectionChanged"
                    value="[]"
                  >
                    <option
                      v-for="(
                        item, key
                      ) in tokenManager.findAllPickablesForClass(
                        currentBlock.attrs[at]['picker']
                      )"
                      :value="key"
                      :key="key"
                      style="display: block; max-width=100%; width=100%;"
                    >
                      {{ item }}
                    </option>
                  </select>
                </p>

                <p
                  class="select is-multiple"
                  v-else-if="currentBlock.attrs[at]['type'] === 'multi'"
                  style="display: block; max-width=100%; width=100%;"
                >
                  <select
                    multiple
                    :size="currentBlock.attrs[at]['options'].length"
                    v-model="currentBlock.attrs[at]['value']"
                    style="max-width=100%; width=100%; overflow-y: auto;"
                    @change="onSelectionChanged"
                    value="[]"
                  >
                    <option
                      v-for="opt in currentBlock.attrs[at]['options']"
                      :value="opt"
                      :key="opt"
                      style="display: block; max-width=100%; width=100%;"
                    >
                      {{ opt }}
                    </option>
                  </select>
                </p>
              </div>
            </div>
            <div class="field-body" v-if="at === 'PRO' || at === 'CON'">
              <div class="field">
                <p class="control">
                  <input
                    :value="currentBlock.attrs[at]['value'][0].split('|')[0]"
                    class="input is-normal"
                    disabled
                    title="You can only edit this through the Graph interface"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="is-pulled-right">
            <input
              id="switchRoundedDanger"
              v-model="enabled"
              type="checkbox"
              name="switchRoundedDanger"
              class="switch is-rounded is-danger is-small"
            />
            <label id="labelForSwitchRoundedDanger" for="switchRoundedDanger"
              >Edit</label
            >
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueMultiselect from "vue-multiselect";
import "bulma-switch";

export default {
  name: "AttributesBlock",
  data: function () {
    return { obj: { 15: "partA", 2: "part2" } };
  },
  components: {
    VueMultiselect,
  },
  computed: {
    ...mapState([
      "tokenManager",
      "currentBlock",
      "currentClass",
      "unsavedWork",
      "done",
    ]),
  },
  methods: {
    ...mapMutations(["setUnsavedWork", "setDone"]),
    onKeyUp(e) {
      if (e.key === ">" || e.key === "<" || e.key === " " || e.key === '"') {
        e.preventDefault();
      } else {
        this.setUnsavedWork(true);
        this.setDone(false);
      }
    },
    onSelectionChanged() {
      this.setUnsavedWork(true);
      this.setDone(false);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="css" scoped>
#root {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#column {
  position: relative;
  overflow-y: visible;
  overflow-x: hidden;
  height: 100%;
}
.tag {
  padding-right: 11px;
  padding-left: 11px;
  margin-right: 4px;
  margin-bottom: 0px;
  color: #0c66a1;
}
.field-label {
  margin-right: 5px;
}
.attribute-title {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
}
.stroke > strong {
  font-size: 130%;
  text-shadow: 0.6px 0.6px 0.8px #0c66a1;
  color: #0c66a1;
}
#labelForSwitchRoundedDanger {
  margin-right: 10px;
}
.star {
  color: red;
}
</style>
