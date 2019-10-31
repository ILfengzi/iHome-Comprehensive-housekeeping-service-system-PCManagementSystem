<template>
  <div class="tab-table">
    <basic-container>
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
                    @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </span> 
              </template>
            </el-table-column>
          </el-table>
    </basic-container>
   <!-- 表格 用于显示用户地址-->
    <el-dialog title="地址" :visible.sync="dialogTableVisible" width="800px">
      
      <el-table
            :data="dataSource1"
            style="width: 100%">
            <el-table-column
              v-for="item,index in columns1"
              :label="item.title"
              :prop="item.dataIndex"
              :key="item.key"
              :width="(item.key !== 'detail' ? (item.width || 110) : item.width)
              ||(item.key === 'detail' ? (item.width || 300) : item.width)"
              
              >
            </el-table-column>
        </el-table>
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
      dataSource1:[],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '地址及联系方式',
          key: 'action',

        },
      ],
      columns1: [
        {
          title: '联系人',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '联系人电话',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '省份',
          dataIndex: 'province',
          key: 'province',
        },
        {
          title: '城市',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: '详细地址',
          dataIndex: 'detail',
          key: 'detail',
        },
        
      ],
      value:null,
      visible: false,
      dialogTableVisible: false,
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
      this.axios.post('http://10.86.2.14:80/json/user/selectAllUser',{})
				.then(res => {
            this.dataSource=res.data.userList;
            //console.log(res.data.userList);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
				})
				
    },
    handleEdit(index, row) {
      //console.log(row);
      this.axios.post('http://10.86.2.14:80/json/user/selectUserAddress',{"userId":row.id})
				.then(res => {
            this.dataSource1=res.data.addressList;
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
        })
        this.dialogTableVisible=true;
        
    },
   
  },
}

</script>
 
<style>
  .tab-table {

  }
</style>
