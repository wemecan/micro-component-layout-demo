<template>
	<div class="list-component">
		<el-table :data="list" :row-class-name="getRowClassName">
			<el-table-column label="ID" prop="id" width="100"></el-table-column>
			<el-table-column label="Namespace">
				<editable-cell
					slot-scope="{ row }"
					:value="row.path.split('.')[0]"
					size="small"
					@input="onNamespaceInput($event, row)"
					@change="onRowChange(row)"
				>
					<span>{{ row.path.split(".")[0] }}</span>
				</editable-cell>
			</el-table-column>
			<el-table-column label="Js Url">
				<editable-cell
					slot-scope="{ row }"
					v-model="row.js"
					size="small"
					@change="onRowChange(row)"
				></editable-cell>
			</el-table-column>
			<el-table-column label="CSS Url" prop="css">
				<editable-cell
					slot-scope="{ row }"
					v-model="row.css"
					size="small"
					@change="onRowChange(row)"
				></editable-cell>
			</el-table-column>
			<el-table-column label="Name">
				<editable-cell
					slot-scope="{ row }"
					:value="row.path.split('.')[1]"
					@input="onNameInput($event, row)"
					size="small"
				>
					<span>{{ row.path.split(".")[1] }}</span>
				</editable-cell>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="{row}">
					<el-link type="success" @click="onRowUpdate(row)" v-if="row._editing"
						><i class="el-icon-circle-check"></i
					></el-link>
					<el-link type="danger" @click="onRowDelete(row)"
						><i class="el-icon-delete"></i
					></el-link>
					<el-link type="primary" @click="onRowCopy(row)">
						<i class="el-icon-copy-document"></i>
					</el-link>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			title="删除失败"
			:visible.sync="deleteDialog.visible"
			width="400px"
		>
			<div class="delete-dialog">
				<h3><i class="el-icon-error"> </i>{{ deleteDialog.message }}</h3>
				<span
					>你依然可以尝试
					<el-link type="danger" @click="onRowDelete(deleteDialog.row, true)"
						>强制删除</el-link
					>, 所有使用该组件的实体将会被一并删除. 该操作无法挽回,
					请确认你知道你在干什么</span
				>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { ConfigComponentStore } from "./ConfigComponent.store";
import { Component, GlobalService } from "../../service";
import { AxiosResponse } from "axios";

export interface Row extends Component {
	_error?: boolean;
	_editing?: boolean;
	_loading?: boolean;
	_hidden?: boolean;
}

export default Vue.extend({
	data() {
		return {
			deleteDialog: {
				visible: false,
				message: "",
				row: {}
			}
		};
	},
	computed: {
		list() {
			return ConfigComponentStore.state.tmpData.filter(
				(item: Row) => !item._hidden
			);
		}
	},
	methods: {
		onNamespaceInput(value: any, row: Row) {
			const name = row.path.split(".")[1];
			row.path = value + "." + name;
		},
		onNameInput(value: any, row: Row) {
			const namespace = row.path.split(".")[0];
			row.path = namespace + "." + value;
		},
		onRowChange(row: Row) {
			this.$set(row, "_editing", true);
		},
		async onRowUpdate(row: Row) {
			try {
				if (row.id) {
					await GlobalService.updateComponent(row.id, row);
				} else {
					await GlobalService.createComonent(row);
				}
				ConfigComponentStore.reload();
			} catch (e) {
				this.$set(row, "_error", true);
			}
		},
		async onRowDelete(row: Row, force?: boolean) {
			if (row.id && !force) {
				try {
					await GlobalService.deleteComponent(row.id);
					ConfigComponentStore.reload();
				} catch (error) {
					const res: AxiosResponse = error.response;
					if (res.status === 403) {
						this.deleteDialog = {
							visible: true,
							message: res.data.message,
							row
						};
					}
				}
			} else if (row.id && force) {
				try {
					await GlobalService.deleteComponent(row.id, true);
					ConfigComponentStore.reload();
					this.deleteDialog.visible = false;
				} catch (error) {
					const res: AxiosResponse = error.response;
					this.$message.error(res.data);
				}
			} else {
				this.$set(row, "_hidden", true);
			}
		},
		onRowCopy(row: Row) {
			const newRow: Row = {
				...row,
				_editing: true,
				_error: false
      };
      delete newRow.id;
			ConfigComponentStore.state.tmpData.push(newRow);
		},
		getRowClassName(payload: { row: Row }) {
			const { row } = payload;
			return row._error ? "error-row" : "";
		}
	}
});
</script>

<style lang='scss' scoped>
.el-link {
	& + & {
		margin-left: 1em;
	}
}
.el-table /deep/ .error-row {
	background: lighten($color: $--color-danger, $amount: 10%);
}
.delete-dialog {
	h3 {
		margin-top: 0;
		i {
			font-size: 1.2em;
			margin-right: 0.3em;
			color: $--color-danger;
		}
	}
}
</style>