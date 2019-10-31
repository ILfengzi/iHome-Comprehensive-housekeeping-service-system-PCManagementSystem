<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-31 14:56:29
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-31 17:04:27
 -->
<template>
  <div>
    <el-row>
      <el-card header="基本信息">
        <p>姓名:{{staff.name}}</p>
        <p>性别:{{staff.sex}}</p>
        <p>手机号:{{staff.phone}}</p>
        <p>详细服务:{{staff.detailtypeId}}</p>
      </el-card>
      <el-card header="身份证">
        
      </el-card>
      <el-card header="从业资格证">

      </el-card> 
      <el-card header="健康证">
          <FileUpload action=""></FileUpload>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import FileUpload from '@/components/FileUpload'
export default {
mounted() {
  this.axios.get("" + id).then((res) =>{
    if(res.data.code == 200){
     this.staff = res.data.data
    }
  })
},
components:{
  FileUpload
},
}
</script>