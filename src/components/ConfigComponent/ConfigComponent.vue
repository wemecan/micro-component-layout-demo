<template>
	<div>
		<list-component></list-component>
	</div>
</template>

<script>
import { ConfigComponentStore } from "./ConfigComponent.store";
import ListComponent from "./ListComponent.vue";
export default {
	components: {
		ListComponent
	},
	created() {
        ConfigComponentStore.reload();
        ConfigComponentStore.getCurLayoutComponent();
	}
};
</script>

<style lang="scss" scoped>
</style>