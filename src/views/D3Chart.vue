<template>
  <div v-if="movieListForBubble.length">
    <d3-force-component :dataForBubbleChart="dataForBubbleChart"></d3-force-component>
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
      ...mapState(['movieListForBubble']),
      dataForBubbleChart(){
        const newArray = this.movieListForBubble.map((item) => {
          let movieArray = item.reduce((result, current) => {
            let movieInfoData = {
              name: current.title,
              amount: 3,
              color: '#9afbbf',
              movieInfo: current
            }
            result.id = current.id
            result.decade = current.decade
            result.name = current.decade
            result.elements.push(movieInfoData)
            result.amount = result.elements.length
            return result
          }, {decade: 'Decade', id: null, name: 'Empty Bubble', amount: 1, color: '#72c391', elements: [],/*children: []*/});
          return movieArray;
        });
        return newArray
      }
    }
  }
</script>