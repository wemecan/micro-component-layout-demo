<template>
  <el-dialog title="新增组件" :visible.sync="visible">
    <el-form :model="form" ref="form" label-position="left">
      <el-form-item label="组件索引">
        <el-input
          v-model="form.path"
          placeholder="请填写组件在全局作用域中的地址"
        ></el-input>
        <span class="helper">使用尽可能复杂的namespace可避免覆盖同名属性</span>
      </el-form-item>
      <el-form-item label="脚本文件">
        <el-input v-model="form.js" placeholder="请填写组件脚本文件地址">
        </el-input>
        <span class="helper">http(s)://*.js</span>
      </el-form-item>
      <el-form-item label="样式文件">
        <el-input v-model="form.css" placeholder="请填写组件脚本文件地址">
        </el-input>
        <span class="helper">http(s)://*.css</span>
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
import { GlobalService, Component } from "../../service";
export default Vue.extend({
  data() {
    return {
      visible: false,
      form: {
        path: "",
        js: "",
        css: ""
      } as Component
    };
  },
  methods: {
    open(src: Component) {
      if (src) {
        this.form = src;
      }
      this.visible = true;
    },
    async onSubmit() {
      try {
        await GlobalService.createComonent(this.form);
        this.$emit("submit");
      } catch ({ response }) {
        if (response.status === 422) {
          this.$message.error(response.data.message);
        }
      }
    }
  }
});
</script>

<style lang='scss' scoped>
.el-form {
  .el-input {
    width: 30em;
  }
}
.helper {
  margin-left: 1em;
  color: $--color-text-placeholder;
}
</style>