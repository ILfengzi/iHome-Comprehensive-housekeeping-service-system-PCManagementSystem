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
        <el-button type="primary" @click="handleEdit()">修改提成</el-button>
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
                <!-- <span v-else>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </span>  -->
              </template>
            </el-table-column>
          </el-table>
          <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
    </basic-container>
    <!-- Form -->
    <el-dialog title="修改提成和奖金" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="服务项目" :label-width="formLabelWidth">
          <el-select v-model="form.detailtypeId" clearable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.typename"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖金" :label-width="formLabelWidth">
          <el-input v-model="form.bonusrate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提成率" :label-width="formLabelWidth">
          <el-input v-model="form.rolatyrate" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form
    <el-dialog title="修改基础工资" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="基础工资" :label-width="formLabelWidth1">
          <el-input v-model="form1.basesalary" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate1()">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
  
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
// import DeleteBalloon from './components/DeleteBalloon';
// import EditDialog from './components/EditDialog';
// import response from './tab-table.json';

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
          title: '服务项目',
          dataIndex: 'typename',
          key: 'typename',
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
          title: '总工资',
          dataIndex: 'ssum',
          key: 'ssum',
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
      dialogFormVisible1:false,
      form1: {
         basesalary:null,
      },
      formLabelWidth1: '120px',
      myIndex:null,
      myRow:null,
    };
  },

  created() {
    var currentDate=this.getFormatDate();
    this.getSalary(currentDate);
  },

  mounted() {
    //this.dataSource = response.data.all;
    //  this.drawLine();
  },

  methods: {
    getSalary(currentDate) {
      this.axios.post('http://10.86.2.14:80/json/order/salarylistBymonth',
      {
        date1:currentDate
      })
				.then(res => {
            
            this.dataSource=res.data.list;
            //this.dataSource=res.data.list.iStaff.name;
            for(let i=0;i<res.data.list.length;i++){
                this.$set(this.dataSource[i],'name',res.data.list[i].iStaff.name);
                this.$set(this.dataSource[i],'typename',res.data.list[i].iStaff.typename);
						}
            
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

    handleEdit() {
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
          var currentDate=this.getFormatDate();
          this.getSalary(currentDate);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
      
      this.dialogFormVisible=false;
    },
    // handleUpdate1(index, row){
    //   console.log(this.myIndex,this.myRow);

    //   this.axios.post('http://10.86.2.14:80/json/order/modifyBaseSalary',
    //   {
    //     "id":this.row.id,
    //     "basesalary":this.form1.basesalary,
        
    //   })
		// 		.then(res => {
		// 		})
		// 		.catch(error => {
		// 			console.log(error);
		// 			alert('网络错误，不能访问');
    //     })
    //   this.$set(this.dataSource[this.myIndex],'basesalary',this.form1.basesalary);
    //   this.dialogFormVisible1=false;
    // },
    //  drawLine(){
    //     // 基于准备好的dom，初始化echarts实例
    //     let myChart = this.$echarts.init(document.getElementById('myChart'))
    //     // 绘制图表
    //     myChart.setOption({
    //         title: { text: '在Vue中使用echarts' },
    //         tooltip: {},
    //         xAxis: {
    //             data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20]
    //         }]
    //     });
    // },
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
