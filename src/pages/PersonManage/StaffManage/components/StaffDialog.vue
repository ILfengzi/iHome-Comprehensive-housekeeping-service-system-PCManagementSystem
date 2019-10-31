<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-17 21:29:01
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-31 14:56:07
 -->
<template>
  <div>
    <el-dialog title :visible.sync="visible">
      <el-container>
        <el-form :model="form">
          <el-form-item label="姓名">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务类型">
            <DetailCascader ref="fuck" />
          </el-form-item>
          <el-form-item label="微信id">
            <WeixinSelect ref="weixin" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" :clearable="true">
              <el-option
                v-for="item in StatusOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-container>

      <div slot="footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import WeixinSelect from "@/components/WeixinSelect";
import DetailCascader from "@/components/DetailCascader";
export default {
  name: "StaffDialog",
  components: {
    DetailCascader,
    WeixinSelect
  },
  data() {
    return {
      visible: false,
      submitMethod: null,
      form: {
        name: "",
        sex: 0,
        phone: "",
        detailtypeId: 0,
        status: 0,
        wechatId: 1
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
      this.visible = true;
    },
    hide() {
      console.log("hide");
      this.visible = false;
    },
    update() {
      this.form.detailtypeId = this.detailtypeId[1];
      this.axios.post("/json/staff/updateStaff", this.form).then(res => {
        console.log(res);
      });
      this.hide();
    },
    create() {
      this.form.detailtypeId = this.detailtypeId[1];
      this.axios.post(url, this.form).then(res => {
        console.log(res);
      });
      console.log("submit");
      console.log(this.form);
      this.hide();
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
