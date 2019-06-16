<template>
	<div class="main">
		<div class="components-list">
			<router-link
				class="nav"
				v-for="item in routes"
				:key="item.name"
				:to="item.path"
			>
				{{ item.name }}
			</router-link>
		</div>
		<div class="component-container">
			<div class="readme" v-show="isOnHome" v-html="readme"></div>
			<router-view></router-view>
		</div>
		<transition name="jelly">
			<div
				v-show="!isOnHome"
				class="fixed-btn"
				@click="$router.push('/')"
			></div>
		</transition>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { routes } from "./router";
import Prism from "prismjs";
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import "./assets/prism-theme.css";
export default Vue.extend({
	computed: {
		routes() {
			return routes;
		},
		isOnHome() {
			return this.$route.path === "/";
		},
		readme() {
			return require("!!html-loader!!!markdown-loader!../README.md");
		}
	},
	mounted() {
		Prism.highlightAll();
	}
});
</script>

<style lang='scss' scoped>
.components-list {
	box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
}
.nav {
	display: inline-block;
	text-decoration: none;
	color: #2c3e50;
	height: 3em;
	line-height: 3em;
	margin: 0 1em;
}

.router-link-active {
	font-weight: bold;
	color: #42b983;
}
.main {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.component-container {
	flex-grow: 1;
	display: flex;
}

.readme {
	flex-grow: 1;
	margin: 0 auto;
	max-width: 600px;
	background: url("./assets/logo-light.svg") no-repeat center;
	& /deep/ {
		color: #303133;
		line-height: 1.5;
		h1 {
			color: #42b983;
		}
		blockquote {
			color: #909399;
			background: linear-gradient(#409eff, #409eff) no-repeat;
			background-size: 3px 100%;
			margin: 0;
			padding-left: 2em;
		}
		h2 {
			font-weight: 400;
		}
	}
}

.fixed-btn {
	background: url("./assets/logo.svg") no-repeat;
	background-size: contain;
	height: 40px;
	width: 40px;
	position: fixed;
	bottom: 20px;
	right: 20px;
	cursor: pointer;
	transition: 0.3s;
	&:hover {
		transform: scale(1.2);
	}
	&:active {
		transform: scale(0.8);
	}
}

@keyframes jelly {
	0% {
		transform: scale(0);
	}

	30% {
		transform: scale(1);
	}

	60% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}

.jelly-enter-active {
	animation: jelly 0.3s ease-in;
}

.jelly-leave-active {
	animation: jelly 0.3s ease-in reverse;
}
</style>
<style>
body {
	margin: 0;
}
</style>
