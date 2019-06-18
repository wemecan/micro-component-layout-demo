<template>
  <div class="config-component">
    <section>
      <el-row type="flex" :gutter="10">
        <el-col>
          <div class="namespace-card">
            <label>命名空间</label>
            <el-autocomplete
              size="medium"
              v-model="curNamespace"
              :fetch-suggestions="namespaceQuery"
              placeholder="请输入命名空间"
              @select="onSelect"
            >
              <template #default="{item}">
                {{ item }}
              </template>
            </el-autocomplete>
          </div>
          <list-component></list-component>
        </el-col>
        <el-col :span="10">
          <div class="button-group">
            <el-button
              type="text"
              icon="el-icon-circle-plus"
              @click="onOpenDialogModify"
              >新增组件</el-button
            >
          </div>
          <cur-layout></cur-layout>
        </el-col>
      </el-row>
    </section>
    <dialog-modify ref="dialogModify" @submit="fetch"></dialog-modify>
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
  computed: {
    curNamespace: {
      get() {
        return ConfigComponentStore.state.curNameSpace;
      },
      set(newValue) {
        ConfigComponentStore.state.curNameSpace = newValue;
      }
    },
    dataOrigin() {
      return ConfigComponentStore.state.dataOrigin;
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      ConfigComponentStore.reload();
      ConfigComponentStore.getCurLayoutComponent();
    },
    onOpenDialogModify() {
      this.$refs.dialogModify.open();
    },
    namespaceQuery(str, cb) {
      const dataOrigin = this.dataOrigin;
      if (str) {
        const regex = new RegExp(str, "i");
        cb(Object.keys(dataOrigin).filter(item => regex.test(item)));
      } else {
        cb(Object.keys(dataOrigin));
      }
    },
    onSelect(item) {
      this.curNamespace = item;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.namespace-card {
  box-shadow: $--box-shadow-base;
  background: #fff;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .el-autocomplete {
    flex: 1;
  }

  label {
    flex-shrink: 0;
    margin-right: 1em;
    color: $--color-text-regular;
  }
}
</style>
