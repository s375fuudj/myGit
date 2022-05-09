//引入Cookie
import Cookie from 'js-cookie'
const state = {
	isCollapse: false,
	tabsList: [{
		path: '/',
		name: 'Home',
		label: '首页',
		icon: 'home',

	}],
	menu: []
}
const mutations = {
	SETISCOLLAPSE(state) {
		state.isCollapse = !state.isCollapse;
	},
	
	SELECTMENU(state, val) {
		//item.name === val.name 如果true则返回位置,false返回-1
		const result = state.tabsList.findIndex(item => item.name === val.name)
		//若无重复信息,则加入
		if (result === -1) {
			state.tabsList.push(val)
		}
	},
	SETTABSLIST(state, val) {
		//删除点击的tag
		const result = state.tabsList.findIndex(item => item.name === val.name)
		state.tabsList.splice(result, 1)
	},
	
	setMenu(state, val) {
		state.menu = val
		Cookie.set('menu', JSON.stringify(val))
	},
	clearMenu(state) {
		state.menu = []
		Cookie.remove('menu')
	},
	addMenu(state, router) {
		//如果没有路由的cookie值,不执行
		if (!Cookie.get('menu')) {
			return
		}
		const menu = JSON.parse(Cookie.get('menu'))
		//vuex中记录cookie存储的路由值
		state.menu = menu
		const menuArray = []
		menu.forEach(item => {
			//如果有children 记录跳转的路由
			if (item.children) {
				item.children = item.children.map(item => {
					item.component = () => import(`../../views/${item.url}`)
					return item
				})
				menuArray.push(...item.children)
			//反之直接记录跳转的路由
			}else{
				item.component = ()=> import(`../../views/${item.url}`)
				menuArray.push(item)	
			}
		})
		//路由的动态添加
		menuArray.forEach(item => {
			router.addRoute('Main',item)
		})
	}
}
const actions = {
	selectMenu({
		state,
		commit
	}, val) {
		//若非Home组件,则存储val信息
		if (val.name != 'Home') {
			commit('SELECTMENU', val)
		} else {
			state.currentMenu = null
		}
	}
}
export default {
	state,
	mutations,
	actions
}
