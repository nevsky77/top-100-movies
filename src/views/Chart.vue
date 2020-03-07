<template>
  <div v-if="movieListForChart.length">
    <chart :movieListForChart="movieListForChart"></chart>
  </div>
  <div v-else class="spinner-border text-success" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>
<style>
</style>
<script>
  import {mapState, mapGetters} from 'vuex'
    import Chart from "../components/Chart";
    export default {
      components: {Chart},
      computed: {
        ...mapState(['movieListForChart'])
      }
    }
</script>