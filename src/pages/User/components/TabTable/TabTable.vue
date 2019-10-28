<template>
  <div class="tab-table">
    <basic-container>
       <el-table
      :data="dataSource"
      style="width: 100%"
      height="100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column label="常用地址及联系方式" width="120">
           <template slot-scope="scope1">
            <el-button
              size="mini"
              @click="handleEdit(scope1.$index, scope1.row)">详情</el-button>
            </template>
        </el-table-column>
      </el-table>
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
     
      dataSource:[],
      value:null,
      dialogFormVisible2: false,
      visible: false,
      dialogFormVisible: false,
      form: {
          tname:"",
          tcount:0,
      },
      formLabelWidth: '120px',
    };
  },

  created() {
    this.getUsers();
  },

  mounted() {
    //this.dataSource = response.data.all;
  },

  methods: {
     getUsers() {
      this.axios.get('http://10.86.2.14:80/json/user/selectUsers')
				.then(res => {
            this.dataSource=res.data.userList;
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
				
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
  },
}

</script>
 
<style>
  .tab-table {

  }
</style>
