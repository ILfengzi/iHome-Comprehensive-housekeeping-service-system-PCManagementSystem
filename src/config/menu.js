/*
 * @Description: 配置菜单
 * @Author: Lin Changkun
 * @Date: 2019-10-15 17:19:20
 * @LastEditTime: 2019-10-15 19:24:00
 * @LastEditors: Lin Changkun
 */
// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
	{
		path: '/order',
		name: '订单管理',
		icon: 'el-icon-date',
		children: [{
			path: '/order',
			name: '订单',
			id: 'Menu_ywi3m'
		}],
		id: 'Menu_5owir',
	},
	{
		path: '/person',
		name: '人员信息管理',
		icon: 'el-icon-edit-outline',
		children: [{
				path: '/staff',
				name: '员工信息管理',
				id: 'Menu_sn7l8'
			},
			{
				path: '/logistics',
				name: '管理员信息管理',
				id: 'Menu_ujy6g'
			},
			{
				path: '/user',
				name: '用户信息管理',
				id: 'Menu_uj23g'
			},
		],
		id: 'Menu_ngali',
	}, 
	{
		path: '/work',
		name: '工作管理',
		icon: 'el-icon-edit-outline',
		children:[{
			path: '/orderplant',
			name: '员工工作安排',
			id: "Menu_fuc3k"
		},{ path: '/longtermplant', name: '长期工工作安排', id: 'Menu_fucdk' }],
		id: 'Menu_f1dsd'
	},
	{
		path: '/dashboard',
		children: [{ name: '工具', path: '/tool', id: 'Menu_8fv0r' }],
		name: '工具管理',
		icon: 'el-icon-s-cooperation',
		id: 'Menu_s76t6',
	},
	// {
	// 	path: '/profile',
	// 	name: '详情页',
	// 	icon: 'el-icon-tickets',
	// 	children: [{
	// 			path: '/success',
	// 			name: '基础详情页',
	// 			id: 'Menu_3tx5j'
	// 		},
	// 		{
	// 			path: '/fail',
	// 			name: '失败',
	// 			id: 'Menu_y5ltg'
	// 		},
	// 	],
	// 	id: 'Menu_7ft9w',
	// },
	// {
	// 	path: '/result',
	// 	name: '结果页',
	// 	icon: 'el-icon-circle-check-outline',
	// 	children: [{
	// 			path: '/success',
	// 			name: '成功',
	// 			id: 'Menu_uude1'
	// 		},
	// 		{
	// 			path: '/fail',
	// 			name: '失败',
	// 			id: 'Menu_682r2'
	// 		},
	// 	],
	// 	id: 'Menu_lkx69',
	// },
	{
		children: [
		  { path: '/salary', name: '员工工资', id: 'Menu_kbc5w', icon: '' },
		],
		path: '/dashboard',
		name: '财务统计',
		id: 'Menu_yrqij',
		icon: 'el-icon-bank-card',
	  },
	{
		children: [{ name: '投诉', path: '/complaint', id: 'Menu_x269r' }],
		path: '/dashboard',
		name: '投诉管理',
		icon: 'el-icon-document',
		id: 'Menu_i1jiy',
	  },
];

export {
	headerMenuConfig,
	asideMenuConfig
};