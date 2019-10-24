<template>
	<div>
		<el-dialog title="" :visible.sync="visible">
			<el-form :model="form">
				<el-form-item label="姓名">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio :label="0" >男</el-radio>
						<el-radio :label="1" >女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证">
					<el-input v-model="form.idCard" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="健康证">
					<el-input v-model="form.health" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="服务类型">
					<el-cascader v-model="form.detailtypeId" :show-all-levels="false" :props="props" :options="options"></el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer">
				
				<el-button @click="hide">取消</el-button>
				<el-button type='primary' @click="submit">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "StaffDialog",
		
		data() {
			return {
				visible: false,
				form: {
					"name": "",
					"sex": 0,
					"phone": "",
					"health": "",
					"idCard": "",
					"detailtypeId": 0,
					"qualification": "",
					"status": 0,
					"wechatId": 1
				},
				props:{
					lazy:true,
					emitPath:false,
					lazyLoad:(node,resolve) =>{
						
						this.axios.post("/json/order/selectByserviceidTest", {"serviceid":node.value}).then((res)=>{
							
							if (res.data.code == 200){
								const nodes = new Array()
								let arr = res.data.data
								for(let i = 0; i < arr.length; i++){
									var o = {
										"label":arr[i].typename,
										"value":arr[i].id,
										"leaf":true
									}
									nodes.push(o)
								}
								resolve(nodes)
							}
							
						})
						
					}
				},
				options:[{
					label:"钟点工",
					value:"1",
					children:[]
				},{
					label:"一般家政",
					value:"2",
					children:[]
				},{
					label:"家电维护",
					value:"3",
					children:[]
				},{
					label:"长期工",
					value:"4",
					children:[]
				}],
			}
		},
		methods: {
			show() {
				console.log("show")
				this.visible = true
			},
			hide() {
				console.log("hide")
				this.visible = false
			},
			submit() {
				this.axios.post("/json/staff/addStaff", this.form).then((res)=>{
					console.log(res)
				})
				console.log("submit")
				console.log(this.form)
				this.visible = false
			},
			changeStaff(staff){
				console.log(staff)
				this.form = staff
				
				this.show()
			}
		},
	}
</script>

<style>
</style>
