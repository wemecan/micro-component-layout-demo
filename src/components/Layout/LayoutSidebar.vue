<template>
  <div class="sidebar">
    <router-link to="/components"
      ><i class="el-icon-menu"></i>组件管理</router-link
    >
    <router-link to="/routes"
      ><i class="el-icon-s-flag"></i>路由管理</router-link
    >
    <el-divider></el-divider>
    <router-link to="/user"><i class="el-icon-s-home"></i>我的</router-link>
    <router-link to="/help"><i class="el-icon-s-help"></i>帮助</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang='scss' scoped>
.sidebar {
  position: fixed;
  left: 0;
  height: calc(100vh - #{$--height-toolbar});
  top: $--height-toolbar;
  width: $--width-sidebar;
  border-right: $--border-base;
  background: #fff;
}
a {
  text-decoration: none;
  display: flex;
  padding: 1.5em 1.5em 0;
  color: $--color-text-regular;
  align-items: center;
  transition: color .1s ease-in-out;
  i {
    font-size: 1.5em;
    margin-right: 0.3em;
  }
  &:hover, &.router-link-active {
    color: $--color-primary;
  }
}
.el-divider {
  margin: 1.5em 0 0;
}
</style>