/*
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:15:42
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-28 09:03:13
 */
import HeaderAsideLayout from '@/layouts/HeaderAsideLayout';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import User from '@/pages/User';
import Salary from '@/pages/Salary';
import Order from '@/pages/Order';
import StaffManage from '@/pages/PersonManage/StaffManage';
import LogisticsManage from '@/pages/PersonManage/LogisticsManage';
import OrderPlant from '@/pages/Work/OrderPlant';
import StaffPlant from '@/pages/Work/StaffPlant';
import Complaint from '@/pages/Complaint';
import Tool from '@/pages/Tool';
import UserManage from '@/pages/PersonManage/UserManage'


const routerConfig = [
  {
    path: '/order',
    component: HeaderAsideLayout,
    children: [{ path: '/order/order', component: Order }],
  },
  {
    path: '/person',
    component: HeaderAsideLayout,
    children: [
      { path: '/person/staff', component: StaffManage },
      { path: '/person/logistics', component: LogisticsManage },
			{ path: '/person/user', component: UserManage },
    ],
  },
  {
    path: '/charts',
    component: HeaderAsideLayout,
    children: [
      { path: '/charts/line', component: NotFound },
      { path: '/charts/histogram', component: NotFound },
      { path: '/charts/bar', component: NotFound },
    ],
  },
  {
	  path: '/work',
	  component: HeaderAsideLayout,
	  children: [
		  { path: '/work/orderplant', component: OrderPlant},
		  { path: '/work/staffplant', component: StaffPlant},
	  ]
  },
  {
    path: '/profile',
    component: HeaderAsideLayout,
    children: [
      { path: '/profile/success', component: NotFound },
      { path: '/profile/fail', component: NotFound },
    ],
  },
  {
    path: '/result',
    component: HeaderAsideLayout,
    children: [
      { path: '/result/success', component: NotFound },
      { path: '/result/fail', component: NotFound },
    ],
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: HeaderAsideLayout,
    children: [
      { path: '/dashboard/analysis', component: Dashboard },
      { path: '/dashboard/monitor', component: NotFound },
      { path: '/dashboard/workplace', component: NotFound },
      { path: '/dashboard/user', component: User },
      { path: '/dashboard/salary', component: Salary },
      { path: '/dashboard/complaint', component: Complaint },
      { path: '/dashboard/tool', component: Tool },
    ],
  },
  { path: '*', component: NotFound },
];

export default routerConfig;