<template>
	<div>
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column prop="id" label="编号" width="100">
				
			</el-table-column>
			<el-table-column prop="user_id" label="用户编号" width="100">
				
			</el-table-column>
			<el-table-column prop="useraddress_id" label="地址编号" width="100">
				
			</el-table-column>
			<el-table-column prop="detailtype_id" label="详细服务编号" width="100">
				
			</el-table-column>
			<el-table-column prop="price" label="价格" width="100">
				
			</el-table-column>
			<el-table-column prop="order_time" label="下单时间" width="100">
				
			</el-table-column>
			<el-table-column prop="start_time" label="服务开始时间" width="100">
				
			</el-table-column>
			<el-table-column prop="finaly_timer" label="服务结束时间" width="100">
				
			</el-table-column>
			<el-table-column prop="state" label="状态" width="100">
				
			</el-table-column>
			<el-table-column prop="comm" label="注释" >
				
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
			tableData: [{
				"id":3,
				"user_id":1,
				"useraddress_id":1,
				"detailtype_id":1,
				"price":100,
				"order_time":'2019-10-20 14:22:45',
				"start_time":'2019-10-20 14:22:45',
				"finaly_timer":'2019-10-20 16:32:39',
				"state":4,
				"comm":'asddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'  + 
				'asdaddddddddasddddddddddddddddddddddddddddddddddddd'
			},{
				"id":4,
				"user_id":1,
				"useraddress_id":1,
				"detailtype_id":1,
				"price":100,
				"order_time":'2019-10-20 14:22:45',
				"start_time":'2019-10-20 14:22:45',
				"finaly_timer":'2019-10-20 16:32:39',
				"state":4,
				"comm":'string'
			},

			]
		}
	},
}
</script>

<style>
</style>
