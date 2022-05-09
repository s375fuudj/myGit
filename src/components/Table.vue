<template>
	<div class="common-table">
		<!-- stripe 是否为斑马纹  show-overflow-tooltip 当内容过长被隐藏时显示 tooltip-->
		<el-table :data="tableData" style="width: 100%" stripe>

			<el-table-column show-overflow-tooltip v-for="item in tableLabel" 
			:key="item.prop" :label="item.label"
			:width="item.width?item.width:125">

				<template slot-scope="scope">
					<span style="margin-left: 10px;">{{scope.row[item.prop]}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="180">
				<template slot-scope="scope">
					<el-button size="mini" 
					@click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- :current-page.sync当前页数  current-change当前页变动时候触发的事件-->
		<el-pagination layout="prev, pager, next" :total="config.total" 
			:current-page.sync="config.page" background :loading="config.loading"
			@current-change="changePage" :page-size="20">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'From',
		props: {
			tableData: Array,
			tableLabel: Array,
			config: Object,

		},
		methods: {
			handleEdit(row) {
				this.$emit('edit', row)
			},
			handleDelete(row) {
				console.log(row)
				this.$emit('del', row)
			},
			//获取点击页数
			changePage() {
				this.$emit('changePage')
				
			}

		}
	}
</script>

<style lang="less" scoped>
	.common-table {
		height: calc(100%-62px);
		background-color: #fff;
		position: relative;


	}
</style>
