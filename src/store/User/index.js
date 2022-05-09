//引入Cookie
import Cookie from 'js-cookie'
const state={
	token:""
}
const mutations={
	setToken(state,val){
		state.token = val
		Cookie.set('token',val)
	},
	clearToken(state){
		state.token = ""
		Cookie.remove('token')
	},
	getToken(state){
		state.token=state.token||Cookie.get('token')
	}
}
const actions={
	
}
export default{
	state,
	mutations,
	actions
}
