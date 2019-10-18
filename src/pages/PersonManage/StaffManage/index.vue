<template>
	<div>
		<el-table style="width: 100%;" :data="tableData">
			<el-table-column prop="id" label="编号" width="100">
				
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100">
				
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
				
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="100">
				
			</el-table-column>
			<el-table-column prop="detailtype_id" label="服务类型" width="100">
				
			</el-table-column>
			<el-table-column prop="status" label="状态" width="100">
				
			</el-table-column>
		</el-table>
		<el-row type="flex" justify="center">
			<el-pagination layout="prev, pager, next"  :total="50">
				
			</el-pagination>
		</el-row>
		<el-button @click="showDialog">添加</el-button>
		<StaffDialog ref="dialog" />
	</div>
</template>

<script>
import StaffDialog from "./components/StaffDialog"
export default {
	mounted:function(){
		// this.axios.get("/json/staff/getAllStaffs").then((res)=>{
		// 	if (res.data.code = 200){
		// 		this.tableData = res.data.data
		// 	}
			
		// })
	},
	components: {
		StaffDialog
	},
	data() {
		return {
			tableData: [
	{
		"id" : 1,
		"name" : "你麻麻",
		"sex" : 0,
		"phone" : "12569874521",
		"detailtype_id" : 2,
		"wechat_id" : 2,
		"qualification" : "没有",
		"health" : "没有",
		"id_card" : "654634549",
		"status" : 3
	},
	{
		"id" : 2,
		"name" : "王二",
		"sex" : 1,
		"phone" : "3131313123",
		"detailtype_id" : 3,
		"wechat_id" : 3,
		"qualification" : "没有",
		"health" : "没有",
		"id_card" : "654631234549",
		"status" : 3
	},
	
]
		}
	},
	methods: {
		showDialog() {
			this.$refs.dialog.show()
		}
	},
}
</script>

<style>
</style>
