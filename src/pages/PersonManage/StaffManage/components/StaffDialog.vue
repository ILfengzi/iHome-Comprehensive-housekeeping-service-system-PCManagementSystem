<template>
	<div>
		<el-dialog title="" :visible.sync="visible">
			<el-form :model="form">
				<el-form-item label="姓名">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
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
			</el-form>
			<div slot="footer">
				<el-button @click="hide">取消</el-button>
				<el-button type='primary' @click="submit">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default{
	name:"StaffDialog",
	data() {
		return {
			visible: false,
			form: {
				"name":"",
				"sex":0,
				"phone":"",
				"health":"",
				"idCard":"",
				  "basesalary": 0,
				  "detailtypeId": 0,
				  "health": "string",
				  "id": 0,
				  "idCard": "string",
				  "name": "string",
				  "phone": "string",
				  "qualification": "string",
				  "sex": 0,
				  "status": 0,
				  "typename": "string",
				  "wechatId": 0
			}
		}
	},
	methods: {
		show() {
			console.log("show")
			this.visible = true
		},
		hide(){
			console.log("hide")
			this.visible = false
		},
		submit(){
			this.axios.post()
			console.log("submit")
			this.visible = false
		}
	},
}
</script>

<style>
</style>
