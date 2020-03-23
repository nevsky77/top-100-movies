<template>
  <div class="movie-page-wrap">
      <img class="mr-5" :src="movieInfo.urlPoster" alt="moviePoster">
      <div>
        <span class="text-center d-block"><strong>{{movieInfo.title}}</strong></span>
        <br>
        <span><strong>Rating: {{movieInfo.rating}}</strong></span>
        <br>
        <span><strong>Year: {{movieInfo.year}}</strong></span>
        <br>
        <span><strong>Genres:</strong> <strong v-for="genre in movieInfo.genres">{{genre}} </strong>.</span>
        <br>
        <p>{{movieInfo.plot}}</p>
      </div>
  </div>
</template>

<script>
  export default {
    name: "FilmComponent",
    computed: {
      movieInfo(){
        return this.$store.getters.getMovieById(this.$route.params.id);
      }
    }
  }
</script>

<style scoped lang="scss">
  .movie-page-wrap {
    display: flex;
    padding: 0 25px;
  }
</style>