<template>
  <div class="cell">
    <component
      v-if="edit || !value"
      :is="tag"
      placeholder="Hi Edit"
      v-bind="$attrs"
      v-on="listener"
      :value="value"
      ref="input"
    ></component>
    <div v-else @click="onEditEnable">
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      edit: false,
      cacheValue: ""
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "el-input"
    },
    exitEvent: {
      type: String,
      default: "blur"
    }
  },
  computed: {
    listener() {
      return {
        [this.exitEvent]: this.onEditExit,
        input: this.onInput,
        ...this.$listeners
      };
    }
  },
  methods: {
    onEditExit() {
      this.edit = false;
      if (this.cacheValue !== this.value) {
        this.$emit("change", this.value, this.cacheValue);
      }
    },
    onEditEnable() {
      this.edit = true;
      this.cacheValue = this.value;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onInput(e) {
      this.$emit("input", e);
    }
  }
});
</script>

<style scoped>
.cell {
  cursor: pointer;
}
</style>