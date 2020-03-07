<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/favorite">Favorites</router-link> |
      <router-link to="/chart">Chart</router-link>
    </div>
    <div v-if="movieList.length">
      <router-view/>
    </div>
    <div v-else class="spinner-border text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
  import {mapState} from  'vuex'
  export default {
    methods: {
      fetchMovies() {
        this.$store.dispatch('loadMovieList')
      }
    },
    computed: {
      ...mapState(['movieList'])
    },
      mounted() {
        this.fetchMovies()
      }
  }
</script>
