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
              :width="item.key === 'solve' ? (item.width || 300) : item.width">
              <template slot-scope="scope">
                <span v-if="item.key !== 'cstatus'">{{scope.row[item.dataIndex]}}</span>
                <!-- <edit-dialog :row="scope.row" :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleMod="handleMod"></edit-dialog>
                <delete-balloon :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleRemove="handleRemove"></delete-balloon> -->
                <span v-else-if="scope.row[item.dataIndex]!='1'">
                  <el-button
                    size="medium"
                    key="0"
                    type="warning"
                    
                    @click="handleEdit(scope.$index, scope.row)">待处理</el-button>
                </span>
                <span v-else>
                  <el-button
                    size="medium"
                    key="1"
                    type="primary"
                    disabled
                    >已处理</el-button>
                </span>
              </template>
            </el-table-column>
            
          </el-table>
          <el-pagination background @current-change="pageChange" :total="total" :page-size="pageSize" :current-page="pageNum" layout="prev, pager,next,jumper"></el-pagination>
        </el-tab-pane>
        <el-tab-pane 
          :label="'新建投诉记录'"
          :name="'2'"
          :key="'2'"
          tab-position="right">
        <el-form :model="form1" ref="form1">
        <el-form-item label="订单id" :label-width="formLabelWidth1" prop="orderId">
          <el-input v-model="form1.orderId" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="投诉问题" :label-width="formLabelWidth1" prop="complaint">
          <el-input v-model="form1.complaint" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth1">
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
   <!-- Form -->
    <el-dialog title="填写投诉处理方案" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="处理方案" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.solve" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate()">确 定</el-button>
      </div>
    </el-dialog>
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
      form1: {
          orderId: null,
          complaint: null,
          
      },
      formLabelWidth1: '300px',
      tabs: [
        { tab: '全部', key: 'all' },
        { tab: '待处理', key: '0 '},
        { tab: '已处理', key: '1'},
      ],
      columns: [
        {
          title:'订单ID',
          dataIndex:'orderId',
          key:'orderId',
        },
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
          dataIndex: 'cstatus',
          key: 'cstatus',
        },

        // {
        //   title: '操作',
        //   key: 'action',
        // },
      ],
      visible: false,
      dialogFormVisible: false,
      form: {
          solve:"",
          
      },
      formLabelWidth: '120px',
      options:[],
      complaintId:0,
      pageSize:6,
			pageNum:1,
			total:0,
    };
  },

  created() {
   
    this.getAllComplaint(this.pageNum,this.pageSize);
  },

  mounted() {
    //this.dataSource = response.data.all;
  },

  methods: {
    getAllComplaint(pageNum,pageSize) {
      this.axios.post('/json/Complaint/selectComplaintByStatus',
      {
        "pageNum":pageNum,
        "pageSize":pageSize
      })
				.then(res => {
            console.log(res);
            this.dataSource=res.data.pages.list;
            this.pageNum=res.data.pages.pageNum;
            this,pageSize=res.data.pages.pageSize;
            this.total=res.data.pages.total;
            //console.log(this.total);
            
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
				
    },
    getComplaintByCstatus(cstatus,pageNum,pageSize) {
      this.axios.post('/json/Complaint/selectComplaintByStatus',
      {
        "cstatus":cstatus,
        "pageNum":pageNum,
        "pageSize":pageSize
      })
				.then(res => {
            this.dataSource=res.data.pages.list;
            this.pageNum=res.data.pages.pageNum;
            this.pageSize=res.data.pages.pageSize;
            this.total=res.data.pages.pages;
            console.log(this.total);
            //this.dataSource=res.data.list.iStaff.name;
					  //console.log(res.data);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
				
    },
    handleClick(tab) {
      //console.log(tab);
      if(tab.label=='全部')
      {
        this.getAllComplaint(1,this.pageSize);
        //console.log(tab);
      }else if(tab.label=='待处理'){
        this.getComplaintByCstatus(0,1,this.pageSize);
        //console.log(tab);
      }
      else{
        this.getComplaintByCstatus(1,1,this.pageSize);
        //console.log(2);
      }
    },
    handleUpdate(tab){
      //console.log(this.form);
      this.axios.post('/json/Complaint/solveComplaint',
      {
        "id":this.complaintId,
        "solve":this.form.solve,
        "cstatus":1
      })
				.then(res => {
          this.getAllComplaint(1,this.pageSize);
          //console.log(this.dataSource);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
      this.dialogFormVisible=false;
      //tab.$index=0;
      this.tabKey='all';
      //this.tab.index="0";
      
      
    },
    onSubmit(){
      this.axios.post('/json/Complaint/addComplaint',
      {
        
        "orderId":this.form1.orderId,
        "complaint":this.form1.complaint,
        "cstatus":0
      })
				.then(res => {
          this.getAllComplaint(1,this.pageSize);
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
      this.complaintId=row.id
      this.dialogFormVisible=true;

    },
   pageChange(val){
				console.log(val)
				if(this.tabKey=='all'){
          this.getAllComplaint(val,this.pageSize);
        }else if(this.tabKey=='0'){
          this.getComplaintByCstatus(0,val,this.pageSize);
        }else{
          this.getComplaintByCstatus(1,val,this.pageSize);
        }

			},
  },
}

</script>
 
<style>
  .tab-table {

  }
</style>
