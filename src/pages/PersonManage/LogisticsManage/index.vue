<template>
	<div>
		<el-table style="width: 100%;" :data="tableData">
			<el-table-column prop="id" label="编号" width="100">
				
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100">
				
			</el-table-column>
			<el-table-column prop="phone" label="手机号" width="100">
				
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100">
				
			</el-table-column>
			<el-table-column prop="position" label="职业" width="100">
				
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
			tableData: [
	{
		"id" : 1,
		"name" : "你麻麻",
		"sex" : 0,
		"phone" : "12569874521",
		"detailtype_id" : 2,
		"wechat_id" : 2,
		"qualification" : "没有",
		"health" : "没有",
		"id_card" : "654634549",
		"status" : 3
	},
	{
		"id" : 2,
		"name" : "王二",
		"sex" : 1,
		"phone" : "3131313123",
		"detailtype_id" : 3,
		"wechat_id" : 3,
		"qualification" : "没有",
		"health" : "没有",
		"id_card" : "654631234549",
		"status" : 3
	},
	{
		"id" : 3,
		"name" : "倪丹",
		"sex" : 0,
		"phone" : "13513135135",
		"detailtype_id" : 3,
		"wechat_id" : 4,
		"qualification" : "没有",
		"health" : "没有",
		"id_card" : "1421214",
		"status" : 0
	},
	{
		"id" : 4,
		"name" : "阿萨",
		"sex" : 1,
		"phone" : "65445331",
		"detailtype_id" : 2,
		"wechat_id" : 5,
		"qualification" : "v没有",
		"health" : "没有",
		"id_card" : "21521414214",
		"status" : 0
	},
	{
		"id" : 5,
		"name" : "铁蛋",
		"sex" : 0,
		"phone" : "124125124",
		"detailtype_id" : 1,
		"wechat_id" : 4,
		"qualification" : "无",
		"health" : "无",
		"id_card" : "1124124124",
		"status" : 3
	},
	{
		"id" : 6,
		"name" : "铁蛋",
		"sex" : 0,
		"phone" : "124125124",
		"detailtype_id" : 1,
		"wechat_id" : 4,
		"qualification" : "无",
		"health" : "无",
		"id_card" : "1124124124",
		"status" : 0
	},
	{
		"id" : 7,
		"name" : "草泥马",
		"sex" : 0,
		"phone" : "31215643",
		"detailtype_id" : 1,
		"wechat_id" : 5,
		"qualification" : "没有",
		"health" : "没有",
		"id_card" : "没有",
		"status" : 0
	},
	{
		"id" : 8,
		"name" : "你老爸",
		"sex" : 0,
		"phone" : "asdasdasdads",
		"detailtype_id" : 3,
		"wechat_id" : 1,
		"qualification" : "asdasdasd",
		"health" : "asdasdasd",
		"id_card" : "asdadsad",
		"status" : 0
	}
]
		}
	},
}
</script>

<style>
</style>
