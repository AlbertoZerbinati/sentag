<template>
  <div id="root">
    <div class="attribute-title stroke">
      <strong> XSD classes </strong>
    </div>
    <div id="column">
      <div class="is-multiline">
        <div class="tags is-medium">
          <div class="column" v-for="cl in classes" :key="cl.id">
            <a
              :style="{ border: cl.color }"
              class="tag is-medium"
              :class="{ 'is-info': cl.id === currentClass.id }"
              @click="setCurrentClass(cl.id)"
            >
              <span
                class="panel-icon color-box"
                :style="{ backgroundColor: cl.color }"
              ></span>
              <strong>{{ cl.name }}</strong>
            </a>
            <br />
            <span v-for="at in cl.attributes" :key="at.id">
              <span class="tag tiny" style="position:relative; margin-right: 3px; top: -4px;"
                ><i
                  ><strong :style="{ color: '#0c66a1' }"
                    >{{ at.name }}
                    <span class="star" v-if="at.required">*</span>
                  </strong></i
                ></span
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ClassesBlock",
  computed: {
    ...mapState(["classes", "currentClass"]),
  },
  methods: {
    ...mapMutations(["setCurrentClass"]),
  },
};
</script>

<style lang="css" scoped>
.color-box {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 1rem;
  border-radius: 5px;
}
#root {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#column {
  position: relative;
  overflow-y: auto;
}
.supertiny {
  height: 16px;
  width: 16px;
  font-size: 14px;
}
.column {
  min-height: 80px;
  top: 0px;
  padding-top: 0px;
}
.tiny {
  padding-left: 3px;
  padding-right: 3px;
}
.normal {
  padding-right: 11px;
  padding-left: 11px;
  margin-right: 0px;
  margin-bottom: 2px;
  top: 0px;
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
.star {
  color: red;
}
</style>
