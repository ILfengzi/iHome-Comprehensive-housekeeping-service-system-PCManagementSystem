<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-25 16:18:16
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-30 14:48:56
 -->
<template>
	<el-select :clearable="true" v-model="weixinId" remote filterable :remote-method="remoteMethod">
		<el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
	</el-select>
</template>

<script>
	export default {
		name: "WeixinSelect",
		props:{
			prop:{
				type:String
			},
			value:{
				type:Number
			}
		},
		data() {
			return {
				options: [],
				weixinId: null,
			}
		},
		methods: {
			getValue(){
				return this.value
			},
			remoteMethod(query) {
				setTimeout(_=>{
					if (query != "") {
						this.axios.get("/json/other/getWeixinIdFromUserPhone/" + query).then((res) => {
							if (res.data.code == 200) {
								if (res.data.data.length > 0) {
									this.options = res.data.data
								} else {
									this.$message({
										type: "warning",
										message: "没有获取到数据"
									})
								}
							} else {
								this.$message({
									type: "error",
									message: "获取微信id失败"
								})
							}
						})
					
					}
				},200)
				
			},
			
		},
		watch: {
			value(val){
				this.weixinId = val;
			},
			weixinId(val){
				this.$emit('input',val);
			},
		}
	}
</script>

<style>
</style>
