<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-19 08:11:10
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-11-04 15:31:19
 -->
<template>
  <div v-if="orderInfo!=null" v-loading="loading.all">
    <el-card header="订单信息">
      <p>订单编号：{{orderInfo.id}}</p>
      <p>下单时间：{{orderInfo.orderTime}}</p>
      <p v-if="!(!orderInfo.price)">订单价格：{{orderInfo.price}}</p>
      <p>订单开始时间：{{orderInfo.startTime}}</p>
      <p>订单结束时间：{{orderInfo.finalyTime}}</p>
      <p>订单备注：{{orderInfo.comm}}</p>
      <p>订单类型：{{orderInfo.detailtype.typename}}</p>
      <el-card header="客户信息">
        <p>用户名：{{orderInfo.user.name}}</p>
        <p>手机号：{{orderInfo.user.phone}}</p>
        <p></p>
      </el-card>
      <el-card header="订单地址信息">
        <p>客户名称：{{orderInfo.userDetail.username}}</p>
        <p>客户电话：{{orderInfo.userDetail.phone}}</p>
        <p>客户地址：{{orderInfo.userDetail.province}} {{orderInfo.userDetail.city}} {{orderInfo.userDetail.detail}}</p>
      </el-card>
    </el-card>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1" v-loading="loading.nowStaffs" title="现有员工">
        <el-table :data="tableData">
          <el-table-column prop="id" label="员工编号"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column prop="phone" label="员工手机号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeStaff(scope.row)" type="danger">移除员工</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
      <!-- 获取现有员工 -->

      <el-collapse-item v-loading="loading.addStaffLoading" name="3" title="添加员工">
        <el-transfer v-model="result" :data="data" :titles="['空闲员工','分配的员工']"></el-transfer>
        <el-button @click="getMore" :disabled="disabledForGetMore">获取更多员工</el-button>
        <el-button @click="submit">提交</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "StaffPlant",
  mounted: function() {
    //检测是否为空
    // if(!this.$route.query.id){
    // 	this.$router.back()
    // }
    console.log(this.$route.query.id);
    //根据id获取订单数据
    this.getData(this.$route.query.id);
    this.getStaffData(this.$route.query.id);
    // this.object.serviceId = this.$route.query.serviceId;
    // this.orderId = this.$route.query.orderId;
    // this.object.startTime = this.$route.query.startTime;
    // this.getStaffs();
    this.checkDateMethod = this.checkOrderTime
    this.checkOrderTime()
  },
  data() {
    return {
      tableData: [],
      loading: {
        addStaffLoading: false,
        all: true,
        nowStaffs: true
      },
      activeName: 1,
      object: {
        startTime: null,
        pageNum: 1,
        pageSize: 10,
        serviceId: 1
      },
      orderInfo: null,
      disabledForGetMore: false,
      checkDateMethod:null,
      result: [],
      data: []
    };
  },
  methods: {
    //检测订单是否过期
    
    removeStaff(staff) {
      this.loading.nowStaffs = true;
      var data = {
        orderId: this.orderInfo.id,
        serviceId: this.orderInfo.detailtype.servicetpyeId,
        staffId: staff.id
      };
      this.axios
        .post("/json/order/removeStaffFromOrder", data)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              message: "员工移除成功",
              type: "success"
            });
            //重启获取员工
          } else {
            this.$message({
              message: "员工移除失败",
              type: "warning"
            });
            
          }
          this.getStaffData(this.orderInfo.id)
          setTimeout(_=>{
            this.loading.nowStaffs = false;
          },1000)
        })
        .catch(_ => {
          this.$message({
            message: "网络连接错误",
            type: "error"
          });
        });
    },
    getStaffData(id) {
      this.loading.nowStaffs = true;
      this.axios
        .get("/json/order/getOrderStaffs/" + id)
        .then(res => {
          if (res.data.code == 200) {
            // console.log("fuck")
            this.tableData = res.data.data;
          } else {
            this.$message({
              message: "获取员工数据失败",
              type: "warning"
            });
          }
          this.loading.nowStaffs = false;
        })
        .catch(_ => {
          this.$message({
            message: "网络连接错误",
            type: "error"
          });
          this.$router.push("*");
        });
    },
    getData(id) {
      this.loading.all = true;
      this.axios
        .get("/json/order/getOne/" + id)
        .then(res => {
          if (res.data.code == 200) {
            this.orderInfo = res.data.data;
            this.loading.all = false;
            this.object.startTime = this.orderInfo.startTime;
            this.object.serviceId = this.orderInfo.detailtype.servicetpyeId;
          } else {
            this.$message({
              message: "",
              type: "warning"
            });
            this.$router.back();
          }
        })
        .catch(_ => {
          this.$message({
            message: "网络连接错误",
            type: "error"
          });
          this.$router.push("*");
        });
    },
    submit() {
      if(this.result.length == 0){
        this.$message({
          message: '请至少选择一个员工',
          type: 'warning'
        });
        return
      }
      if (this.orderInfo.id != null) {
        this.loading.addStaffLoading = true;
        this.axios
          .post("/json/order/plantOtherStaffs", {
            orderId: this.orderInfo.id,
            serviceId: this.orderInfo.detailtype.servicetpyeId,
            staffIds: this.result
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "添加员工成功",
                type: "success"
              });
              //获取员工数据
              this.getStaffData(this.orderInfo.id)
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
            this.loading.addStaffLoading = false;

            //清空获取数据
            this.object.pageNum = 1;
            this.data = [];
            this.result = [];
            this.disabledForGetMore = false;
          })
          .catch(_ => {
            this.$message({
              message: "网络连接错误",
              type: "error"
            });
            // this.$router.push("*");
          });
      }
    },
    getMore() {
      this.object.pageNum += 1;
      this.getStaffs();
    },
    deleteStaff(val) {
      console.log(val);
    },
    getStaffs() {
      this.axios.post("/json/timer/getFreeStaffs", this.object).then(res => {
        if (res.data.code == 200) {
          var arr = new Array();

          let data = res.data.data.data;
          if (data.length == 0) {
            this.disabledForGetMore = true;
          }
          for (let i = 0; i < data.length; i++) {
            var object = new Object();
            object.label = data[i].name + " 有空时间段" + data[i].timer;
            object.key = data[i].id;
            object.disabled = false;
            arr.push(object);
          }
          this.data = this.data.concat(arr);
        }else{
          this.disabledForGetMore = true;
          this.$message({
            message: '用户获取失败，或该订单已经过期',
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
