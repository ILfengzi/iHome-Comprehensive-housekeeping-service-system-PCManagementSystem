<template>
	<div>
		<el-button @click="showDialog">添加员工</el-button>
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
			<el-table-column label="操作">
				<template slot-scope="scope">
					<div v-if="scope.row.status == 3">
						该数据已删除
					</div>
					<div v-else>
						<el-button @click="deleteStaff(scope.row)">删除</el-button>
						<el-button @click="updateStaff(scope.row)">修改</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>

		<el-row type="flex" justify="center">
			<el-pagination @current-change="pageChange" :page-size="page.pageSize" :current-page="page.pageNum" layout="prev, pager, next"
			 :total="page.total">

			</el-pagination>
		</el-row>
		<StaffDialog ref="dialog" />
	</div>
</template>

<script>
	import StaffDialog from "./components/StaffDialog"
	export default {
		mounted: function() {
			this.getData();
		},
		components: {
			StaffDialog
		},
		data() {
			return {
				deleteVisible: false,
				tableData: [],
				postData: {
					pageSize: 2,
					pageNum: 1
				},
				page:{
					total: 0,
					pageSize: 2,
					pageNum: 1,
				},
			}
		},
		methods: {
			showDialog() {
				this.$refs.dialog.show()
			},
			getData() {
				this.axios.post("/json/staff/getAllStaffs", this.postData).then((res) => {
					if (res.data.code = 200) {
						this.tableData = res.data.data.staffs
						let page = res.data.data
						this.page.pageSize = page.pageSize
						this.page.pageNum = page.pageNum
						this.page.total = page.total
					}

				})
			},
			pageChange(val) {
				this.postData.pageNum = val
				this.getData()
			},
			updateStaff(val) {
				this.$refs.dialog.changeStaff(val)
			},
			deleteStaff(val) {
				this.$confirm('确定要删除该员工吗？', '提示',{
					confirmButtonText: "确定",
					cancelButtonText:"取消",
					type: 'warning'
				}).then(() => {
					this.axios.post("/json/staff/deleteStaff", {
						"id": val.id
					}).then((res) => {
						console.log(res.data)
						if(res.data.code == 200){
							val.status = 3
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
							
						}else{
							this.$message({
								type:"error",
								message: "删除失败"
							})
						}
					})
					
				}).catch(()=>{
					this.$message({
						type: "info",
						message: '已取消删除'
					})
				})
				
			}
		},
	}
</script>

<style>
</style>
