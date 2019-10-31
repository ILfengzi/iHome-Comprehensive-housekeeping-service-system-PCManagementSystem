<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-18 17:23:44
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-31 20:53:06
 -->
<template>
  <div v-loading="loading">
    <el-table :data="tableDate">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="plant(scope.row)">分配员工</el-button>
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
    this.getDataMethod = this.getData(2);
    this.getDataMethod(1);
  },
  data() {
    return {
      getDataMethod: null,
      tableDate: [],
      loading: false,
      page: {
        total: 0,
        pageSize: 3,
        pageNum: 1
      }
    };
  },
  methods: {
    getData(pageSize) {
      var object = new Object();
      object.status = 0;
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
    plant(order) {
      var query = {
        startTime: order.startTime,
        serviceId: order.detailtype.servicetpyeId,
        orderId: order.id
      };
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
