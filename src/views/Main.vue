<template>
	<el-container id="Container">
		<el-aside width="auto">
			<NavMenv />
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<el-main>
				<Tag style="text-align: left;"></Tag>
				<transition enter-active-class="animate__animated animate__fadeInLeft">
					<router-view></router-view>
				</transition>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import Tag from '../components/Tag.vue'
	import Header from "../components/Header.vue"
	import NavMenv from "../components/NavMenv.vue"
	export default {
		name: "Main",
		components: {
			NavMenv,
			Header,
			Tag
		}
	}
</script>

<style lang="less" scoped>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		text-align: center;
		line-height: 200px;
		height: 100%;
		overflow: hidden;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
	}

	#Container {
		height: 100%;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	
</style>
