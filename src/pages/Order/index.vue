<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:36:44
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-28 09:01:40
 -->
<template>
	<div>
		<el-form :model="searchCondition">
			<el-form-item prop="status" label="订单状态">
				<el-select :clearable="true" v-model="searchCondition.status">
					<el-option  v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
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
			<el-table-column label="操作" >
				<template slot-scope="scope">
					<el-button @click="getMoreInfo(scope.row)">获取详细信息</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row type="flex" justify="center">
			<el-pagination layout="prev, pager, next"  @current-change="pageChange" :page-size="page.pageSize" :current-page="page.pageNum"  :total="page.total">
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
			tableData: [],
			getDataMethod:null,
			page:{
				pageSize:10,
				pageNum:1,
				total:0,
			},
		}
	},
	mounted:function(){
		this.getDataMethod = this.getData(2,{})
		this.getDataMethod(1)
	},
	methods: {
		getData(pageSize, object) {
			object.pageSize = pageSize
			return (pageNum) =>{
				object.pageNum = pageNum
				this.axios.post("/json/order/getOrderDataByCondition", object).then((res)=>{
					if(res.data.code == 200){
						this.tableData = res.data.data.list
						this.page = res.data.data.page
					}else {
						this.$message({
							message: 'warning',
							type: '获取数据失败'
						});
					}
				}).catch( _ =>{
					this.$message({
						message: 'error',
						type: '网络连接出错'
					});
				})

			}
				
		},
		pageChange(val){
			this.getDataMethod(val)
		},
		search(pageSize){
			var object = new Object()
			this.searchCondition = this.getData(pageSize, object)
			this.searchCondition(1)
		},
		getMoreInfo(val){
			this.$router.push({path:"/order/orderInfo", query:{id:val.id, useraddressId:val.useraddressId}})
		}
	},
}
</script>

<style>
</style>
