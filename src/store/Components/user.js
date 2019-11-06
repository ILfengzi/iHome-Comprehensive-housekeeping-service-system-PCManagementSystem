/*
 * @Author: qiaoge2333
 * @Date: 2019-11-06 15:10:41
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-06 17:17:36
 */



const state = {
  name:null,
  positionId:null,
  isLogin:false,
}

const getters = {
  getName: state => {return state.name;},
  getPositionId: state =>{return state.positionId;},
  getLogin: state =>{return state.isLogin;}
}

const actions = {
  
}

const mutations = {
  login(state,userInfo){
    state.name = userInfo.name;
    state.positionId = userInfo.positionId;
    state.isLogin = true;
  },
  logout(state){
    state.name = null;
    state.positionId = null;
    state.isLogin = false;
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}