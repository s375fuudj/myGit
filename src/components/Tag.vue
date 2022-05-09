<template>
	<div>
		<el-tag v-for="(tag,index) in tags" :key="tag.name" :type="tag.type"
			:closable="tag.name!='Home'" size='small'
			:effect="$route.name==tag.name?'dark':'plain'" 
			@click="changeMenu(tag)" @close='shutTag(tag,index)'>
			{{tag.label}}
		</el-tag>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'Tag',
		data() {
			return {

			};
		},
		computed: {
			...mapState({
				tags: state => state.NavMenv.tabsList
			})
		},
		methods: {
			changeMenu(tag) {
				this.$router.push({
					name: tag.name
				})
			},
			shutTag(tag, index) {
				
				const length = this.tags.length-1
				if(tag.name==this.$route.name){
					if(length==index){
						this.$router.push({
							name:this.tags[index-1].name
						})
					}else{
						this.$router.push({
							name:this.tags[index+1].name
						})
					}
					
				}
				//删除点击的tag
				this.$store.commit('SETTABSLIST', tag)
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-tag {
		cursor: pointer;
		margin-right: 20px;
	}
</style>
