<template>
	<el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" default-active="1-4-1"
		class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
		:collapse="isCollapse" :collapse-transition = "false">
		<el-menu-item>
			<h3>{{asideHeader}}</h3>
		</el-menu-item>
		<el-menu-item v-for="(item,index) in noChildren" :key="item.name" :index="item.name" @click="clickMenv(item)">
			<i :class='"el-icon-"+item.icon'></i>
			<span slot="title">{{item.label}}</span>
		</el-menu-item>
		<el-submenu v-for="(item,index) in hasChildren" :key="item.icon" :index="item.icon">
			<template slot="title">
				<i :class='"el-icon-"+item.icon'></i>
				<span slot="title">{{item.label}}</span>
			</template>
			<el-menu-item-group v-for="(itemChildren,indexChildren) in item.children" :key="indexChildren">
				<el-menu-item @click="clickMenv(itemChildren)" :index="itemChildren.name">{{itemChildren.label}}
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>

</template>

<script>
	export default {
		name: 'NavMenu',
		data() {
			return {
				NavMData: []
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},

			clickMenv(item) {
				this.$router.push({
					name: item.name,
				})
				this.$store.dispatch('selectMenu', item)
			}

		},
		computed: {
			noChildren() {
				return this.asyncNavMData.filter(item => !item.children)
			},
			hasChildren() {
				return this.asyncNavMData.filter(item => item.children)
			},
			isCollapse() {
				return this.$store.state.NavMenv.isCollapse
			},
			asideHeader() {
				if (!this.isCollapse) {
					return "通用后台管理系统";
				}
				return "后台"
			},
			asyncNavMData() {
				return this.$store.state.NavMenv.menu
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-menu {
		height: 100%;
		text-align: left;
		border-right: solid 0px #e6e6e6;
		.el-menu-item {
			min-width: 160px;
		}
	}
</style>
