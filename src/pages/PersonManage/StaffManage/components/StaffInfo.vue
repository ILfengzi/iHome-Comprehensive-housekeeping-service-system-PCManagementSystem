<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-31 14:56:29
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-31 21:43:42
 -->
<template>
  <div v-loading="loading">
    <el-row>
      <el-card header="基本信息">
        <p>姓名:{{staff.name}}</p>
        <p>性别:{{staff.sex}}</p>
        <p>手机号:{{staff.phone}}</p>
        <p>详细服务:{{staff.detailtypeId}}</p>
      </el-card>
      <el-card header="身份证">
        
        <FileUpload :src="staff.idCard" @uploaded="uploaded"  :action='url + "/0"'></FileUpload>
      </el-card>
      <el-card header="从业资格证">
      
        <FileUpload :src="staff.qualification" @uploaded="uploaded"  :action='url + "/1"'></FileUpload>
      </el-card>
      <el-card header="健康证">
     
        <FileUpload :src="staff.health" @uploaded="uploaded"  :action='url + "/2"'></FileUpload>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import FileUpload from "@/components/FileUpload";
export default {
  data() {
    return {
      staff: {},
      loading:true,
      getDataMethod:null,
      url: "/json/staff/uploadFile/"
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.getDataMethod = this.getData(id)
    this.url += id
    this.getDataMethod()
   
  },
  methods: {
    uploaded(){
      this.getDataMethod()
    },
    getData(id){
      return ()=>{
        this.loading = true
      this.axios.get("/json/staff/getOne/" + id).then((res)=>{
        if(res.data.code == 200){
          this.staff = res.data.data
        }else{
          this.$message({
            message: '获取数据失败',
            type: 'warning'
          });
        }
        this.loading = false
      }).catch(_=>{
        this.$message({
          message: '网络连接错误',
          type: 'error'
        });
        this.$router.push("*")
      })

      }
    },
  },
  components: {
    FileUpload
  }
};
</script>