import Vue from 'vue'
import Vuex from 'vuex'
import NavMenv from './NavMenv/index.js'
import User from './User/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		NavMenv,User
	}
})
