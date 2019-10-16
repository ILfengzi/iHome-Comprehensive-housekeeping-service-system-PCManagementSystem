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
    name: 'Dashboard',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/analysis',
        name: '分析页',
      },
      {
        path: '/monitor',
        name: '监控页',
      },
      {
        path: '/workplace',
        name: '工作台',
      },
    ],
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
  },
  {
    path: '/tool',
    name: '工具管理',
    icon: 'el-icon-picture-outline',
    children: [
      {
        path: '/line',
        name: '折线图',
      },
      {
        path: '/histogram',
        name: '柱状图',
      },
      {
        path: '/bar',
        name: '条形图',
      },
    ],
  },
  {
    path: '/profile',
    name: '详情页',
    icon: 'el-icon-tickets',
    children: [
      {
        path: '/success',
        name: '基础详情页',
      },
      {
        path: '/fail',
        name: '失败',
      },
    ],
  },
  {
    path: '/result',
    name: '结果页',
    icon: 'el-icon-circle-check-outline',
    children: [
      {
        path: '/success',
        name: '成功',
      },
      {
        path: '/fail',
        name: '失败',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
