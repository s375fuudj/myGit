<template>
	<!-- 设置 inline 属性可以让表单域变为行内的表单域 -->
	<el-form ref="form" :model="form" label-width="80px" :inline="inline">
		<!-- label 标签文本 -->
		<el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
			<el-input v-if="item.type==='input'" v-model="form[item.model]" :placeholder="'请输入'+item.label"></el-input>
			<el-switch v-if="item.type==='switch'" v-model="form[item.model]">
			</el-switch>
			<el-date-picker v-if="item.type==='date'" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
			v-model="form[item.model]">
			</el-date-picker>
			<el-select v-if="item.type==='select'" placeholder="请选择" v-model="form[item.model]">
				<el-option v-for="(optsItem,optsIndex) in item.opts" :key="optsItem.value" 
				:label="optsItem.label" :value="optsItem.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<slot></slot>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'From',
		props: {
			//from配置
			formLabel: Array,
			//from数据
			form: Object,
			//表单的布局
			inline: Boolean
		},
		methods: {

		}
	}
</script>

<style>
</style>
