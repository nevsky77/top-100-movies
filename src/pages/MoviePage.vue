<template>
  <div>
    <div>
      <img :src="movieInfo.urlPoster" alt="moviePoster">
      <div>
        <span><strong>Rating: {{movieInfo.rating}}</strong></span>
        <br>
        <span><strong>Year: {{movieInfo.year}}</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "FilmComponent",
    computed: {
      movieInfo(){
        return this.$store.getters.getMovieById(this.$route.params.id);
      }
    },
    mounted() {
      console.log('movie component', this.$route.params.id)
      console.log('getMovieById', this.getMovieById)
    }
  }
</script>

<style scoped>

</style>