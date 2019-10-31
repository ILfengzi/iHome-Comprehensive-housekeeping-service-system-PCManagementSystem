<template>
  <div class="tab-table">
    <basic-container>
      <el-tabs v-model="tabKey" @tab-click="handleClick">
        <el-tab-pane 
          :label="'全部工具'"
          :name="'all'"
          :key="'all'">
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
        <el-tab-pane
          v-for="tab in tabs"
          :label="tab.tab"
          :name="tab.key"
          :key="tab.key">          
          <el-table
            :data="dataSource1"
            style="width: 100%">
            <el-table-column
              v-for="item,index in columns1"
              :label="item.title"
              :prop="item.dataIndex"
              :key="item.key"
              :width="item.key !== 'action' ? (item.width || 150) : item.width">
              <template slot-scope="scope">
                <span v-if="item.key !== 'action'">{{scope.row[item.dataIndex]}}</span>
                <span v-else>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit1(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background @current-change="pageChange" :total="total" :page-size="pageSize" :current-page="pageNum" layout="prev, pager,next,jumper"></el-pagination>
        </el-tab-pane>
        <el-tab-pane 
          :label="'添加工具'"
          :name="'4'"
          :key="'4'"
          >
        <!-- Form1 用于添加工具-->
        <el-form :model="form1" ref="form1">
        <el-form-item label="工具名称" :label-width="formLabelWidth1" prop="tname">
          <el-input v-model="form1.tname" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="服务项目" :label-width="formLabelWidth1" prop="detailtypeId">
          <el-select v-model="form1.detailtypeId" clearable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.typename"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工具数量" :label-width="formLabelWidth1" prop="tcount">
          <el-input v-model="form1.tcount" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth1">
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
   <!-- Form 用于修改工具详情-->
    <el-dialog title="修改工具详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工具名" :label-width="formLabelWidth">
          <el-input  v-model="form.tname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="工具数量" :label-width="formLabelWidth">
          <el-input  v-model="form.tcount" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- Form2 用于修改工具借用数量、状态-->
    <el-dialog title="修改工具借用状态" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <!-- <el-form-item label="工具数量" :label-width="formLabelWidth2">
          <el-input  v-model="form2.count" autocomplete="off" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="状态" :label-width="formLabelWidth2" prop="state">
          <el-select v-model="form2.state" clearable placeholder="请选择">
            <el-option
                v-for="item in options1"
                :key="item.key"
                :label="item.label"
                :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate1()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import { stat } from 'fs';


export default {
  components: {
    BasicContainer
    
  },
  name: 'TabTable',

  data() {
    return {
      tabKey: 'all',
      dataSource:[],
      dataSource1:[],
      value:null,
      options1:[
        {
          key:0,
          label:'待领取',
        },
        {
          key:1,
          label:'使用中',
        },
        {
          key:2,
          label:'已归还',
        },
        {
          key:3,
          label:'损坏',
        },
      ],
      form1: {
          tname: null,
          tcount: null,
          detailtypeId:null,
      },
      formLabelWidth1: '300px',
      form2: {
          count:0,
          state:0,
      },
      formLabelWidth2: '120px',
      dialogFormVisible2: false,
      tabs: [
        //{ tab: '全部工具', key: 'all' },
        { tab: '待领取', key: '0'},
        { tab: '使用中', key: '1'},
        { tab: '已归还', key: '2'},
        { tab: '损坏', key: '3'},
      ],
      columns: [
        {
          title:'工具名',
          dataIndex:'tname',
          key:'tname',
        },
        {
          title: '工具数量',
          dataIndex: 'tcount',
          key: 'tcount',
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      columns1: [
        {
          title:'订单ID',
          dataIndex:'orderId',
          key:'orderId',
        },
        {
          title: '员工名',
          dataIndex: 'staffname',
          key: 'staffname',
        },
        {
          title: '工具名',
          dataIndex: 'tname',
          key: 'tname',
        },
        {
          title: '借用数量',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      visible: false,
      dialogFormVisible: false,
      form: {
          tname:"",
          tcount:0,
      },
      formLabelWidth: '120px',
      options:[],
      toolId:0,
      toolRecordId:0,
			pageSize:6,
			pageNum:1,
			total:0,

    };
  },

  created() {
    this.getAllTools();
  },

  mounted() {
    //this.dataSource = response.data.all;
  },

  methods: {
    getAllTools() {
      this.axios.get('/json/tool/alltool')
				.then(res => {
            this.dataSource=res.data.iToolList;
            //this.dataSource=res.data.list.iStaff.name;
					  //console.log(res.data);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
				
    },
    getToolsRecord(state,pageNum,pageSize) {
      //console.log(state);
      this.axios.post('/json/tool/alltoolrecord',
      {
        "state":state,
        "pageNum":pageNum,
        "pageSize":pageSize,
      })
				.then(res => {
            console.log(res);
            //console.log(this.dataSource1);
            this.dataSource1=res.data.pages.list;
            if(res.data.pages.list.length!=0){
              for(let i=0;i<res.data.pages.list.length;i++){
                  this.$set(this.dataSource1[i],'tname',res.data.pages.list[i].iTool.tname);
              }
             
            }
            this.pageNum=res.data.pages.pageNum;
            this.pageSize=res.data.pages.pageSize;
            this.total=res.data.pages.total;
            //console.log(state);
            
            // if(state==0){
            //   this.tabKey='0';
            // }else if(state==1){
            //   this.tabKey='1';

            // }else if(state==2){
            //  this.tabKey='2';

            // }else if(state==3){
            // this.tabKey='3';
            // }
            //this.tabKey=state;
           // console.log(res.data.iToolrecordList);
				})
				// .catch(error => {
				// 	//console.log(error);
				// 	alert('网络错误，不能访问1');
        // })
        
				//console.log(this.dataSource1);
    },
    handleClick(tab) {
      if(tab.label=='全部工具'){

        this.getAllTools();

      }else if(tab.label=='待领取'){
        //console.log(0);
        this.getToolsRecord(0,1,this.pageSize);
      }
      else if(tab.label=='使用中'){
        //console.log(1);
        this.getToolsRecord(1,1,this.pageSize);
      }else if(tab.label=='已归还'){
        //console.log(2);
        this.getToolsRecord(2,1,this.pageSize);
      }else if(tab.label=='损坏'){
        //console.log(3);
        this.getToolsRecord(3,1,this.pageSize);
      }else{
        this.axios.post('/json/order/selectBytypename',
      {
        
      })
				.then(res => {
          this.options=res.data.listd;
          
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
      }
    },
    handleUpdate(tab){
      this.axios.post('/json/tool/updatetool',
      {
        "id":this.toolId,
        "tname":this.form.tname,
        "tcount":this.form.tcount
      })
				.then(res => {
          this.getAllTools();
          //console.log(this.dataSource);
				})
				.catch(error => {
					//console.log(error);
					alert('网络错误，不能访问');
      })
      this.dialogFormVisible=false;
      //tab.$index=0;
      this.tabKey='all';
      //this.tab.index="0";
    },

    handleUpdate1(tab){
      //console.log(this.form2);
      this.axios.post('/json/tool/updatetoolrecord',
      {
        "id":this.toolRecordId,
        "state":this.form2.state,
        //"count":this.form2.count
      })
				.then(res => {
          //console.log(this.toolRecordId,this.form2.state,this.form2.count);
          if(this.form2.state==0){
            this.getToolsRecord(0,1,this.pageSize);
            
          // console.log(this.dataSource1,222);
            this.tabKey='0';
          }else if(this.form2.state==1){
            //this.dataSource=[],
            this.getToolsRecord(1,1,this.pageSize);
            
            //console.log(this.dataSource1,222);
            this.tabKey='1';

          }else if(this.form2.state==2){
          
            this.getToolsRecord(2,1,this.pageSize);
          
           this.tabKey='2';

          }else if(this.form2.state==3){
          
          this.getToolsRecord(3,1,this.pageSize);
          //console.log(this.dataSource1,222);
          this.tabKey='3';

          }
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
      })
      
      this.dialogFormVisible2=false;
      

    },
    onSubmit(){
      //console.log(this.form1.detailtypeId);
      this.axios.post('/json/tool/addtool',
      {
        
        "tname":this.form1.tname,
        "detailtypeId":this.form1.detailtypeId,
        "tcount":this.form1.tcount
      })
				.then(res => {
          this.getAllTools();
          //console.log(this.dataSource);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
        
        this.tabKey='all';
    },
     resetForm() {
        this.$refs['form1'].resetFields();
    },
    handleEdit(index, row) {
      //console.log(row);
      this.toolId=row.id
      this.dialogFormVisible=true;
      this.form.tname=row.tname;
      this.form.tcount=row.tcount;
    },
    handleEdit1(index, row) {
      //console.log(row);
      this.toolRecordId=row.id;
      //console.log(this.toolRecordId);
      this.dialogFormVisible2=true;
      this.form2.state=row.state;
      this.form2.count=row.count;
     
    },
    handleDelete1(index, row){
      this.axios.post('/json/tool/deletetoolrecord',
      {
        "itoolrecordid":row.id
      })
				.then(res => {
          this.getToolsRecord(row.state,1,this.pageSize);
          //console.log(this.dataSource);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
    },
    pageChange(val){
        console.log(val);
      	if(this.tabKey=='0'){
          this.getToolsRecord(0,val,this.pageSize);
        }else if(this.tabKey=='1'){
          this.getToolsRecord(1,val,this.pageSize);
        }else if(this.tabKey=='2'){
          this.getToolsRecord(1,val,this.pageSize);
        }else if(this.tabKey=='3'){
          this.getToolsRecord(1,val,this.pageSize);
        }
    }
  },
}

</script>
 
<style>
  .tab-table {

  }
</style>
