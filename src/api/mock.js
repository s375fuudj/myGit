import Mock from "mockjs"
import homeApi from './mockServeData/home'
import userApi from "./mockServeData/User.js"
import permission from "./mockServeData/permission.js"

Mock.mock('/home/getData',homeApi.getStatisticalData)
//拦截user/add
Mock.mock(/user\/add/,'post',userApi.createUser)
//拦截user/edit
Mock.mock(/user\/edit/,'post',userApi.updateUser)


Mock.mock('/home/getUser','get',userApi.getUserList)

Mock.mock(/user\/del/,'post',userApi.deleteUser)

Mock.mock("/permission/getMenu",'post',permission.getMenu)