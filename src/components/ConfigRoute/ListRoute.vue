<template>
	<div>
		<el-table :data="source.filter(item => !item._hidden)">
			<el-table-column label="ID" prop="id" :width="100"></el-table-column>
			<el-table-column label="路由">
				<template #default="{row}">
					<editable-cell
						v-model="row.path"
						placeholder="/routes"
						@change="onRowChange(row)"
					></editable-cell>
				</template>
			</el-table-column>
			<el-table-column label="组件">
				<template #default="{row}">
					<select-component
						v-model="row.component.id"
						@input="onRowChange(row)"
					></select-component>
				</template>
			</el-table-column>
			<el-table-column label="操作" :width="250">
				<template #default="{row}">
					<el-link type="success" v-if="row._editing" class="submit-link" @click="onRowUpdate(row)">
						<i class="el-icon-circle-check"></i>
					</el-link>
					<el-link type="danger" @click="onRowDelete(row)">
						<i class="el-icon-delete"></i>
					</el-link>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigRouteStore } from "./ConfigRoute.store";
import { GlobalService, Route } from "../../service";
import { ConfigComponentStore } from "../ConfigComponent/ConfigComponent.store";

export interface Row extends Route {
	_editing?: boolean;
	_hidden?: boolean;
	_error?: boolean;
}

export default Vue.extend({
	computed: {
		source() {
			return ConfigRouteStore.state.dataOrigin;
		}
	},
	created() {
		ConfigRouteStore.reload();
	},
	methods: {
		onRowChange(row: Row) {
			this.$set(row, "_editing", true);
		},
		async onRowDelete(row: Row) {
			if (row.id) {
				await GlobalService.deleteRouteItem(row.id);
			}
			this.$set(row, "_hidden", true);
		},
		async onRowUpdate(row: Row) {
			const payload = {
				...row,
				componentId: row.component.id
			};
			if (!row.id) {
				await GlobalService.createRouteItem(payload);
			} else {
				await GlobalService.updateRouteItem(row.id, payload);
			}
			ConfigRouteStore.reload()
		}
	}
});
</script>

<style lang='scss' scoped>
.submit-link {
	margin-right: 1em;
}
</style>