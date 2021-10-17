<template>
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
          <span
            v-for="at in cl.attributes"
            :key="at.id"
            :style="{ margin: '3px' }"
          >
            <span class="tag supertiny"
              ><i
                ><strong :style="{ color: '#0c66a1', margin: '3px' }">{{
                  at.name
                }}</strong></i
              ></span
            >
          </span>
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
#column {
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.supertiny {
  height: 16px;
  width: 16px;
  font-size: 14px;
}
.column {
  height: 80px;
}
.tag {
  padding-right: 11px;
  padding-left: 11px;
  margin-right: 4px;
  margin-bottom: 0px;
}
.field-label {
  margin-right: 5px;
}
</style>