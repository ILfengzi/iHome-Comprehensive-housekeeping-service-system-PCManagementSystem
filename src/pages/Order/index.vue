<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:36:44
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-28 09:01:40
 -->
<template>
	<div>
		<el-select :clearable="true" v-model="searchCondition.status">
			<el-option  v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
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
	import option from '@/js/option.js'
export default {
	data() {
		return {
			statusOption: option.OrderstatusOption,
			searchCondition:{
				status:0,
			},
			tableData: []
		}
	},
	mounted:function(){
		
	},
	methods: {
		name() {
			
		}
	},
}
</script>

<style>
</style>
