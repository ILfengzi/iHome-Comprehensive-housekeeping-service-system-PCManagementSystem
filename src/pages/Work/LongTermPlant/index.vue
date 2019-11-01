<template>
	<div>
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
				    @click="handleAdd(scope.$index, scope.row)">添加员工</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
		  <!-- <el-card header="健康证">
     
        	<FileUpload :action='url'></FileUpload>
      	  </el-card>  -->
		<el-pagination background @current-change="pageChange" :total="total" :page-size="pageSize" :current-page="pageNum" layout="prev, pager,next,jumper"></el-pagination>
		<el-dialog title="添加员工" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="员工" :label-width="formLabelWidth" prop="staffId">
					<el-select v-model="form.staffId" clearable placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="员工工资" :label-width="formLabelWidth" prop="salary">
					<el-input v-model="form.salary" autocomplete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="工作月数" :label-width="formLabelWidth" prop="month">
					<el-input v-model="form.month" autocomplete="off" clearable></el-input>
				</el-form-item>
				<el-form-item label="上传相关文件" :label-width="formLabelWidth">
					<el-upload
						v-model="form.aboutFile"
						ref="upload"
						:action="'/json/longTermOrder/fileUpload'"
						:limit="1"
						:file-list="filelist"
						accept=".png.jpg.gif.jpeg"
						v-loading="loading"
						:show-file-list="true"
						:on-success="onSuccess"
					>
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdate()">确 定</el-button>
			</div>
   		</el-dialog>
		<!-- <el-button @click="dialogFormVisible = true"></el-button> -->
	</div>
</template>
<script>
	import FileUpload from "@/components/FileUpload";
	
	export default {
		 props:{
			action: {
				type:String,
			}
   		 },
		components: {
    		FileUpload
 		},
		name: "longTermPlant",
		// created() {
    	// 	this.getLongTermOrder(0);
  		// },
		mounted(){

			this.getLongTermOrder(0,this.pageNum,this.pageSize);
		},
		data() {
			return {
				filelist: [],
      			loading:false,
				dataSource: [],
				page: {
					total: 0,
				},
				columns: [
					{
					title:'订单ID',
					dataIndex:'id',
					key:'id',
					},
					{
					title: '服务项目',
					dataIndex: 'typename',
					key: 'typename',
					},
					{
					title: '操作',
					dataIndex: 'action',
					key: 'action',
					},
				],
				isDisabled:false,
				dialogFormVisible: false,
				form: {
					staffId:null,
					salary:null,
					month:null,
					aboutFile:null,
				},
				formLabelWidth: '120px',
				options:[],
				orderId:0,
				pageSize:6,
				pageNum:1,
				total:0,
				url: "/json/longTermOrder/fileUpload/"
			}
		},
		methods: {
			getLongTermOrder(state,pageNum,pageSize){
				this.axios.post('/json/order/listByType',{
					"state":state,
					"pageSize": pageSize,
					"pageNum":pageNum,
					
				}).then((res) => {
					
					console.log(res);
					this.dataSource = res.data.orderList.list;
					if(res.data.orderList.list.length!=0){
					for(let i=0;i<res.data.orderList.list.length;i++){
						this.$set(this.dataSource[i],'typename',res.data.orderList.list[i].detailtype.typename);
					}
					}
					this.pageNum=res.data.orderList.pageNum;
					this.pageSize=res.data.orderList.pageSize;
					this.total=res.data.orderList.total;

					//this.total = res.data.data.total
				})
			},
			getLongTermFreeWorkers(){
				this.axios.get('/json/longTermOrder/selectLongTerm'
					).then((res) => {
					
					console.log(res);
					this.options =res.data.iStaffList;
					
					//this.total = res.data.data.total
				})
			},
			handleAdd(index,row){
				this.getLongTermFreeWorkers();
				this.dialogFormVisible=true;
				this.orderId=row.id;
			},
			handleUpdate(){
				//this.$refs.upload.submit();
				this.axios.post('/json/order/addLongOrderDetail',{
					"orderId":this.orderId,
					"staffId":this.form.staffId,
					"salary":this.form.salary,
					"month":this.form.month,
					"aboutFile":this.aboutFile

				}
					).then((res) => {
					this.dialogFormVisible=false;
					this.getLongTermOrder(0,1,this.pageSize);
					this.$refs['form'].resetFields();
					//this.total = res.data.data.total
				})
				console.log(this.form);
			},
			pageChange(val){
				this.getLongTermOrder(0,val,this.pageSize);
			},
			onSuccess(response, file, fileList){
				//console.log(response, file, fileList);
				this.aboutFile=response;
			}
		},
	}
</script>

<style>
</style>
