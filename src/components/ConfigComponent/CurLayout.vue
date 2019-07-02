<template>
	<div class="cur-layout">
		<el-form size="small" inline>
			<el-form-item label="当前布局组件">
				<select-component v-model="curLayoutComponentId"></select-component>
			</el-form-item>
			<el-button
				:disabled="cacheId < 0"
				type="danger"
				size="small"
				@click="onSubmit"
				>确定</el-button
			>
		</el-form>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigComponentStore } from "./ConfigComponent.store";
import { GlobalService } from '../../service';

export default Vue.extend({
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
				try {
					await this.$confirm(
						"更改布局组件是危险操作, 请确定你知道自己在做什么",
						{
							type: "warning"
						}
					);
					await GlobalService.setLayoutComponent(this.curLayoutComponentId);
					this.cacheId = -1;
				} catch (e) {
					this.onReset();
				}
			}
		}
	}
});
</script>

<style lang='scss' scoped>
.el-select {
	min-width: 300px;
}
h3 {
	margin-top: 0;
	color: $--color-text-regular;
}
.warning {
	color: $--color-text-placeholder;
	font-size: 0.8em;
	margin-left: 1em;
}

.cur-layout /deep/ .el-form-item {
	margin-bottom: 0;
}
</style>