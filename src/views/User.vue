<template>
	<div class="manage">
		<!-- 需要设置visible属性，它接收Boolean，当为true时显示 Dialog。
		Dialog 分为两个部分：body和footer，footer需要具名为footer的slot。
		title属性用于定义标题，它是可选的，默认值为空
		 .sync 与子组件相互绑定-->
		<el-dialog :title="operateType==='add'?'新增用户':'更新用户'" :visible.sync="isShow" width="50%"
			style="text-align: left;">
			<cForm :formLabel='operateFormLabel' :form="operateForm" :inline='true' ref="form">
			</cForm>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确认</el-button>
			</div>
		</el-dialog>

		<div class="manage-header">
			<!-- primary 加载框 -->
			<el-button type="primary" @click="addUser">+新增</el-button>
			<!-- 密码框 文本值为空 -->
			<cForm :formLabel='formLabel' :form="searchForm" :inline='true' ref="form">
				<el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
			</cForm>
		</div>
		<cTable :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList" @edit="editUser"
			@del="delUser">

		</cTable>
	</div>
</template>

<script>
	import cForm from '../components/From.vue'
	import cTable from '../components/Table.vue'
	import {
		getUser
	} from '../api/data.js'
	export default {
		name: "User",
		components: {
			cForm,
			cTable
		},
		data() {
			return {
				operateType: "add",
				isShow: false,
				operateFormLabel: [{
						model: "name",
						label: "姓名",
						type: "input"
					},
					{
						model: "age",
						label: "年龄",
						type: 'input',
					},
					{
						model: "sex",
						label: "性别",
						type: "select",
						opts: [{
								label: "男",
								value: 1
							},
							{
								label: "女",
								value: 0
							}
						]
					},
					{
						model: "birth",
						label: "出生日期",
						type: "date",
					},
					{
						model: "addr",
						label: "地址",
						type: "input",
					},
				],
				operateForm: {
					name: '',
					addr: '',
					age: '',
					birth: '',
					sex: ''
				},


				formLabel: [{
					model: 'keyword',
					label: '',
					type: 'input'
				}],
				searchForm: {
					keyword: ''
				},


				tableData: [],
				tableLabel: [{
						prop: 'name',
						label: "姓名",

					},
					{
						prop: 'age',
						label: "年龄",

					},
					{
						prop: 'sexLabel',
						label: "性别",

					},
					{
						prop: 'birth',
						label: "出生日期",
						width: 200
					},
					{
						prop: 'addr',
						label: "地址",
						width: 320
					},
				],
				config: {
					page: 1,
					total: 200,
					loading: false
				}
			}

		},
		methods: {
			confirm() {
				//发送请求 执行后隐藏
				if (this.operateType === 'adit') {
					//编辑
					this.$http.post('/user/edit', this.operateForm).then(res => {
						this.isShow = false
						this.getList()
					})
				} else {
					//添加
					this.$http.post('/user/add', this.operateForm).then(res => {
						this.isShow = false
						this.getList()
					})
				}
			},
			addUser() {
				this.isShow = true;
				this.operateType = "add";
				this.operateForm = {}
			},
			getList(name = "") {
				console.log(name)
				this.config.loading = true
				// name ? (this.config.page = 1) : '';
				if (name) {
					this.config.page = 1
				} else {
					name = ""
				}
				getUser({
					page: this.config.page,
					name
				}).then(({
					data: res
				}) => {
					this.tableData = res.list.map(item => {
						item.sexLabel = item.sex == 0 ? "女" : "男"
						return item
					})
					this.config.total = res.count
					this.config.loading = false
				})
			},

			delUser(row) {
				this.$confirm("此操作将永久删除该组件,是否继续?", "提示", {
					confirmButtonText: '确认',
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					const id = row.id
					this.$http.post("user/del", {
						id
					}).then(({data:res}) => {
						this.$message({
							type: 'success',
							message: res.message
						})
						this.getList()
					})
				})
			},
			editUser(row) {
				this.operateType = "edit"
				this.isShow = true
				// this.operateForm = JSON.parse(JSON.stringify(row)) 深拷贝
				// this.operateForm = Object.assign({},row) 浅拷贝
				this.operateForm = Object.assign({}, row)
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style lang="less" scoped>
	.manage {
		margin-top: 20px;

		.manage-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
		}
	}
</style>
