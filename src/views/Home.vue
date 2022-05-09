<template>
	<div>
		<el-row :getter="20" style="margin-top: 30px;">
			<el-col :span="8">
				<el-card shadow="hover">
					<div class="user">
						<img :src="userImg" />
						<div class="userInfo">
							<p class="name">Admin</p>
							<p class="permissions">
								<span>超级管理员</span>
							</p>
						</div>
					</div>
					<div class="LoginInfo">
						<p>上次登录时间:<span>2021-7-9</span></p>
						<p>上次登录地点:<span>武汉</span></p>
					</div>
				</el-card>
				<el-card shadow="hover" style="margin-top: 20px;height: 400px;">
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column :prop="index" :label="item" v-for="(item,index) in tableLabel" :key="index">
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="16">
				<div class="num">
					<el-card shadow="hover" v-for="(item,index) in OuntDate" :key="index"
						:body-style="{display:'flex',padding:0}">
						<i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
						<div class="detail">
							<p class="val">￥{{item.value}}</p>
							<p class="txt">￥{{item.name}}</p>
						</div>
					</el-card>
				</div>
				<el-card style="height: 280px ;width: 872.125px;">
					<div style="height: 240px;" ref="echarts"></div>
				</el-card>
				<div class="graph">
					<el-card>
						<div style="height: 240px;" ref="echarts1"></div>
					</el-card>
					<el-card>
						<div id="echarts2" style="height: 240px;" ref="echarts2"></div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
	import * as echarts from 'echarts/core';
	// 引入柱状图图表，图表后缀都为 Chart
	import {
		BarChart,
		LineChart,
		PieChart
	} from 'echarts/charts';
	// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
	import {
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LegendComponent
	} from 'echarts/components';
	// 标签自动布局，全局过渡动画等特性
	import {
		LabelLayout,
		UniversalTransition
	} from 'echarts/features';
	// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
	import {
		CanvasRenderer
	} from 'echarts/renderers';

	// 注册必须的组件
	echarts.use([
		LegendComponent,
		TitleComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		BarChart,
		LineChart,
		PieChart,
		LabelLayout,
		UniversalTransition,
		CanvasRenderer
	]);
	import {
		getData
	} from "../api/data.js"
	export default {
		name: "Home",
		data() {
			return {
				userImg: require("../assets/toux.png"),
				tableData: [{
						name: 'oppo',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					},
					{
						name: 'vivo',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					},
					{
						name: '苹果',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					},
					{
						name: '小米',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					},
					{
						name: 'oppo',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					},
					{
						name: '三星',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					},
					{
						name: '魅族',
						todayBuy: 100,
						monthBuy: 300,
						totalBuy: 800
					}
				],
				tableLabel: {
					name: '手机',
					todayBuy: "今日消费",
					monthBuy: "本月消费",
					totalBuy: "总消费"
				},
				OuntDate: [{
						name: "今日支付订单",
						value: 1234,
						icon: "success",
						color: "#2ec7c9"
					},
					{
						name: "今日收藏订单",
						value: 210,
						icon: "star-on",
						color: "#ffb980"
					},
					{
						name: "今日未支付订单",
						value: 1234,
						icon: "s-goods",
						color: "#5ab1ef"
					},
					{
						name: "今日支付订单",
						value: 1234,
						icon: "success",
						color: "#2ec7c9"
					},
					{
						name: "今日收藏订单",
						value: 210,
						icon: "star-on",
						color: "#ffb980"
					},
					{
						name: "今日未支付订单",
						value: 1234,
						icon: "s-goods",
						color: "#5ab1ef"
					}
				],
			}
		},
		mounted() {
			getData().then(res => {
				const {
					code,
					data
				} = res.data
				if (code == 20000) {
					console.log(data)
					this.tableData = data.tableData
					const order = data.orderData
					//返回对象的key的数组 ['苹果', 'vivo', 'oppo', '魅族', '三星', '小米']
					const keyArray = Object.keys(order.data[0])
					const series = []
					//key:'苹果', 'vivo', 'oppo', '魅族', '三星', '小米'
					keyArray.forEach(key => {
						series.push({
							name: key,
							//item:mock的模拟值
							data: order.data.map(item => item[key]),
							//折线图
							type: 'line'
						})
					})
					const option = {
						xAxis: {
							type: 'category',
							data: order.date
						},
						yAxis: {
							type: 'value'
						},
						legend: {
							data: keyArray
						},
						series
					};
					const e = echarts.init(this.$refs.echarts);
					e.setOption(option);


					const user_data = data.userData.map(item => {
						return item.date
					})
					const user_new = data.userData.map(item => {
						return item.new
					})
					const user_active = data.userData.map(item => {
						return item.active
					})
					const option1 = {
						xAxis: {
							data: user_data
						},
						yAxis: {},
						series: [{
								type: 'bar',
								data: user_new,
								itemStyle: {
									color: '#91cc75',
								}
							},
							{
								type: 'bar',
								data: user_active,
								itemStyle: {
									color: '#aa55ff',
								}
							}
						]
					};
					const e1 = echarts.init(this.$refs.echarts1);
					e1.setOption(option1);

					const videoData = data.videoData
					const option2 = {
						series: [{
							type: 'pie',
							data: videoData
						}]
					};
					const e2 = echarts.init(this.$refs.echarts2);
					e2.setOption(option2);
				}

			})
		},

	}
</script>

<style lang="less" scoped>
	.user {
		display: flex;
		padding-bottom: 20px;

		.userInfo {

			margin-left: 20px;
			margin-right: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;

			p {
				text-align: left;
			}

			.name {
				font-weight: 700;
				font-size: 25px;
			}

			.permissions {
				font-weight: 100;
				font-size: 3px;
			}
		}

		img {
			height: 120px;
			border-radius: 50%;
		}
	}

	.LoginInfo {
		padding-top: 20px;
		border-top: 1px solid gray;

		p {
			line-height: 30px;
			text-align: left;

			span {
				margin-left: 90px;
			}
		}
	}

	.num {
		box-sizing: border-box;
		width: 872.125px;

		.el-card {
			float: left;
			width: 17.625rem;
			margin-bottom: 0.625rem;

			i {
				width: 1.35rem;
				padding: 1.5625rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.detail {
				display: flex;
				justify-content: center;
				align-items: flex-start;
				flex-direction: column;
				margin-left: 0.3125rem;

				.val {
					font-size: 1.625rem;
					font-weight: 700;
				}

				.txt {
					font-size: 0.625rem;
					font-weight: 400;
				}
			}

		}

		&::after {
			content: "";
			display: block;
			clear: both;
		}

		.el-card:not(.el-card:nth-child(3n)) {
			margin-right: 0.625rem;
		}
	}

	.graph {
		width: 872.125px;
		margin-top: 10px;
		display: flex;
		justify-content: space-between;

		.el-card {
			height: 235px;
			width: 420px;
		}

		#echarts2 {
			position: relative;
			top: -20px;
			left: 0px;
		}
	}
</style>
