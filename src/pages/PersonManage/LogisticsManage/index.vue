<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-16 09:19:30
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-28 08:56:49
 -->
<template>
	<div>
		<el-table style="width: 100%;" :data="tableData">
			<el-table-column prop="id" label="编号" width="100">
				
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100">
				
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="100">
				
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
				
			</el-table-column>
			<el-table-column prop="position" label="职业" width="100">
				
			</el-table-column>
		</el-table>
		<el-row type="flex" justify="center">
			<el-pagination layout="prev, pager, next"  :total="50">
				
			</el-pagination>
		</el-row>
	</div>

</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			getDataMethod:null,
			form:{

			},
		}
	},methods: {
		changePage(val){
			this,getDataMethod(0)
		},
		search(pageSize){
			var object = new Object()
			this.getDataMethod = this.getData(pageSize, object)
			this.getDataMethod(1)
		},
		getData(pageSize, object){
				return () => {
					this.axios.post("",object).then((res) => {
						if(res.data.code == 200){
							this.tableData = res.data.data.data
							this.page = res.data.data.page
						}else{
							this.$message({
								message: 'error',
								type: '获取数据失败'
							});
						}
					}).catch((error) => {
						this.$message({
							message: 'error',
							type: '网络错误'
						});
					})
				}
		}
	},
}
</script>

<style>
</style>
