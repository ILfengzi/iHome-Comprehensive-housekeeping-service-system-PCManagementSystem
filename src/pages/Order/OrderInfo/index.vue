<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-28 09:37:41
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-30 09:43:57
 -->
<template>
  <div>
    <el-collapse  @change="collapseChange" v-model="current" accordion>
      <el-collapse-item name="orderDetails" title="订单详细">
        <el-card>
          <div class="font24" v-if="orderInfo.orderDetails.data != null">
            用户名：{{orderInfo.orderDetails.data.username}}
            <br />
            省：{{orderInfo.orderDetails.data.province}} 市：{{orderInfo.orderDetails.data.city}}
            <br />
            详细：{{orderInfo.orderDetails.data.detail}}
            <br />
            手机号：{{orderInfo.orderDetails.data.phone}}
            <br />
            状态：{{orderInfo.orderDetails.data.status}}
            <br />
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item name="orderToolRecords" title="订单工具记录">
        <template v-if="orderInfo.orderToolRecords.data != null">
          <div v-for="item in orderInfo.orderToolRecords.data" :key="item.id">
            <el-card  class="font24" >
              编号：{{item.id}}
              <br />
              员工编号：{{item.staff_id}} 员工名称：{{item.staff.name}}
              <br />
              工具编号：{{item.iTool.id}} 工具名称：{{item.iTool.tname}}
              <br />
              数量: {{item.count}}
              <br />
              状态：{{item.state}}
              <br />
            </el-card>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item  name="orderStaffs" title="订单分配员工">
        <template v-if="orderInfo.orderStaffs.data != null">
          <div :key="item.id" v-for="item in orderInfo.orderStaffs.data">
            <el-card  class="font24" >
              员工编号：{{item.staffs.id}}
              <br />
              员工名称：{{item.staffs.name}}
              <br />
              手机号：{{item.staffs.phone}}
              <br />
            </el-card>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>

export default {
  name: "OrderInfo",
  mounted: function() {
    this.orderInfo.orderDetails.id = this.$route.query.useraddressId;
    this.orderInfo.orderToolRecords.id = this.$route.query.id;
    this.orderInfo.orderStaffs.id = this.$route.query.id;
  },

  data() {
    return {
      current: 0,
      orderInfo: {
        orderDetails: {
          url: "/json/user/getOrderDetail/",
          data: null,
          id: 0
        },
        orderToolRecords: {
          url: "/json/tool/getToolRecordsByOrderId/",
          data: null,
          id: 0
        },
        orderStaffs: {
          url: "/json/order/getOrderStaffs/",
          data: null,
          id: 0
        }
      }
    };
  },
  methods: {
    collapseChange(name) {
      if (name != "" && this.orderInfo[name].data == null) {
        this.axios
          .get(this.orderInfo[name].url + this.orderInfo[name].id)
          .then(res => {
            if (res.data.code == 200) {
              this.orderInfo[name].data = res.data.data;
            } else {
              this.$message.warning("获取数据错误");
            }
          })
          .catch(_ => {
            this.$message.error("网络连接错误");
          });
      }
    }
  }
};
</script>

<style scoped>
.font24{
font-size: 24px;
}
</style>