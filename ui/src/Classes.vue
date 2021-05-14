<template>
  <div class="panel">
    <div class="panel-block">
      <classes-block :attr="false"/>
    </div>
    <div class="panel-block">
      <classes-block :attr="true"/>
    </div>
  </div>
</template>

<script>
import ClassesBlock from "./components/ClassesBlock.vue";
import "./assets/styles.scss";

export default {
  name: "Classes",
  components: {
    ClassesBlock,
  }
};
</script>
