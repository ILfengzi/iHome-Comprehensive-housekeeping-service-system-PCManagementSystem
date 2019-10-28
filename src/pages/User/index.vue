<template>
  <div class="User-page">
    <!-- 基于element的标签页表格组合 -->
    <TabTable />
  </div>
</template>
<script>
import TabTable from './components/TabTable';
export default {
  name: 'User',
  components: {
    TabTable,
  },
};
</script>
