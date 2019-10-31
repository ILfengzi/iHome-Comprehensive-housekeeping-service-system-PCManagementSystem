<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-29 11:01:14
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-31 08:34:49
 -->
<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form v-loading="loading" :model="form" ref="logisticsForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name" placeholder="请输入你的名称"></el-input>
        </el-form-item>
        <el-form-item prop="account" label="账号">
          <el-input v-model="form.account" placeholder="请输入你的账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" label="密码">
          <el-input v-model="form.pwd" placeholder="请输入你的密码"></el-input>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证">
          <el-input v-model="form.idCard" placeholder="请输入你的身份证"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入你的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择你的性别">
            <el-option
              v-for="item in formOption.sexOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入你的年龄"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入你的地址" type="textarea"></el-input>
        </el-form-item>
        <PositionSelect
          :value="form.positionId"
          v-model="form.positionId"
          prop="positionId"
          @dataGet="dataGet"
        ></PositionSelect>

        <el-row>
          <el-col :span="24">
            <el-button type="primary" style="width:100%;" @click="submitMethod()">提交</el-button>
          </el-col>
          <el-col :span="24">
            <el-button type="error" style="width:100%;" @click="reset('logisticsForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" style="width:100%">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PositionSelect from "@/components/PositionSelect";
export default {
  data() {
    return {
      form: {
        name: "",
        idCard: "",
        account: "",
        pwd: "",
        idCard: "",
        phone: "",
        sex: null,
        age: null,
        address: "",
        positionId: null
      },
      dialogVisible: false,
      loading: true,
      formOption: {
        sexOption: [
          {
            label: "男",
            value: 0
          },
          {
            label: "女",
            value: 1
          }
        ]
      },
      submitMethod: null
    };
  },
  components: {
    PositionSelect
  },
  methods: {
    reset(val) {
      this.$refs[val].resetFields();
    },
    update(id) {
      return ()=>{
        this.axios
        .post("/json/admin/updateAdmin/" + id, this.form)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "提交失败",
              type: "warning"
            });
          }
        })
        .catch(_ => {
          this.$message({
            message: "网络连接错误",
            type: "error"
          });
        });
      }
      
    },
    add() {
      this.axios
        .post("/json/admin/addAdmin", this.form)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "提交失败",
              type: "warning"
            });
          }
        })
        .catch(_ => {
          this.$message({
            message: "网络连接错误",
            type: "error"
          });
        });
    },
    addAdmin() {
      this.form = {
        name: "",
        idCard: "",
        account: "",
        pwd: "",
        idCard: "",
        phone: "",
        sex: null,
        age: null,
        address: "",
        positionId: null
      };
      this.dialogVisible = true;
      this.submitMethod = this.add;
    },
    updateAdmin(val) {
      this.dialogVisible = true;
      this.form = val;
      this.submitMethod = this.update(val.id);
    },
    dataGet(val) {
      if (val == null) {
        this.$message({
          message: "网络连接失败",
          type: "error"
        });
      } else if (val == false) {
        this.$message({
          message: "获取数据失败",
          type: "warning"
        });
      } else {
        this.loading = false;
      }
    }
  }
};
</script>