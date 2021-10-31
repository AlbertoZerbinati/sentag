<template>
  <div id="column" style="overflow: visible">
    <div class="attribute-title stroke">
      <strong
        v-if="
          Object.keys(currentBlock).length &&
          Object.keys(currentBlock.attrs).length &&
          currentBlock.attrs['ID']
        "
        :style="{ color: currentBlock.backgroundColor }"
      >
        {{ currentBlock.attrs["ID"]["value"][0] }}
      </strong>
      <strong v-else :style="{ color: currentBlock.backgroundColor }">
        {{ currentBlock.label }}
      </strong>
    </div>

    <div
      v-if="Object.keys(currentBlock).length && Object.keys(currentBlock.attrs)"
    >
      <div
        class="field is-horizontal"
        v-for="at in Object.keys(currentBlock.attrs)"
        :key="at.id"
      >
        <div class="field-label is-normal">
          <label class="label tag"
            ><strong class="tag">{{ at }}</strong></label
          >
        </div>
        <div class="field-body" v-if="at !== 'PRO' && at !== 'CON'">
          <div class="field">
            <p class="control">
              <input
                v-if="currentBlock.attrs[at]['type'] === 'string'"
                @keydown="onKeyUp"
                v-model="currentBlock.attrs[at]['value'][0]"
                class="input is-normal"
                type="text"
              />
            </p>
            <p>
              <VueMultiselect
                v-if="currentBlock.attrs[at]['type'] === 'mutual'"
                :options="currentBlock.attrs[at]['options']"
                :searchable="false"
                :show-labels="false"
                :close-on-select="true"
                v-model="currentBlock.attrs[at]['value'][0]"
                style="width: 100%"
              />
            </p>
            <div
              class="select is-multiple"
              v-if="currentBlock.attrs[at]['type'] === 'multi'"
              style="display: block; max-width=100%; width=100%;"
            >
              <select
                multiple
                :size="currentBlock.attrs[at]['options'].length"
                v-model="currentBlock.attrs[at]['value']"
                style="overflow: hidden; max-width=100%; width=100%;"
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
            </div>
          </div>
        </div>
        <div class="field-body" v-if="at === 'PRO' || at === 'CON'">
          <div class="field">
            <p class="control">
              <input
                v-model="currentBlock.attrs[at]['value'][0]"
                class="input is-normal"
                disabled
                title="You can only edit this through the Graph interface"
                type="text"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueMultiselect from "vue-multiselect";

export default {
  name: "AttributesBlock",
  components: {
    VueMultiselect,
  },
  computed: {
    ...mapState(["currentBlock", "currentClass", "unsavedWork", "done"]),
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
.attribute-title {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
#column {
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.column {
  height: 80px;
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
.stroke {
  font-size: 140%;
  text-shadow: 1.8px 1.8px 1.2px black;
}
</style>
