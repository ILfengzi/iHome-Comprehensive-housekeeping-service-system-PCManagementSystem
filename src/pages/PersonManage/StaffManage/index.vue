<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-16 09:19:38
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-06 09:08:07
 -->
<template>
  <div v-loading="loading">
    <!-- <el-button @click="showDialog">添加员工</el-button> -->
    <el-button @click="HeightSearchDrawer = true" type="primary" style="margin-left: 16px;">高级查询</el-button>
    <el-button @click="showForm" type="primary">添加员工</el-button>
    <el-drawer title="高级查询" :visible.sync="HeightSearchDrawer" direction="rtl">
      <el-form :model="form" ref="heightSearch">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <DetailCascader prop="detailtypeId" v-model="form.detailtypeId" ref="detail" />
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row align="middle">
          <el-button type="primary" @click="search(8)">搜索</el-button>
          <el-button type="infor" @click="resetForm('heightSearch')">重置</el-button>
          <el-button>取消</el-button>
        </el-row>
      </el-form>
    </el-drawer>
    <el-table style="width: 100%;" :data="tableData">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">{{vsexs[scope.row.sex]}}</template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="detailtypeId" label="服务类型"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{vstatus[scope.row.status]}}</template>
      </el-table-column>
      <el-table-column fixed="right" width="300" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 3">
            <el-button type="danger" @click="recoverStaff(scope.row)">恢复删除的员工</el-button>
          </div>
          <div v-else>
            <el-button type="danger" @click="deleteStaff(scope.row)">删除</el-button>
            <el-button type="info" @click="updateStaff(scope.row)">修改</el-button>
            <el-button type="primary" @click="getStaffInfo(scope.row)">详细信息</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="pageChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </el-row>
    <StaffDialog ref="dialog" />
    
	<el-dialog title="添加员工信息详情" :visible.sync="dialogFormVisible">
			<el-form :model="form1">
				<el-form-item label="电话" :label-width="formLabelWidth">
					<el-input  v-model="form1.phone" autocomplete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="服务项目" :label-width="formLabelWidth">
					<el-select v-model="form1.typeid" clearable placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.typename"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdate()">确 定</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
import DetailCascader from "@/components/DetailCascader";
import global from "@/js/global.js";
import StaffDialog from "./components/StaffDialog";
import option from "@/js/option.js";
export default {
  mounted: function() {
    this.getDataMethod = this.getData(8);
    this.getDataMethod.page(1);
  },

  components: {
    StaffDialog,
    DetailCascader
  },
  data() {
    return {
      form: {
        name: "",
        sex: null,
        phone: "",
        detailtypeId: null,
        status: null
      },
      loading: false,
      HeightSearchDrawer: false,
      vsexs: global.sexs,
      statusOption: option.staffStatusOption,
      vstatus: global.staffStatus,
      deleteVisible: false,
      tableData: [],
      getDataMethod: null,
      page: {
        total: 0,
        pageSize: 2,
        pageNum: 1
      },
      dialogFormVisible: false,
	  formLabelWidth: "120px",
	  form1: {
		phone:"",
		typeid:null,
	  },
      options: []
    };
  },
  methods: {
    getStaffInfo(val) {
      this.$router.push({ path: "/work/staffInfo", query: val });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    search(pageSize) {
      var object = new Object();
      if (this.form.name != "") {
        object.name = this.form.name;
      }
      if (this.form.sex != null) {
        object.sex = this.form.sex;
      }
      if (this.form.phone != "") {
        obect.phone = this.form.phone;
      }
      if (this.form.detailtypeId != null) {
        object.detailtypeId = this.form.detailtypeId[1];
      }
      if (this.form.status != null) {
        object.status = this.form.status;
      }
      this.getDataMethod = this.heightSearch(pageSize, object);
      this.getDataMethod.page(1);
    },
    heightSearch(pageSize, object) {
      this.HeightSearchDrawer = false;
      object.pageSize = pageSize;
      var page = pageNum => {
        setTimeout(_ => {
          object.pageNum = pageNum;
          this.getPage(object);
        }, 200);
      };
      var reload = _ => {
        this.getPage(object);
      };
      return {
        page: page,
        reload: reload
      };
    },
    getPage(object) {
      this.loading = true;
      this.axios.post("/json/staff/heightSearch", object).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          let page = res.data.data;
          this.page.pageSize = page.pageSize;
          this.page.pageNum = page.pageNum;
          this.page.total = page.total;
          this.loading = false;
        }
      });
    },
    showDialog() {
      this.$refs.dialog.show();
    },
    getData(pageSize) {
      var object = new Object();
      object.pageSize = pageSize;
      var page = pageNum => {
        object.pageNum = pageNum;
        setTimeout(_ => {
          this.getPage(object);
        }, 200);
      };
      var reload = _ => {
        this.getPage(object);
      };
      return {
        page: page,
        reload: reload
      };
    },
    pageChange(val) {
      this.getDataMethod.page(val);
    },
    updateStaff(val) {
      this.$refs.dialog.changeStaff(val);
    },
    recoverStaff(val) {
      this.$confirm("确定恢复删除的员工吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/json/staff/recoverStaff/" + val.detailtypeId + "/" + val.id)
            .then(res => {
              if (res.data.code == 200) {
                val.status = 0;
                this.$message({
                  type: "success",
                  message: "恢复成功"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "恢复失败"
                });
              }
            })
            .catch(_ => {
              this.$message({
                message: "error",
                type: "网络连接错误"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复"
          });
        });
    },
    deleteStaff(val) {
      this.$confirm("确定要删除该员工吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/json/staff/deleteStaff", {
              id: val.id
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code == 200) {
                val.status = 3;
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getDataMethod.reload();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showForm() {
      this.dialogFormVisible = true;
      this.axios
        .post("/json/order/selectBytypename", {})
        .then(res => {
          this.options = res.data.listd;
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    },
    handleUpdate() {
      this.axios
        .post("/json/staff/userStaff", {
          phone: this.form1.phone,
          typeid: this.form1.typeid
        })
        .then(res => {
          //console.log(this.dataSource);
        })
        .catch(error => {
          //console.log(error);
          alert("网络错误，不能访问");
        });
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style>
</style>
