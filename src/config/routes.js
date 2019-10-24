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
		  { path: '/work/staffplant', component: StaffPlant}
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
    path: '/',
    component: HeaderAsideLayout,
    children: [
      { path: '/dashboard/analysis', component: Dashboard },
      { path: '/dashboard/monitor', component: NotFound },
      { path: '/dashboard/workplace', component: NotFound },
      { path: '/login', component: Login },
      { path: '/dashboard/user', component: User },
      { path: '/dashboard/salary', component: Salary },
      { path: '/dashboard/complaint', component: Complaint },
    ],
  },
  { path: '*', component: NotFound },
];

export default routerConfig;
