<template>
  <el-dialog :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="地址">
        <el-input v-model="form.path" placeholder="请输入路由地址"></el-input>
      </el-form-item>
      <el-form-item label="组件">
        <select-components v-model="form.componentId"></select-components>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { RouteModifyPayload, GlobalService } from "../../service";
import SelectComponents from "../SelectComponents.vue";

export default Vue.extend({
  components: {
    SelectComponents
  },
  data() {
    return {
      visible: false,
      form: {
        path: "",
        componentId: undefined
      } as RouteModifyPayload
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    async onSubmit() {
      await GlobalService.createRouteItem(this.form);
      this.$emit("submit");
    }
  }
});
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>