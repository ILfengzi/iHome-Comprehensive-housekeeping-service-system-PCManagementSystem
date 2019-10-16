<template>
  <div className="fixed-table">
    <basic-container>
      <el-table
      :data="tableData"
      style="width: 100%"
      height="100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <!-- <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="detail"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container'

  export default {
  components: { BasicContainer },
  name: 'FixedTable',

  data() {
    return {
      tableData3
    }
  },
  created:{

  },
  methods: {
    getUser() {
			
			this.axios.get('json/administrativestructure/department/listLikeDepartmentName/')
				.then(res => {
					  // this.tableData3 =res.data;
            console.log(error);
				})
				.catch(error => {
					console.log(error);
					alert('网络错误，不能访问');
		
				})
				
		},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style>
  .fixed-table {

  }
</style>
