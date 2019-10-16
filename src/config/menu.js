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
    path: '/dashboard',
    name: '用户管理',
    icon: 'el-icon-menu',
    children: [{ path: '/user', name: '客户信息管理', id: 'Menu_fmcl6' }],
    id: 'Menu_f1xnd',
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'el-icon-date',
    children: [
      {
        path: '/order',
        name: '订单',
      },
    ],
    id: 'Menu_5owir',
  },
  {
    path: '/person',
    name: '人员信息管理',
    icon: 'el-icon-edit-outline',
    children: [
      {
        path: '/staff',
        name: '从业人员管理',
      },
	  {
	    path: '/logistics',
	    name: '后勤人员管理',
	  },
    ],
    id: 'Menu_ngali',
  },
  {
    path: '/tool',
    name: '工具管理',
    icon: 'el-icon-picture-outline',
    children: [
      { path: '/line', name: '折线图', id: 'Menu_uw149' },
      { path: '/histogram', name: '柱状图', id: 'Menu_48w2i' },
      { path: '/bar', name: '条形图', id: 'Menu_etlyg' },
    ],
    id: 'Menu_y7nwk',
  },
  {
    path: '/profile',
    name: '详情页',
    icon: 'el-icon-tickets',
    children: [
      { path: '/success', name: '基础详情页', id: 'Menu_3tx5j' },
      { path: '/fail', name: '失败', id: 'Menu_y5ltg' },
    ],
    id: 'Menu_7ft9w',
  },
  {
    path: '/result',
    name: '结果页',
    icon: 'el-icon-circle-check-outline',
    children: [
      { path: '/success', name: '成功', id: 'Menu_uude1' },
      { path: '/fail', name: '失败', id: 'Menu_682r2' },
    ],
    id: 'Menu_lkx69',
  },
];

export { headerMenuConfig, asideMenuConfig };
