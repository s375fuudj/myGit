<template>
	<header>
		<div>
			<el-button @click="elbutclick()" type="primary" icon="el-icon-menu" size="mini"></el-button>
		</div>
		<div id="headerCenter">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" 
				:to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div id="headerRight">
			<el-dropdown>
				<span class="el-dropdown-link">
					<img id="userImg" :src="userImg" />
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="exit">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: "Header",
		data(){
			return {
				userImg:require("../assets/toux.png")
			}
		},
		methods:{
			elbutclick(){
				this.$store.commit("SETISCOLLAPSE");
				console.log(this.$store.state.NavMenv.isCollapse);
			},
			exit(){
				this.$store.commit("clearToken");
				this.$store.commit("clearMenu");
				this.$router.push("/Login")
				
			}
		},
		computed:{
			...mapState({
				breadcrumb:state=>state.NavMenv.tabsList
			})
		}
	}
</script>

<style lang="less" scoped>
	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	header {
		width: 100%;
		height: 100%;
		display: flex;

		#headerRight {
			margin-left: auto;
			.el-dropdown{
				height: 100%;
				#userImg{
					width: 37px;
					height: auto;
					border-radius: 50%;
					margin-top: 12px;
				}
			}
			
		}

		#headerCenter {
			margin-left: 10px;
			display: flex;
			.el-breadcrumb{
				display: flex;
				justify-content: center;
				align-items: center;
			}
			/deep/.el-breadcrumb__inner{
				color: #606266;
				font-weight: 400;
			}
			/deep/.el-breadcrumb__item:last-child{
				.el-breadcrumb__inner{
					color: #333;
					font-weight: 700;
				}
				
			}
		}
	}
</style>
