/*
 * @Author: qiaoge2333
 * @Date: 2019-10-16 08:15:42
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-07 22:55:05
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
import UserManage from '@/pages/PersonManage/UserManage';
import OrderInfo from '@/pages/Order/OrderInfo';
import Quit from '@/pages/Quit';
import StaffInfo from '@/pages/PersonManage/StaffManage/components/StaffInfo';
import LongTermPlant from '@/pages/Work/LongTermPlant';

const routerConfig = [
  {
    path: '/order',
    component: HeaderAsideLayout,
    children: [
			{ path: '/order/order', component: Order, meta:{keepAlive:true} },
			{ path: '/order/orderInfo', component: OrderInfo, meta:{keepAlive:false}}
		],
  },
  {
    path: '/person',
    component: HeaderAsideLayout,
    children: [
      { path: '/person/staff', component: StaffManage, meta:{keepAlive:true} },
      { path: '/person/logistics', component: LogisticsManage , meta:{keepAlive:true}},
			{ path: '/person/user', component: UserManage, meta:{keepAlive:true} },
    ],
  },
  {
	  path: '/work',
	  component: HeaderAsideLayout,
	  children: [
		  { path: '/work/orderplant', component: OrderPlant, meta:{keepAlive:true}},
      { path: '/work/staffplant', component: StaffPlant, meta:{keepAlive:false}},
      { path: '/work/staffInfo', component: StaffInfo, meta:{keepAlive:false}},
      { path: '/work/LongTermplant', component: LongTermPlant, meta:{keepAlive:true}},
	  ]
  },
  {
    path: '/login',
    component: Login,
    meta:{keepAlive:false}
  },
  {
    path: '/',
    component: HeaderAsideLayout,
    children: [
			{path: '/quit', component: Quit},
      { path: '/dashboard/analysis', component: Dashboard, meta:{keepAlive:false}},
      { path: '/dashboard/user', component: User, meta:{keepAlive:true} },
      { path: '/dashboard/salary', component: Salary, meta:{keepAlive:true} },
      { path: '/dashboard/complaint', component: Complaint, meta:{keepAlive:true} },
      { path: '/dashboard/tool', component: Tool, meta:{keepAlive:true} },
			
    ],
  },
  { path: '*', component: NotFound },
];

export default routerConfig;