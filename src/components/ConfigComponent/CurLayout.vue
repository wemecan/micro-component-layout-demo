<template>
  <div class="cur-layout">
    <el-form size="medium">
      <el-form-item>
        <h3>当前布局组件:</h3>
        <el-select v-model="curLayoutComponent" placeholder="请选择组件">
          <el-option
            v-for="item in componentList"
            :key="item.id"
            :label="item.path"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="success" size="medium">确定</el-button>
      <el-button size="medium">重置</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigComponentStore } from "./ConfigComponent.store";

export default Vue.extend({
  computed: {
    curLayoutComponent: {
      get() {
        return ConfigComponentStore.state.curLayoutComponent;
      },
      set(newValue: any) {
        ConfigComponentStore.state.curLayoutComponent = newValue;
      }
    },
    componentList() {
      return ConfigComponentStore.state.dataOrigin;
    }
  }
});
</script>

<style lang='scss' scoped>
.el-select {
  width: 100%;
}
h3 {
  margin-top: 0;
  color: $--color-text-regular;
}
.cur-layout {
  box-shadow: $--box-shadow-base;
  background: #fff;
  padding: 20px;
}
</style>