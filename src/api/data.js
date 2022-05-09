import axios from "./axios.js"
export const getMenu = (param)=>{
	return axios.request({
		url:"/permission/getMenu",
		method:'post',
		data:param
	})
}
export const getData = ()=>{
	return axios.request({
		url:'/home/getData'
	})
}

export const getUser = (param)=>{
	return axios.request({
		url:'/home/getUser',
		method:'get',
		data:param
	})
}
