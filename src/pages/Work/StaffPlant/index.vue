<template>
	<div>
		<el-transfer v-model="result" :data="data" :titles="['空闲员工','分配的员工']">

		</el-transfer>
		<el-button @click="getMore" :disabled="disabledForGetMore">获取更多员工</el-button>
		<el-button @click="submit" >提交</el-button>
	</div>
</template>

<script>
	export default {
		name: "StaffPlant",
		mounted: function() {
			this.object.serviceId = this.$route.query.serviceId
			this.orderId = this.$route.query.orderId
			this.object.startTime = this.$route.query.startTime
			this.getStaffs()
		},
		data() {
			return {
				object: {
					"index": 1,
					"pageNum": 1,
					"pageSize": 1,
					"serviceId": 1,
				},
				disabledForGetMore:false,
				result: [],
				orderId:null,
				data: [],
			}
		},
		methods: {
			submit() {
				if(this.orderId != null){
					this.axios.post("/json/order/plantOtherStaffs",{orderId:this.orderId, staffIds:this.result}).then((res)=>{
						if (res.data.code == 200){
							this.$router.push("../")
						}
					})
				}
				console.log(this.result)
			},
			getMore(){
				this.object.pageNum +=1
				this.getStaffs()
			},
			getStaffs(){
				this.axios.post("/json/timer/getFreeStaffs", this.object).then((res) => {
					if (res.data.code == 200) {
						var arr = new Array()
						
						let data = res.data.data.data
						if(data.length == 0){
							this.disabledForGetMore = true
						}
						for (let i = 0; i < data.length; i++) {
							var object = new Object()
							object.label = data[i].name + " 有空时间段" + data[i].timer
							object.key = data[i].id
							object.disabled = false
							arr.push(object)
						}
						this.data = this.data.concat(arr)
					}
				})
			}
		},
	}
</script>

<style>
</style>
