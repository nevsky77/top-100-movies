<template>
  <div>
    <div class="d-flex flex-column align-items-center">

      <div class="form-group">
        <label for="exampleFormControlSelect1">Sort movies by decades</label>
        <select @input="sortByDecade($event.target.value)" class="form-control" id="exampleFormControlSelect1">
          <option v-for="o in decades" :value="o.value">{{o.name}}</option>
        </select>
      </div>
      <button
        type="button"
        class="btn btn-outline-secondary"
        variant="primary"
        @click="sortMoviesList">Sort: <span class="caret" :class="{'caret-down': caretReverse}"></span>
      </button>
    </div>

    <hr class="py-2">


    <template v-if="sortedMovieList.length">
      <div class="home">
        <div
                v-for="movie in sortedMovieList"
                :key="movie.idIMDB"
        >
          <div class="shadow-sm py-2 h-100">
            <div class="title">
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
              <b-btn variant="outline-warning" @click="addToFavorite(movie)">To favorite</b-btn>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div> <h3 class="text-center">Movie list is empty</h3></div>
    </template>
  </div>
</template>
<style lang="scss">
  .caret{
    margin: 8px;
    border-bottom: 10px solid #42b983;
    border-left: 6px solid rgba(0, 0, 0, 0);
    border-right: 6px solid rgba(0, 0, 0, 0);
    content: "";
    display: inline-block;
    height: 0;
    vertical-align: top;
    width: 0;
    &-down{
      transform: rotate(180deg);
    }
  }
  .home {
    padding: 0 25px;
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
  @media (max-width: 600px) {
    .home {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .home {
      grid-template-columns: 1fr;
    }
  }
</style>
<script>
// @ is an alias to /src
import {mapState} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      urlMoviePoster: 'UY320_CR1,0,220,320_AL_.jpg',
      decades: [
        {
          name: 'All films',
          value: 'all'
        },
        {
          name: '2020',
          value: 2020
        },
        {
          name: '2010',
          value: 2010
        },
        {
          name: '2000',
          value: 2000
        },
        {
          name: '1990',
          value: 1990
        },
        {
          name: '1980',
          value: 1980
        },
        {
          name: '1970',
          value: 1970
        },
        {
          name: '1960',
          value: 1960
        },
        {
          name: '1950',
          value: 1950
        },
        {
          name: '1940',
          value: 1940
        },
        {
          name: '1930',
          value: 1930
        },
        {
          name: '1920',
          value: 1920
        }
      ],
      caretReverse: false,
    }
  },
  computed: {
    ...mapState(['movieList', 'sortedMovieList']),
    posterSize(){
      let a = this.movieList
      return a
    },
    favoriteList() {
      return this.$store.state.favoriteList
    }
  },
  methods: {
    sortByDecade(value){
      this.$store.dispatch('sortMovieListByDecades', value)
    },
    addToFavorite(item){
      this.makeToast(item)
      this.$store.dispatch('addToFavourite', item.idIMDB)
    },
    makeToast(item) {
      let existFilm = this.favoriteList.find(movie => {
        return movie.idIMDB === item.idIMDB
      })
      if (existFilm) {
        this.$bvToast.toast(`Movie ${item.title} has already been added to favorites.`, {
          title: 'Attention',
          autoHideDelay: 5000,
        })

      } else {
        this.$bvToast.toast(`Movie ${item.title} add to favorite.`, {
          title: 'Done',
          autoHideDelay: 5000,
        })
      }
    },
    sortMoviesList(){
      this.caretReverse = !this.caretReverse
      this.$store.dispatch('reverseMoviesList')
    }
  },
}
</script>
