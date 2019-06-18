<template>
  <div class="config-route">
    <section>
      <el-row class="add-row" @click.native="onCreateBtnClick">
        <i class="el-icon-circle-plus-outline"></i>
        <span>添加</span>
      </el-row>
      <div class="route-item" v-for="(item, path) in routeItemMap" :key="path">
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="20"
            ><h1>{{ path }}</h1></el-col
          >
          <el-col :span="4"></el-col>
        </el-row>
        <p>组件命名空间: {{ item.component.path.split(".")[0] }}</p>
        <p>组件名: {{ item.component.path.split(".")[1] }}</p>
      </div>
    </section>
    <dialog-modify ref="dialogModify" @submit="fetch"></dialog-modify>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigRouteStore } from "./ConfigRoute.store";
import DialogModify from "./DialogModify.vue";
import { ConfigComponentStore } from "../ConfigComponent/ConfigComponent.store";
export default Vue.extend({
  components: {
    DialogModify
  },
  async created() {
    this.fetch()
  },
  computed: {
    routeItemMap() {
      return ConfigRouteStore.state.dataOrigin;
    }
  },
  methods: {
    fetch() {
      ConfigRouteStore.reload();
      ConfigComponentStore.reload();
    },
    onCreateBtnClick() {
      (this.$refs.dialogModify as any).open();
    }
  }
});
</script>

<style lang='scss' scoped>
.config-route {
  background: $--color-background-base;
  padding: 20px;
  section {
    width: 1000px;
    margin: 0 auto;
  }
}
.add-row {
  background: #fff;
  box-shadow: $--box-shadow-base;
  color: $--color-text-secondary;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: $--color-primary;
  }
  span {
    font-size: 1.2em;
  }
  i {
    font-size: 1.5em;
    margin-right: 0.3em;
  }
}
.route-item {
  background: #fff;
  box-shadow: $--box-shadow-base;
  padding: 20px;
}
</style>