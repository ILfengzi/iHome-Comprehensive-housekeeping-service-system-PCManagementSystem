<!--
 * @Author: qiaoge2333
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 -->
<template>
  <div v-loading="pageLoading">
    <el-form :inline="true" :model="userform" ref="userform">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userform.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-button @click="search(2)">搜索</el-button>
    </el-form>
    <el-table :data="tableData">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="昵称" prop="name"></el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="pageChange"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
		<FileUpload action="/json/other/fileUpload"></FileUpload>
  </div>
	
</template>

<script>
import FileUpload from "@/components/FileUpload";
export default {
  data() {
    return {
      userform: {
        name: "",
        phone: ""
      },
      pageLoading: true,
      getDataMethod: null,
      tableData: [],
      page: {
        pageSize: 2,
        pageNum: 1,
        total: 0
      }
    };
  },
  components: {
    FileUpload
  },
  mounted: function() {
    this.getDataMethod = this.getData(2, {});
    this.getDataMethod(1);
  },
  methods: {
    getData(pageSize, object) {
      return pageNum => {
        this.pageLoading = true;
        object.pageSize = pageSize;
        object.pageNum = pageNum;
        this.axios
          .post("/json/user/searchUserByCondition", object)
          .then(res => {
            if (res.data.code == 200) {
              this.page = res.data.data.page;
              this.tableData = res.data.data.users;
              this.pageLoading = false;
            } else {
              this.$message({
                message: "warning",
                type: "数据获取失败"
              });
            }
          })
          .catch(_ => {
            this.$message({
              message: "error",
              type: "网络连接错误"
            });
          });
      };
    },
    pageChange(val) {
      console.log(val);
      this.getDataMethod(val);
    },
    search(pageSize) {
      var object = new Object();
      let form = this.userform;
      if (form.name != "") {
        object.name = form.name;
      }
      if (form.phone != "") {
        object.phone = form.phone;
      }
      this.getDataMethod = this.getData(pageSize, object);
      this.getDataMethod(1);
    }
  }
};
</script>

<style>
</style>
