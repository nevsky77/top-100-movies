<template>
  <div v-if="movieListForChart.length">
    <chart :dataForChart="movieListForChart"></chart>
  </div>
  <div v-else class="spinner-border text-success" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>
<style>
</style>
<script>
  import Chart from "../components/Chart";
  import {mapState} from 'vuex'
  export default {
    components: {Chart},
    computed: {
      ...mapState(['movieListForChart'])
    }
  }
</script>