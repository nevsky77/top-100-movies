<template>
  <div v-if="movieListForChart.length">
    <d3-force-component :movieList="arrayToObject"></d3-force-component>
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
      arrayToObject(){
        debugger
        const newArray = this.movieListForChart.map((item) => {
          let movieArray = item.reduce((result, current) => {
            debugger
            let movieInfoData = {
              name: current.title,
              amount: 3,
              color: '#00a03e',
              movieInfo: current
            }
            result.decade = current.year
            result.movies.push(movieInfoData)
            debugger
            return result
          }, {decade: '', movies: []});
          debugger
          return movieArray;
        });
        console.log('reduce', newArray)
        debugger
        return newArray
      },
      numberTopMovieInDecade() {
        const count = this.movieListForChart.map((item) => {
          let movieInfoArray = item.map(a => {
            let movieInfo = {
              name: a.title,
              year: a.year,
              amount: 3,
              color: '#00a03e'
            }
            return movieInfo
          })
          console.log('movieInfoArray',movieInfoArray)
          return movieInfoArray
        });
        return count
      }
    }
  }
</script>