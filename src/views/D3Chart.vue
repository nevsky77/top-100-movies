<template>
  <div v-if="movieListForChart.length">
    <d3-force-component :movieList="movieInDecade"></d3-force-component>
  </div>
  <div v-else class="spinner-border text-success" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
  import D3ForceComponent from "../components/D3ForceComponent";
  import {mapState} from "vuex";
  export default {
    name: "D3Chart",
    components: {D3ForceComponent},
    computed: {
      ...mapState(['movieListForChart']),
      movieInDecade(){
        const newArray = this.movieListForChart.map((item) => {
          let movieArray = item.reduce((result, current) => {
            let movieInfoData = {
              name: current.title,
              amount: 3,
              color: '#00a03e',
              movieInfo: current
            }
            result.decade = current.decade
            result.name = current.decade
            result.elements.push(movieInfoData)
            result.amount = result.elements.length
            return result
          }, {decade: 'Decade', name: 'Bubble name', amount: 1, color: '#00a03e', elements: [],/*children: []*/});
          return movieArray;
        });
        console.log('BeforeChange', this.movieListForChart)
        console.log('AfterChange', newArray)
        return newArray
      }
    }
  }
</script>