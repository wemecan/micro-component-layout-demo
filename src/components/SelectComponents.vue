<template>
  <el-select v-model="curComponentId" placeholder="请选择组件">
    <el-option-group v-for="(group, k) in dataOrigin" :key="k" :label="k">
      <el-option
        v-for="item in group"
        :key="item.id"
        :label="item.path.split('.')[1]"
        :value="item.id"
      ></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { ConfigComponentStore } from "./ConfigComponent/ConfigComponent.store";
export default {
  props: {
    value: {
      type: Number
    }
  },
  computed: {
    curComponentId: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    dataOrigin() {
      return ConfigComponentStore.dataGroupByPath;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>