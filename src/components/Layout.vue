<template>
	<div class="layout">
		<layout-toolbar></layout-toolbar>
		<layout-sidebar></layout-sidebar>
		<slot></slot>
	</div>
</template>

<script>
import LayoutToolbar from "./LayoutToolbar.vue";
import LayoutSidebar from './LayoutSidebar.vue';
export default {
	components: {
		LayoutToolbar,
		LayoutSidebar
	}
};
</script>

<style lang="scss" scoped>
.layout {
	min-height: 100vh;
	box-sizing: border-box;
	padding-top: $--height-toolbar;
	padding-left: $--width-sidebar;
}
</style>
<style>
body {
	margin: 0;
}
</style>
