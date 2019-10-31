/*
 * @Author: qiaoge2333
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 */
import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from '@/config/routes';

const router = new Router({
  routes: routerConfig,
});

router.beforeEach((to, from, next) => {
  
  //路由发生改变时修改页面的title
  if(to.meta.title){
    document.title = to.meta.title
  }
	if (to.fullPath == "/quit"){
	  sessionStorage.clear();
	  next({path:"/login"})
	}
  let user = JSON.parse(sessionStorage.getItem("myUser") || '[]')
  if (user.name && user.password){
    next()
  }else{
    if (to.fullPath == "/login"){
      next()
    }
     else {
      next({path:"/login"})
    }
  }

})

Vue.use(Router);

export default router
