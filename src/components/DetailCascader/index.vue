<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-25 14:57:34
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-04 08:15:16
 -->
<template>
	<el-form-item label="服务类型" :prop="prop">
		<el-cascader v-model="detailtypeId" :clearable="true" :show-all-levels="false" :props="props" :options="options"></el-cascader>
	</el-form-item>
</template>

<script>
export default{
	name:"DetailCascader",
	props: {
		prop: {
			type: String,
		},
		value:{
			type: Array,
		}
	},
	 mounted(){
	        this.detailtypeId = this.value;
	    },
	data() {
		return {
			detailtypeId:[],
			props:{
				lazy:true,
				lazyLoad:(node,resolve) =>{
					this.axios.post("/json/order/selectByserviceidTest", {"serviceid":node.value}).then((res)=>{
						if (res.data.code == 200){
							const nodes = new Array()
							let arr = res.data.data
							console.log(arr)
							resolve(res.data.data)
						}
						
					})
					
				}
			},
			options:[{
				label:"钟点工",
				value:1,
				children:[]
			},{
				label:"一般家政",
				value:2,
				children:[]
			},{
				label:"家电维护",
				value:3,
				children:[]
			},{
				label:"长期工",
				value:4,
				children:[]
			}],
		}
	},
	methods: {
		setInitDetailId(staff) {
			this.axios.get("/json/order/getDetailsBydetailId/" + staff.detailtypeId).then((res)=>{
				console.log(res)
				this.detailtypeId = [res.data.data.index, staff.detailtypeId]
				for(let i = 0; i < this.options.length; i++){
					if (this.options[i].value == res.data.data.index){
						this.options[i].children = res.data.data.arr
					}
				}
			})
		},
		getValue(){
			return this.detailtypeId[1]
		},
	},
	watch: {
		value(val){
			this.detailtypeId = val;
		},
		detailtypeId(val) {
			console.log('改变' + val)
			this.$emit("input",val[1])
		}
	},
}
</script>

<style>
</style>
