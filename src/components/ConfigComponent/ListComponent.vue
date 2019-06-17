<template>
	<el-row class="list-component-container" type="flex" :gutter="30">
		<el-col class="list">
			<div v-for="item in source" :key="item.id">
				{{ item }}
			</div>
		</el-col>
		<el-col class="layout" v-if="curLayoutComponent">
			<el-card>
				<el-form size="medium">
					<el-form-item>
						<h3>当前布局组件:</h3>
						<el-select v-model="curLayoutComponent" placeholder="请选择组件">
							<el-option v-for="item in source" :key="item.id" :label="item.path" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-button type="success" size="medium">确定</el-button>
					<el-button size="medium">重置</el-button>
				</el-form>
			</el-card>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigComponentStore } from "./ConfigComponent.store";

export default Vue.extend({
	data() {
		return {};
	},
	computed: {
		source() {
			return ConfigComponentStore.state.dataOrigin;
		},
		curLayoutComponent: {
			get() {
				return ConfigComponentStore.state.curLayoutComponent;
			},
			set(newValue: any) {
				ConfigComponentStore.state.curLayoutComponent = newValue;
			}
		}
	}
});
</script>

<style lang='scss' scoped>
.list-component-container {
	padding: 30px;
}
.list {
	flex-grow: 1;
}
.layout {
	width: 300px;
}
h3 {
	margin: 0;
	font-size: 1em;
}
</style>