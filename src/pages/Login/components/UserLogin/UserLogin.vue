<!--
 * @Author: qiao
 * @Date: 2019-10-16 08:15:42
 * @LastEditTime: 2019-11-06 17:57:53
 * @LastEditors: qiaoge2333
 * @Description: In User Settings Edit
 * @FilePath: \Vuee:\Code\Hbuilder\iHome\src\pages\Login\components\UserLogin\UserLogin.vue
 -->
<template>
  <div class="user-login">
    <div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用
        <br />ICE 内容管理系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="user" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item
                  prop="username"
                  :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]"
                >
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon"></i>
                    <el-input placeholder="会员名/邮箱/手机号" v-model="user.username"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-service input-icon"></i>
                    <el-input type="password" placeholder="密码" v-model="user.password"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="remenber">
                  <el-checkbox class="checkbox" v-model="remenber">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">登 录</el-button>
            </el-row>
          </div>
          <el-row class="tips">
            <a href="/" class="link">立即注册</a>
            <span class="line">|</span>
            <a href="/" class="link">忘记密码</a>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BasicContainer from "@vue-materials/basic-container";
const backgroundImage =
  "https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png";
export default {
  components: { BasicContainer },
  name: "UserLogin",

  data() {
    return {
      backgroundImage: backgroundImage,
      user: {
        username: "",
        password: ""
      },
      remenber: false,
      hasCookie: false
    };
  },

  mounted() {
    console.log("登录页面初始化");
    //获取到了cookie
    let usr = this.$cookies.get("userInfo");
    if (usr != null) {
      //检测时间
      let moment = this.$moment;
      var now = moment();
      var date = moment(usr.date);
      console.log(now.isBefore(date));
      //现在时间再过期时间之前
      if (now.isBefore(date)) {
        this.user.username = usr.username;
        this.user.password = usr.password;
        this.remenber = true;
        return
      }
      this.$cookies.remove("userInfo")
    }
  },

  methods: {
    submitBtn() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let form = this.user;
          var object = new Object();
          object.account = form.username;
          object.pwd = form.password;
          this.axios
            .post("/json/admin/login", object)
            .then(res => {
              if (res.data.code == 200) {
                //登录成功
                this.$message.success("登录成功");
                this.$store.commit("user/login", res.data.data);
                //是否记住密码
                if (this.remenber) {
                  console.log("设置cookies");
                  var moment = this.$moment;
                  var now = moment();
                  now.add(7, "days");
                  this.user.date = now.format();
                  this.$cookies.set("userInfo", this.user);
                } else {
                  this.$cookies.remove("userInfo");
                }
                //跳转
                // this.$router.push("/");
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              this.$message.error("登录失败");
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./UserLogin.scss";
</style>
