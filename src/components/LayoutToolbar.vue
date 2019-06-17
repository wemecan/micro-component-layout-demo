<template>
	<div class="toolbar">
		<div class="logo"></div>
		<h1>Micro Layout Component</h1>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang='scss' scoped>
.toolbar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: $--height-toolbar;
	background: #fff;
	display: flex;
	align-items: center;
    padding: 0 1em;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,.04);
	border-bottom: $--border-base;
}
h1 {
	margin: 0;
	font-size: 1.2em;
	color: #606266;
}
.logo {
	background: url("http://ipic-1253962968.file.myqcloud.com/2019-06-17-wrench.svg") no-repeat center;
	background-size: 1.5em;
    height: 200px;
    width: 50px;
}
</style>