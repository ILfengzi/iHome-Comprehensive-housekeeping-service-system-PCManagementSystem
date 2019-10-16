<template>
  <div class="User-page">
    <!-- 基于element的标签页表格组合 -->
    <FixedTable />
  </div>
</template>
<script>
import FixedTable from './components/FixedTable';
export default {
  name: 'User',
  components: {
    FixedTable,
  },
};
</script>
