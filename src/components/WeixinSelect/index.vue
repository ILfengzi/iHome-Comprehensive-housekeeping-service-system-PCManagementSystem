<template>
	<el-select :clearable="true" v-model="value" remote filterable :remote-method="remoteMethod" :loading="loading">
		<el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
	</el-select>
</template>

<script>
	export default {
		name: "WeixinSelect",
		data() {
			return {
				options: [],
				value: null,
				loading: false,
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
				
			}
		},
	}
</script>

<style>
</style>
