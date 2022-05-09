import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//animate动画
import animate from 'animate.css';
Vue.use(animate)

//引入axios
import axios from 'axios'

import "./api/mock.js"
//element-ui 组件注册位置
import {
	Container,
	Aside,
	Header,
	Main,
	RadioGroup,
	RadioButton,
	Menu,
	Submenu,
	MenuItemGroup,
	MenuItem,
	Button,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Card,
	Row,
	Col,
	Table,
	TableColumn,
	Breadcrumb,
	BreadcrumbItem,
	Tag,
	Form,
	FormItem,
	Input,
	Select,
	Switch,
	DatePicker,
	Option,
	Dialog,
	Pagination,
	Message,
	MessageBox
} from 'element-ui';
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)



Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

router.beforeEach((to, from, next) => {
	store.commit("getToken")
	const token = store.state.User.token
	//如果前往页面不是Login且token不存在
	if (to.name !== 'Login' && !token) {
		next({
			name: 'Login'
		})
	//如果前往页面是Login且token存在
	} else if (to.name == 'Login' && token) {
		next({
			name: 'Home'
		})
	} else {
		next()
	}
})

new Vue({
	router,
	store,
	render: h => h(App),
	created() {
		store.commit('addMenu', router)
	}
}).$mount('#app')
