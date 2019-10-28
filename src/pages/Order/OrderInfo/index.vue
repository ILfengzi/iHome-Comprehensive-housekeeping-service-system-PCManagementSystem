<template>
  <div>
    <el-collapse @change="collapseChange" v-model="current" accordion>
      <el-collapse-item name="orderDetails" title="订单详细">
				<div v-if="orderInfo.orderDetails.data != null">
					用户名：{{orderInfo.orderDetails.data.usernaem}}<br />
					省：{{orderInfo.orderDetails.data.province}}  市：{{orderInfo.orderDetails.data.city}}<br />
					详细：{{orderInfo.orderDetails.data.detail}}<br />
					手机号：{{orderInfo.orderDetails.data.phone}}<br />
					状态：{{orderInfo.orderDetails.data.status}}<br />
				</div>
			</el-collapse-item>
      <el-collapse-item name="orderToolRecords" title="订单工具记录">
				<div v-if="orderInfo.orderToolRecords.data != null" v-for="item in orderInfo.orderToolRecords.data" :key="item.id">
					编号：{{item.id}}<br />
					员工编号：{{item.staff_id}}  员工名称：{{item.staff.name}}<br />
					工具编号：{{item.iTool.id}}  工具名称：{{item.iTool.tname}}<br />
					数量: {{item.count}}<br />
					状态：{{item.state}}<br />
				</div>
			</el-collapse-item>
      <el-collapse-item name="orderStaffs" title="订单分配员工">
				<div v-if="orderInfo.orderStaffs.data != null" :key="item.id" v-for="item in orderInfo.orderStaffs.data">
					员工编号：{{item.staffs.id}}<br />
					员工名称：{{item.staffs.name}}<br />
					手机号：{{item.staffs.phone}}<br />
				</div>
			</el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
	name:"OrderInfo",
	mounted: function(){
		this.orderInfo.orderDetails.id = this.$route.query.useraddressId
		this.orderInfo.orderToolRecords.id = this.$route.query.id
		this.orderInfo.orderStaffs.id = this.$route.query.id
	},
  data() {
  	return {
			current:0,
			orderInfo:{
				orderDetails:{
					url:"/json/user/getOrderDetail/",
					data: null,
					id:0,
				},
				orderToolRecords:{
					url:"/json/tool/getToolRecordsByOrderId/",
					data: null,
					id:0,
				},
				orderStaffs:{
					url:"/json/order/getOrderStaffs/",
					data: null,
					id:0,
				},
			},
  	}
  },methods: {
  	collapseChange(name) {
			console.log(name)
			if(this.orderInfo[name].data == null){
				this.axios.get(this.orderInfo[name].url + this.orderInfo[name].id).then((res) =>{
					console.log(res)
					this.orderInfo[name].data = res.data.data
				})
			}
  	}
  },
}
</script>