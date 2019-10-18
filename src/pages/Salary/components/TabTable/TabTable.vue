<template>
  <div class="tab-table">
    <basic-container>
       <el-date-picker
          v-model="value"
          type="month"
          placeholder="选择月">
        </el-date-picker>
        &nbsp;
        <el-button type="primary" @click="handleChange()">更新员工工资</el-button>
      <el-tabs v-model="tabKey" @tab-click="handleClick">
       
        <el-tab-pane
          v-for="tab in tabs"
          :label="tab.tab"
          :name="tab.key"
          :key="tab.key">
          <el-table
            :data="dataSource"
            style="width: 100%">
            <el-table-column
              v-for="item,index in columns"
              :label="item.title"
              :prop="item.dataIndex"
              :key="item.key"
              :width="item.key !== 'action' ? (item.width || 150) : item.width">
              <template slot-scope="scope">
                <span v-if="item.key !== 'action'">{{scope.row[item.dataIndex]}}</span>
                <!-- <edit-dialog :row="scope.row" :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleMod="handleMod"></edit-dialog>
                <delete-balloon :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleRemove="handleRemove"></delete-balloon> -->
                <span v-else>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
// import DeleteBalloon from './components/DeleteBalloon';
// import EditDialog from './components/EditDialog';
import response from './tab-table.json';

export default {
  components: {
    BasicContainer
   // DeleteBalloon,
   // EditDialog,
    
  },
  name: 'TabTable',

  data() {
    return {
      tabKey: 'all',
      dataSource:[],
      value:null,
      tabs: [
        { tab: '全部', key: 'all' },
        { tab: '钟点工', key: 'inreview' },
        { tab: '维修工', key: 'released' },
        { tab: '维护工', key: 'rejected' },
      ],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '基础工资',
          dataIndex: 'basesalary',
          key: 'basesalary',
        },
        {
          title: '奖金',
          dataIndex: 'bonus',
          key: 'bonus',
        },
        {
          title: '提成',
          dataIndex: 'royalty',
          key: 'royalty',
        },
        {
          title: '操作',
          key: 'action',
        },
      ],
      visible: false,
    };
  },

  created() {},

  mounted() {
    //this.dataSource = response.data.all;
  },

  methods: {
    getSalary(currentDate) {
      this.axios.post('http://10.86.2.14:8080/json/order/salarylistBymonth',
      {
        date1:currentDate
      })
				.then(res => {
            this.dataSource=res.data.list;
            //this.dataSource=res.data.list.iStaff.name;

            //this.$set(this.data[i],'name',res.data.list[i].iStaff.name)
					  console.log(res.data);
						
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
				
    },
    handleClick(tab) {
      console.log(tab);
    },
    handleChange() {
      //console.log(this.value);
      if(this.value!=null){
        var date =new Date(this.value); 
      }
      else{
        var date=new Date();
      }
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
      var currentDate = date.getFullYear() + "-" + month + "-" + strDate
						+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      
      console.log(strDate);
      console.log(currentDate);
      currentDate="2019-10-17 10:32:29";
     
      this.getSalary(currentDate);
    },

    handleEdit(index, row) {
      console.log(index, row);
      

    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
}

</script>

<style>
  .tab-table {

  }
</style>
