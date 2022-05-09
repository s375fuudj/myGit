import Mock from "mockjs"

//传入一个url字符串,如果其中有?,则返回一个空对象
//如果没有?{"将其解码后"替换为\",将&替换为",",将=替换为":" "}转为JavaScript对象
function param2Obj(url) {
	//split(s,h) 方法用于把一个字符串分割成字符串数组。
	//s 字符串或正则表达式，从该参数指定的地方分割 stringObject。
	//h 返回的数组的最大长度
	const search = url.split("?")[1];
	if (!search) {
		return {}
	}
	//JSON.parse json数据转为JavaScript
	return JSON.parse(
		'{"' +
		//decodeURIComponent 对encodeURIComponent() 函数编码的 URI 进行解码。
		decodeURIComponent(search)
		//将"替换为\"
		.replace(/"/g, '\\"')
		//将&替换为","
		.replace(/&/g, '","')
		//将=替换为":"
		.replace(/=/g, '":"') +
		'"}'
	)
}

let List = []
const count = 200

//在List里添加200条模拟数据
for (let i = 0; i < count; i++) {
	List.push(
		Mock.mock({
			//模拟id值
			id: Mock.Random.guid(),
			//模拟name值
			name: Mock.Random.cname(),
			//模拟地区值 "广西壮族自治区 贺州市 钟山县"
			addr: Mock.mock('@county(true)'),
			//18-60 之间的值
			'age|18-60': 1,
			//模拟日期 "1980-09-10"
			birth: Mock.Random.date(),
			//模拟 0-1直接的值
			sex: Mock.Random.integer(0, 1)
		})
	)
}
export default {
	getUserList: config => {
		const {
			name="",
			page = 1,
			limit = 20
		} = JSON.parse(config.body)
		//param2Obj(config.url)
		console.log(config)
		console.log('name:' + name, 'page:' + page, '分页大小limit' + limit)
		//filter某些元素过滤掉，然后返回剩下的元素
		//map返回处理后的元素数组
		const mockList = List.filter(user => {
			//name不为空,且List模拟值中没有name,且模拟地址中没有name 不保留
			//反之 保留
			if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) {
				return false
			}
			return true
		});
		//页面数*分页数量>index&&页面数*(分页数量-1)<=index
		const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
		return {
			code: 20000,
			count: mockList.length,
			list: pageList
		}

	},
	//添加
	createUser: config => {
		const {
			name,
			addr,
			age,
			birth,
			sex
		} = JSON.parse(config.body)
		console.log(JSON.parse(config.body))
		List.unshift({
			id: Mock.Random.guid(),
			name: name,
			addr: addr,
			age: age,
			birth: birth,
			sex: sex
		})
		return {
			code: 20000,
			data: {
				message: '添加成功'
			}
		}
	},
	//删除
	deleteUser: config => {
		const {
			id
		} = JSON.parse(config.body)
		console.log(JSON.parse(config.body))
		if (!id) {
			return {
				code: -999,
				message: '参数不正确'
			}
		} else {
			List = List.filter(u => u.id !== id)
			return {
				code: 20000,
				message: '删除成功'
			}
		}
	},
	//批量删除
	// batchremove: config => {
	// 	let {
	// 		ids
	// 	} = param2Obj(config.url)
	// 	ids = ids.split(',')
	// 	List = List.filter(u => !ids.includes(u.id))
	// 	return {
	// 		code: 20000,
	// 		data: {
	// 			message: '批量删除成功'
	// 		}
	// 	}
	// },
	updateUser: config => {
		const {
			id,
			name,
			addr,
			age,
			birth,
			sex
		} = JSON.parse(config.body)
		const sex_num = parseInt(sex)
		List.some(u => {
			if (u.id === id) {
				u.name = name,
					u.addr = addr,
					u.age = age,
					u.birth = birth,
					u.sex = sex_num
				return true
			}
		})
		return {
			code: 20000,
			data: {
				message: '编辑成功'
			}
		}
	},
}
