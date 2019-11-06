<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-18 17:23:44
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-06 08:38:25
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
      <el-table-column label="下单时间" prop="orderTime"></el-table-column>
      <el-table-column label="开始工作时间" prop="startTime"></el-table-column>
      <el-table-column label="注释" prop="comm"></el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope" >
          <el-button v-if="checkDateMethod(scope.row.startTime)" @click="plant(scope.row.id)">分配员工</el-button>
          <el-button v-else type="danger" @click="deleteOrder(scope.row.id)">删除过期订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
      @current-change="pageChange"
      :total="page.total"
      :current-page="page.pageNum"
      :page-size="page.pageSize"
    ></el-pagination>
    </el-row>
    
  </div>
</template>
<script>
export default {
  name: "workOrderPlant",
  mounted: function() {
    this.getDataMethod = this.getData(8);
    this.getDataMethod.page(1);
    this.checkDateMethod = this.checkOrderTime();
  },
  data() {
    return {
      getDataMethod: null,
      tableDate: [],
      loading: false,
      form: {
        status: 0
      },
      page: {
        total: 0,
        pageSize: 3,
        pageNum: 1
      },
      checkDateMethod:null,
    };
  },
  methods: {
    checkOrderTime(){
      var moment = this.$moment
      var now = moment()
      console.log(now)
      return (val) => {
        let startTime = moment(val)
        return now.isBefore(startTime)
      }
    },
    deleteOrder(id){
      console.log(id)
      this.axios.get("/json/order/deleteOrder/" + id).then((res)=>{
        if(res.data.code == 200){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getDataMethod.reload()
        }
      })
    },
    selectChange(val) {
      console.log(val);
      this.getDataMethod = this.getData(8);
      this.getDataMethod.page(1);
    },
    getData(pageSize) {
      var object = new Object();
      object.status = this.form.status;
      object.pageSize = pageSize;
      var num = 1
      var reload = _ =>{
        object.paegNum = num;
        this.getPage(object)
      }
      var page =  pageNum => {
        num = pageNum 
        object.pageNum = pageNum;
        this.getPage(object)
      };
      return {
        page:page,
        reload:reload,
      }
    },
    getPage(object){
      this.loading = true;
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
    },
    pageChange(val) {
      this.getDataMethod.page(val);
    },
    plant(id) {
      var query = {
        id: id
      };
      console.log(query);
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
