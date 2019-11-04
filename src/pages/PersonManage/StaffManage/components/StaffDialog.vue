<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-17 21:29:01
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-03 22:41:51
 -->
<template>
  <div>
    <el-dialog title :visible.sync="visible">
      <el-container>
        <el-form :model="form" ref="form">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="detailtypeId" label="服务类型">
            <DetailCascader v-model="form.detailtypeId" :value="form.detailtypeId" ref="fuck" />
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-select v-model="form.status" :clearable="true">
              <el-option
                v-for="item in StatusOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" >提交</el-button>
          <el-button type="success" @click="resetForm">重置</el-button>
        </el-form>
      </el-container>

      <div slot="footer">
        <el-button @click="hide" type="danger" style="width:100%;">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DetailCascader from "@/components/DetailCascader";
export default {
  name: "StaffDialog",
  components: {
    DetailCascader,
  },
  data() {
    return {
      visible: false,
      submitMethod: null,
      form: {
        name: "",
        sex: null,
        phone: "",
        detailtypeId: null,
        status: null,
      },
      StatusOption: [
        {
          value: 0,
          label: "休闲中"
        },
        {
          value: 1,
          label: "休假中"
        },
        {
          value: 2,
          label: "服务中"
        },
        {
          value: 3,
          label: "无效"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.submitMethod();
    },
    show() {
      this.submitMethod = this.create;
      this.form = {
        name: "",
        sex: null,
        phone: "",
        detailtypeId: null,
        status: null,
      }
      this.visible = true;
    },
    hide() {
      console.log("hide");
      this.visible = false;
    },
    update() {
      this.axios.post("/json/staff/updateStaff", this.form).then(res => {
        console.log(res);
      });
      this.hide();
    },
    create() {
      this.axios.post(url, this.form).then(res => {
        console.log(res);
      });
      console.log("submit");
      console.log(this.form);
      this.hide();
    },
    resetForm(){
      console.log("重置")
      this.$refs.form.resetFields();
    },
    changeStaff(staff) {
      this.submitMethod = this.update;
      this.form = staff;
      setTimeout(() => {
        this.$refs.fuck.setInitDetailId(staff);
      }, 10);
      this.visible = true;
    }
  }
};
</script>

<style>
</style>
