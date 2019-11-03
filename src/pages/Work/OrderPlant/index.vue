<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-18 17:23:44
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-01 10:05:42
 -->
<template>
  <div v-loading="loading">
    <el-form :model="form" ref="orderForm">
      <el-form-item label="状态">
        <el-select v-model="form.status" @change="selectChange" placeholder="请选择订单状态">
          <el-option label="未分配" :value="0"></el-option>
          <el-option label="已分配" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="tableDate">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="plant(scope.row.id)">分配员工</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      :total="page.total"
      :current-page="page.pageNum"
      :page-size="page.pageSize"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "workOrderPlant",
  mounted: function() {
    this.getDataMethod = this.getData(10);
    this.getDataMethod(1);
  },
  data() {
    return {
      getDataMethod: null,
      tableDate: [],
      loading: false,
      form:{
        status:0,
      },
      page: {
        total: 0,
        pageSize: 3,
        pageNum: 1
      }
    };
  },
  methods: {
    selectChange(val){
      console.log(val)
      this.getDataMethod = this.getData(10)
      this.getDataMethod(1)
    },
    getData(pageSize) {
      var object = new Object();
      object.status = this.form.status;
      object.pageSize = pageSize;

      return pageNum => {
        this.loading = true;
        object.pageNum = pageNum;
        this.axios
          .post("/json/order/getOrderByStatus", object)
          .then(res => {
            if (res.data.code == 200) {
              console.log(res.data);
              this.tableDate = res.data.data.list;
              this.page.total = res.data.data.total;
              this.page.pageSize = res.data.data.pageSize;
              this.page.pageNum = res.data.data.pageNum;
            } else {
              this.$message({
                message: "获取数据失败",
                type: "warning"
              });
            }
            this.loading = false;
          })
          .catch(_ => {
            this.$message({
              message: "网络连接错误",
              type: "error"
            });
          });
      };
    },
    pageChange(val) {
      this.getDataMethod(val);
    },
    plant(id) {
      var query = {
        id: id
      };
      console.log(query)
      this.$router.push({
        path: "/work/staffplant",
        query: query
      });
    }
  }
};
</script>

<style>
</style>
