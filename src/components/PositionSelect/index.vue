<!--
 * @Author: qiaoge2333
 * @Date: 2019-10-30 08:39:59
 * @LastEditors: qiaoge2333
 * @Description: 这个乔哥搞得
 * @LastEditTime: 2019-10-30 14:44:23
 -->
<template>
  <el-form-item  label="职位" :prop="prop">
    <el-select v-if="options != null"  v-model="positionId" placeholder="请选择你的职位">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  props: {
    prop: {
      type: String
    },
    value:{
      type:Number
    },
  },
  data() {
    return {
      positionId: this.value,
      options: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios
        .get("/json/other/getPositions")
        .then(res => {
          if (res.data.code == 200) {
            this.options = res.data.data;
            this.$emit("dataGet", true);
          } else {
            this.$emit("dataGet", false);
          }
        })
        .catch(_ => {
          this.$emit("dataGet", null);
        });
    }
  },
  watch: {
    value(val){
      this.positionId = val;
    },
    positionId(val) {
      this.$emit("input", val);
    }
  }
};
</script>