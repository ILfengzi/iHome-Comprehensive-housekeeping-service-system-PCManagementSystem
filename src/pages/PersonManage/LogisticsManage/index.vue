<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-16 09:19:30
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-04 09:46:16
 -->
<template>
  <div v-loading="pageLoading">
    <el-form :model="form" :inline="true">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入查找的姓名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" autocomplete="off"></el-input>
      </el-form-item>
      <PositionSelect prop="positionId" :value="form.positionId" v-model="form.positionId"></PositionSelect>
      <el-button type="primary" @click="search(10)">搜索</el-button>
      <el-button type="primary" @click="addAdmin">添加管理员</el-button>
    </el-form>

    <el-table style="width: 100%;" :data="tableData">
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="position" label="职业" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateAdmin(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteAdmin(scope.row,scope.index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        @current-change="pageChange"
      ></el-pagination>
    </el-row>
    <LogisticsForm ref="logisticsForm"></LogisticsForm>
  </div>
</template>

<script>
import PositionSelect from "@/components/PositionSelect";
import LogisticsForm from "@/pages/PersonManage/LogisticsManage/LogisticsForm";
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        positionId: null
      },
      tableData: [],
      getDataMethod: null,
      form: {},
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      pageLoading:true,
    };
  },
  components: {
    LogisticsForm,
    PositionSelect
  },
  mounted: function() {
    this.getDataMethod = this.getData(8, {});
    this.getDataMethod(1);
  },
  methods: {
    addAdmin() {
      this.$refs.logisticsForm.addAdmin();
    },
    updateAdmin(val) {
      this.$refs.logisticsForm.updateAdmin(val);
      console.log(val);
    },
    deleteAdmin(val,index) {
      console.log(val)
      this.axios.get("/json/admin/deleteAdmin/" + val.id).then((res) =>{
        if(res.data.code == 200){
          var arr = new Array()
          for(let i = 0; i < this.tableData.length; i++){
            if(i != index){
              arr.push(this.tableData[i])
            }
          }
          this.tableData = arr
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: '删除失败',
            type: 'warning'
          });
        }
      }).catch(_=>{
        this.$message({
          message: '网络连接错误',
          type: 'error'
        });
      })
    },
    changePage(val) {
      this, getDataMethod(0);
    },
    search(pageSize) {
      var object = new Object();
      if (this.form.name != "") {
        object.name = this.form.name;
      }
      if (this.form.phone != "") {
        object.phone = this.form.phone;
      }
      if (this.form.positionId != null) {
        object.positionId = this.form.positionId;
      }
      this.getDataMethod = this.getData(pageSize, object);
      this.getDataMethod(1);
    },
    pageChange(val){
      this.getDataMethod(val)
    },
    getData(pageSize, object) {
      object.pageSize = pageSize;
      return pageNum => {
        this.pageLoading = true
        object.pageNum = pageNum;
        this.axios
          .post("/json/admin/getAdmins", object)
          .then(res => {
        this.pageLoading = false

            if (res.data.code == 200) {
              console.log(res.data.data.page)
              this.tableData = res.data.data.data;
              this.page = res.data.data.page;
            } else {
              this.$message({
                message: "error",
                type: "获取数据失败"
              });
            }
          })
          .catch(error => {
            this.$message({
              message: "error",
              type: "网络错误"
            });
          });
      };
    }
  }
};
</script>

<style>
</style>
