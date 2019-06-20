<template>
  <div class="config-component">
    <el-row type="flex" align="middle" justify="space-between" class="top-row">
      <div>
        <el-button type="success" size="small" @click="onAddRow"
          >新增</el-button
        >
        <el-button icon size="small" @click="fetch">
          重置
        </el-button>
      </div>
      <cur-layout></cur-layout>
    </el-row>
    <list-component></list-component>
  </div>
</template>

<script>
import { ConfigComponentStore } from "./ConfigComponent.store";
import ListComponent from "./ListComponent.vue";
import CurLayout from "./CurLayout";
import DialogModify from "./DialogModify";
export default {
  components: {
    ListComponent,
    CurLayout,
    DialogModify
  },
  data() {
    return {};
  },
  computed: {
    dataOrigin() {
      return ConfigComponentStore.state.dataOrigin;
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      ConfigComponentStore.reload();
      ConfigComponentStore.getCurLayoutComponent();
    },
    onAddRow() {
      const newRow = {
        path: "namespace.name",
        _editing: true,
        _loading: false
      };
      ConfigComponentStore.state.tmpData.push(newRow);
    }
  }
};
</script>

<style lang="scss" scoped>
.top-row {
  box-shadow: $--box-shadow-base;
  background: #fff;
  padding: 20px;
}
.config-component {
  background: $--color-background-base;
  padding: 20px;
  section {
    width: 1000px;
    margin: 0 auto;
  }
}
.button-group {
  box-shadow: $--box-shadow-base;
  background: #fff;
  padding: 0 20px;
  margin-bottom: 10px;
}
</style>
