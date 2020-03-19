<template>
    <div class="shadow-sm py-2 h-100 text-center">
      <div class="title">
<!--        <h5 v-cut-title></h5>-->
        <router-link tag="h5" :to="{path: `movie/${movieInfo.idIMDB}`}">{{movieInfo.title}}</router-link>
      </div>
      <div>
        <img class="image w-75" :src="movieInfo.urlPoster" alt="moviePoster">
        <div>
          <span><strong>Rating: {{movieInfo.rating}}</strong></span>
          <br>
          <span><strong>Year: {{movieInfo.year}}</strong></span>
        </div>
      </div>
      <div>
        <b-btn variant="outline-warning" @click="addToFavorite(movieInfo)">To favorite</b-btn>
      </div>
    </div>
</template>

<script>
  export default {
    name: "MovieItemComponent",
    props: {
      movieInfo: Object
    },
    methods: {
      addToFavorite(item){
        this.$emit('makeToast', item);
        this.$store.dispatch('addToFavourite', item.idIMDB)
      },
    }
  }
</script>

<style scoped>

</style>