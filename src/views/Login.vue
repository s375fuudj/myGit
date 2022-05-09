<template>

	<!-- autocomplete 是否自动补完 -->
	<el-form :inline="true" :model="formInline" :rules="rules" class="container" label-width="100px">
		<h3 class="Login_title">系统登录</h3>
		<el-form-item label="用户名">
			<el-input prop="name" v-model="formInline.username" placeholder="请输入账号" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input prop="password" v-model="formInline.password" type="password"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit" class="Login_submit">登陆</el-button>
		</el-form-item>
	</el-form>

</template>

<script>
	import Mock from 'mockjs'
	import {
		getMenu
	} from '../api/data.js'
	export default {
		name: "Login",
		/* props: {
			formInline: Object
		}, */
		data() {
			return {
				rules: {
					name: [{
							/* trigger blur失去焦点是验证
								change	值发生改变时验证
							 */
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							message: '用户名长度不能小于三位',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				formInline: {
					username: "",
					password: ""
				}
			}
		},
		methods: {
			onSubmit() {
				//传入用户名密码 code20000时请求成功
				//验证username === 'admin' && password === 'admin'
				//验证username === 'xiaoxiao' && password === 'xiaoxiao'
				//返回路由 message token(唯一值)
				getMenu(this.formInline).then(({data}) => {
					console.log(data)
					if (data.code === 20000) {
						//清除原先路由
						this.$store.commit('clearMenu')
						//设置获得的路由值
						this.$store.commit('setMenu',data.data.menu)
						//vuex,cookie中备份一个唯一值,
						this.$store.commit('setToken',data.data.token)
						//添加路由
						this.$store.commit('addMenu',this.$router)
						this.$router.push({name:'Home'})
					} else {
						this.$message({
							message:data.data.message,
							type: 'warning'
						});
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		border-radius: 15px;
		width: 350px;
		margin: 180px auto;
		// 背景不包括边框
		background-clip: padding-box;
		background-color: #fff;
		border: 1px solid #eaeaea;
		padding: 35px 35px 15px 35px;
		box-shadow: 0 0 25px #cac6c6;

		.Login_title {
			margin: 0px auto 40px auto;
			text-align: center;
			color: #505458;
		}

		.Login_submit {
			margin: 10px auto 0px 150px;
		}
	}
</style>
