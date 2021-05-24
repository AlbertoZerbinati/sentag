<template>
  <div class="panel">
    <div class="panel-block">
      <classes-block/>
    </div>
    <div class="panel-block">
      <attributes-block/>
    </div>
  </div>
</template>

<script>
import ClassesBlock from "./components/ClassesBlock.vue";
import AttributesBlock from "./components/AttributesBlock.vue";
import "./assets/styles.scss";

export default {
  name: "Sidebar",
  components: {
    ClassesBlock,
    AttributesBlock,
  }
};
</script>
