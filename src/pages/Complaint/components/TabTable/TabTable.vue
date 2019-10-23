<template>
  <div class="tab-table">
    <basic-container>
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
              :width="item.key !== 'cstatus' ? (item.width || 150) : item.width">
              <template slot-scope="scope">
                <span v-if="item.key !== 'cstatus'">{{scope.row[item.dataIndex]}}</span>
                <!-- <edit-dialog :row="scope.row" :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleMod="handleMod"></edit-dialog>
                <delete-balloon :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleRemove="handleRemove"></delete-balloon> -->
                <span v-else-if="item.value!=='已处理'">
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                </span>
                <span v-else>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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


export default {
  components: {
    BasicContainer
    
  },
  name: 'TabTable',

  data() {
    return {
      tabKey: 'all',
      dataSource:[],
      value:null,
      tabs: [
        { tab: '全部', key: 'all' },
        { tab: '待处理', key: 0 },
        { tab: '已处理', key: 1},
      ],
      columns: [
        {
          title: '服务项目',
          dataIndex: 'typeName',
          key: 'typeName',
        },
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '用户联系方式',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '投诉问题',
          dataIndex: 'complaint',
          key: 'complaint',
        },
        {
          title: '解决方案',
          dataIndex: 'solve',
          key: 'solve',
        },
        {
          title: '状态',
          dataIndex: 'cstaus',
          key: 'cstaus',
        },

        // {
        //   title: '操作',
        //   key: 'action',
        // },
      ],
      visible: false,
      dialogFormVisible: false,
      form: {
          bonusrate: null,
          rolatyrate: null,
          detailtypeId:null,
      },
      formLabelWidth: '120px',
      options:[],
    };
  },

  created() {
    var currentDate=this.getFormatDate();
    this.getSalary(currentDate);
  },

  mounted() {
    //this.dataSource = response.data.all;
  },

  methods: {
    getSalary(currentDate) {
      this.axios.post('http://10.86.2.35:80/json/order/salarylistBymonth',
      {
        date1:currentDate
      })
				.then(res => {
            this.dataSource=res.data.list;
            //this.dataSource=res.data.list.iStaff.name;
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
    getFormatDate() {
      //获取时间
      //非空则为时间选择器选择的时间
      if(this.value!=null){
        var date =new Date(this.value); 
      }
      //为空则获取当前时间
      else{
        var date=new Date();
      }
      //对获取到的时间进行处理
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour=date.getHours();
			var minute=date.getMinutes();
      var second=date.getSeconds();
      //为1、2、3...等前面补0
			if (month >= 1 && month <= 9) {
				month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
      }
      if (hour >= 0 && hour<= 9) {
					hour = "0" + hour;
			}
			if (minute >= 0 && minute <= 9) {
					minute= "0" + minute;
			}
			if (second >= 0 && second <= 9) {
					second = "0" + second;
      }
      //将时间进行拼接
      var currentDate = date.getFullYear() + "-" + month + "-" + strDate
					+ " " + hour + ":" + minute + ":" + second;
      
     // console.log(strDate);
       console.log(currentDate);
       return currentDate;
     //currentDate="2019-10-17 10:32:29";
    },
    handleChange() {
      var currentDate=this.getFormatDate();
      this.getSalary(currentDate);
    },

    handleEdit(index, row) {
      this.dialogFormVisible=true;
      this.axios.post('http://10.86.2.14:80/json/order/selectBytypename',
      {
        
      })
				.then(res => {
          this.options=res.data.listd;
          
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
      //console.log(index, row);
      // this.myIndex=index;
      // this.myRow=row;
    },
    handleUpdate(){
      //console.log(this.form);
      this.axios.post('http://10.86.2.14:80/json/order/modifySalary',
      {
        "bonusrate":this.form.bonusrate,
        "rolatyrate":this.form.rolatyrate,
        "typeid":this.form.detailtypeId
      })
				.then(res => {
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
      var currentDate=this.getFormatDate();
      this.getSalary(currentDate);
      this.dialogFormVisible=false;
    },
    handleUpdate1(index, row){
      console.log(this.myIndex,this.myRow);

      this.axios.post('http://10.86.2.14:80/json/order/modifyBaseSalary',
      {
        "id":this.row.id,
        "basesalary":this.form1.basesalary,
        
      })
				.then(res => {
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
      this.$set(this.dataSource[this.myIndex],'basesalary',this.form1.basesalary);
      this.dialogFormVisible1=false;
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
