<template>
  <div class="config-component">
    <section>
      <el-row type="flex" :gutter="10">
        <el-col>
          <list-component></list-component>
        </el-col>
        <el-col :span="10">
          <div class="button-group">
            <el-button type="text" icon="el-icon-circle-plus" @click="onOpenDialogModify"
              >新增组件</el-button
            >
          </div>
          <cur-layout></cur-layout>
        </el-col>
      </el-row>
    </section>
    <dialog-modify ref="dialogModify"></dialog-modify>
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
  created() {
    ConfigComponentStore.reload();
    ConfigComponentStore.getCurLayoutComponent();
  },
  methods: {
    onOpenDialogModify() {
      this.$refs.dialogModify.open();
    }
  }
};
</script>

<style lang="scss" scoped>
.config-component {
  background: $--color-background-base;
  display: flex;
  justify-content: center;
  padding: 20px;
  section {
    width: 1000px;
  }
}
.button-group {
  box-shadow: $--box-shadow-base;
  background: #fff;
  padding: 0 20px;
  margin-bottom: 10px;
}
</style>
