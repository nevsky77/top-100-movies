<template>
  <div>
  <div v-if="!favoriteList.length" class="text-center"><h3>Favorite list is empty</h3><router-link to="/" tag="a">Add new</router-link></div>
   <div class="home" v-else>
     <div v-for="movie in favoriteList"
          :key="movie.idIMDB"
     >
       <div class="shadow-sm py-2">
         <div class="title py-2">
           <h5 v-cut-title>{{movie.title}}</h5>
         </div>
         <div>
           <img class="image w-75" :src="movie.urlPoster" alt="moviePoster">
           <div>
             <span><strong>Rating: {{movie.rating}}</strong></span>
             <br>
             <span><strong>Year: {{movie.year}}</strong></span>
           </div>
         </div>
         <div>
           <b-btn variant="outline-danger" @click="removeMovie(movie)">Delete</b-btn>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
  // @ is an alias to /
  import {mapState} from 'vuex'
  export default {
    name: 'favourite',
    data () {
      return {
        posterUrl: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/',
      }
    },
    computed: {
      ...mapState(["favoriteList"]),
    },
    methods: {
      makeToast(item) {
        this.$bvToast.toast(`Movie ${item.title} was successfully deleted.`, {
          title: 'Done',
          autoHideDelay: 5000,
        })
      },
      removeMovie(item) {
        this.makeToast(item)
        this.$store.dispatch('removeFromFavourite', item.idIMDB)
      }
    }
  }
</script>
<style lang="scss">
  .home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
  }
  .image {
    max-height: 300px;
    height: 100%;
  }
  .favourite-icon {
    background-color: yellow;
    cursor: pointer;
    font-size: 50px;
  }
  @media (max-width: 768px) {
    .home {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 576px) {
    .home {
      grid-template-columns: 1fr;
    }
  }
</style>