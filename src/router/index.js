import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
Vue.use(VueRouter)


const routes = [{
		path: '/',
		name: 'Main',
		component: Main,
		redirect:"/Home",
		children: []
	},
	{
		path: '/Login',
		name: 'Login',
		component: ()=>import('../views/Login.vue'),
	}

	/* {
	  path: '/about',
	  name: 'About',
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: () => import('../views/About.vue')
	} */
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

//解决重复点击路由的报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to){
	return VueRouterPush.call(this,to).catch(err=>err)
}

export default router
