<template>
  <div class="layout">
    <layout-sidebar></layout-sidebar>
    <layout-toolbar></layout-toolbar>
    <slot></slot>
  </div>
</template>

<script>
import LayoutToolbar from "./LayoutToolbar.vue";
import LayoutSidebar from "./LayoutSidebar.vue";

export default {
  components: {
    LayoutToolbar,
    LayoutSidebar
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: $--height-toolbar;
  padding-left: $--width-sidebar;
  background: $--color-background-base;
}
</style>
<style>
body {
  margin: 0;
}
</style>
