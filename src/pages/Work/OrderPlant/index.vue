<template>
	<div>
		<el-table :data="tableDate">
			<el-table-column prop="id" label="编号"></el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-button @click="plant(scope.row)">分配员工</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :total="total"></el-pagination>
	</div>
</template>
<script>
export default{
	name:"workOrderPlant",
	mounted:function(){
		this.axios.post("/json/order/getOrderByStatus",{pageSize:10,pageNum:1,status:0}).then((res)=>{
			if(res.data.code == 200){
				console.log(res.data)
				this.tableDate = res.data.data.list
				this.total = res.data.data.total
			}
		})
	},
	data() {
		return {
			tableDate: [],
			total:0,
		}
	},
	methods: {
		plant(order) {
			var query = {startTime:order.startTime,serviceId:order.detailtype.servicetpyeId, orderId: order.id}
			this.$router.push({path:'/work/staffplant', query: query})
		}
	},
}
</script>

<style>
</style>
