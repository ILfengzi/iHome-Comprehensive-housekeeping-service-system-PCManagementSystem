const OrderstatusOption = [{
		value: -1,
		label: "全部"
	},
	{
		value: 0,
		label: "已提交"
	},
	{
		value: 1,
		label: "已取消"
	},
	{
		value: 2,
		label: "待服务"
	},
	{
		value: 3,
		label: "服务中"
	},
	{
		value: 4,
		label: "已完成"
	},
	{
		value: 5,
		label: "无效"
	},
]

const staffStatusOption = [
	{
		value:0,
		label: "休闲中"
	},
	{
		value:1,
		label: "休假中"
	},
	{
		value:2,
		label: "服务中"
	},
	{
		value:3,
		label: "无效"
	},
	
]

export default{
	OrderstatusOption,
	staffStatusOption
}