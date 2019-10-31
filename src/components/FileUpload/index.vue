<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-31 09:56:31
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-31 21:53:05
 -->
<template>
  <div>
    <el-upload
      :on-success="onSuccess"
      ref="upload"
      :action="action"
      :limit="1"
      :file-list="filelist"
      accept=".png.jpg.gif.jpeg"
      v-loading="loading"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="src!=''" :src="src" />
      <el-button v-else :type="but.type" ><i :class="but.icon"></i>{{but.msg}}</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  props:{
    action: {
      type:String,
    },
    src:{
      type:String
    }
  },
  data() {
    return {
      filelist: [],
      loading:false,
      but:{
        icon:"el-icon-upload",
        disabled:false,
        type:"primary",
        msg:"上传文件",
      },
      buts:{
        success:{
          icon:"el-icon-success",
          disabled:true,
          type:"success",
          msg:"上传成功"
        },
        normal:{
          icon:"el-icon-upload",
          disabled:false,
          type:"primary",
          msg:"上传文件"
        },
        fail:{
          icon:"el-icon-error",
          disabled:false,
          type:"danger",
          msg:"上传失败,请重新上传"
        }
      }
    };
  },
  methods: {
    fileUpload() {
      this.$refs.upload.submit();
    },
    onSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.but = this.buts["success"]
        this.$emit("uploaded")
        this.filelist = []
      } else {
        this.$message({
          message: res.data,
          type: "warning"
        });
        this.but = this.buts["fail"]
      }
      this.loading = false
    },
    beforeUpload(file){
      this.loading = true
    }
  }
};
</script>
