<template>
	<div class="config-route">
		<div class="inner">
			<el-row class="top-row">
				<el-button type="success" size="small" @click="onRowAdd">新增</el-button>
				<el-button size="small" @click="onReloadClick">重置</el-button>
			</el-row>
			<list-route></list-route>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import ListRoute from "./ListRoute.vue";
import { ConfigRouteStore } from "./ConfigRoute.store";
import { ConfigComponentStore } from "../ConfigComponent/ConfigComponent.store";
export default Vue.extend({
	components: {
		ListRoute
	},
	computed: {
		firstComponent() {
			return ConfigComponentStore.state.dataOrigin[0];
		}
	},
	methods: {
		onReloadClick() {
			ConfigRouteStore.reload();
		},
		async onRowAdd() {
			if (!this.firstComponent) {
				await ConfigComponentStore.reload();
			}
			ConfigRouteStore.state.dataOrigin.push({
				path: "",
				component: this.firstComponent || {}
			});
		}
	}
});
</script>

<style lang='scss' scoped>
.config-route {
	background-color: $--color-background-base;
	padding: 20px;
}
.inner {
	background-color: #fff;
	box-shadow: $--box-shadow-base;
}
.top-row {
	padding: 20px;
}
</style>