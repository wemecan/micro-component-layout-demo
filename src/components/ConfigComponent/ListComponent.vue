<template>
  <div class="list-component">
    <div class="item" v-for="item in list" :key="item.id">
      <h2>{{ item.path }}</h2>
      <p>
        脚本: <a :href="item.js">{{ item.js }}</a>
      </p>
      <p v-if="item.css">
        样式: <a :href="item.css">{{ item.css }}</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigComponentStore } from "./ConfigComponent.store";

export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    list() {
      return ConfigComponentStore.curNamespaceData;
    }
  }
});
</script>

<style lang='scss' scoped>
.list-component {
  padding: 0 30px;
  background: #fff;
  box-shadow: $--box-shadow-base;
  overflow: auto;
}
.list {
  flex-grow: 1;
}
.layout {
  width: 300px;
}
h2 {
  font-weight: 400;
  color: $--color-primary;
}
p {
  word-break: break-all;
  a {
    color: $--color-text-secondary;
  }
}
.item {
  border-bottom: $--border-base;
}
.item:last-child {
  border-bottom: none;
}
</style>