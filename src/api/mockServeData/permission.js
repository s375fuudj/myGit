import Mock from "mockjs"
export default {
	getMenu: config => {
		const {
			username,
			password
		} = JSON.parse(config.body)
		if (username === 'admin' && password === 'admin') {
			return {
				code: 20000,
				data: {
					menu: [{
							path: '/Home',
							name: 'Home',
							label: '首页',
							icon: 's-home',
							url: 'Home.vue'
						},
						{
							path: '/Mall',
							name: 'Mall',
							label: '商品管理',
							icon: 'video-play',
							url: 'Mall.vue'
						},
						{
							path: '/User',
							name: 'User',
							label: '用户管理',
							icon: 'user',
							url: 'User.vue'
						},
						{
							label: '其他',
							icon: 'location',
							children: [{
									path: '/pageOne',
									name: 'pageOne',
									label: '页面1',
									icon: 'setting',
									url: 'other/pageOne'
								},
								{
									path: '/pageTwo',
									name: 'pageTwo',
									label: '页面2',
									icon: 'setting',
									url: 'other/pageTwo'
								}
							]
						}
					],
					token: Mock.Random.guid(),
					message: '获取成功'
				}

			}
		} else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
			return {
				code: 20000,
				data: {
					menu: [{
							path: '/Home',
							name: 'Home',
							label: '首页',
							icon: 's-home',
							url: 'Home.vue'
						},
						{
							path: '/video',
							name: 'video',
							label: '商品管理',
							icon: 'video-play',
							url: 'Mall.vue'
						}
					],
					token: Mock.Random.guid(),
					message: '获取成功'
				}
			}
		}else{
			return {
				code:-999,
				data:{
					message:'密码错误'
				}
			}
		}
	}
}
