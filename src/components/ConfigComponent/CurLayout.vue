<template>
  <div class="cur-layout">
    <el-form size="medium">
      <el-form-item>
        <h3>当前布局组件:</h3>
        <select-components
          v-if="curLayoutComponentId"
          v-model="curLayoutComponentId"
        ></select-components>
      </el-form-item>
      <p class="warning" v-if="cacheId > 0">
        更改布局组件是危险操作, 请确定你知道自己在做什么
      </p>
      <el-button
        :disabled="cacheId < 0"
        type="danger"
        size="medium"
        @click="onSubmit"
        >确定</el-button
      >
      <el-button :disabled="cacheId < 0" size="medium" @click="onReset"
        >恢复</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigComponentStore } from "./ConfigComponent.store";
import { GlobalService } from "../../service";
import SelectComponents from "../SelectComponents.vue";

export default Vue.extend({
  components: {
    SelectComponents
  },
  data() {
    return {
      cacheId: -1
    };
  },
  computed: {
    curLayoutComponentId: {
      get() {
        return ConfigComponentStore.state.curLayoutComponentId;
      },
      set(value: number) {
        const oldId = ConfigComponentStore.state.curLayoutComponentId;
        if (oldId && this.cacheId < 0) {
          this.cacheId = oldId;
        }
        ConfigComponentStore.state.curLayoutComponentId = value;
      }
    },
    dataOrigin() {
      return ConfigComponentStore.state.dataOrigin;
    }
  },
  methods: {
    onReset() {
      this.curLayoutComponentId = this.cacheId;
      this.cacheId = -1;
    },
    async onSubmit() {
      if (this.curLayoutComponentId) {
        await GlobalService.setLayoutComponent(this.curLayoutComponentId);
        this.cacheId = -1;
      }
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
.warning {
  color: $--color-text-placeholder;
  font-size: 0.8em;
}
</style>