<template>
  <div>
    <div class="d-flex flex-column align-items-center">

      <div class="form-group">
        <label for="exampleFormControlSelect1">Sort movies by decades</label>
        <select @input="sortByDecade($event.target.value)" class="form-control" id="exampleFormControlSelect1">
          <option v-for="o in decades" :value="o.value">{{o.name}}</option>
        </select>
      </div>
<!--      <button-->
<!--        type="button"-->
<!--        class="btn btn-outline-secondary"-->
<!--        variant="primary"-->
<!--        @click="reverseMoviesList">Sort: <span class="caret" :class="{'caret-down': caretReverse}"></span>-->
<!--      </button>-->
    </div>

    <hr class="py-2">


    <template v-if="sortedMovieList.length">
      <div class="home">
        <movie-item-component
          v-for="movie in items"
          :key="movie.idIMDB"
          :movieInfo="movie"
          @makeToast="makeToast"
        ></movie-item-component>
      </div>
      <div class="d-flex justify-content-center py-5">
        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="paginateChangeHandler"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-text="'&raquo;'"
          :prev-text="'&laquo;'"
          :container-class="'pagination'"
          :page-link-class="'page-link'"
          :page-class="'page-item'">
        </Paginate>
      </div>
    </template>
    <template v-else>
      <div><h3 class="text-center">Movie list is empty</h3></div>
    </template>
  </div>
</template>
<script>
  // @ is an alias to /src
  import {mapState} from 'vuex'
  import MovieItemComponent from "../components/MovieItemComponent";
  import paginationMixin from '../mixins/pagination.mixin'

  export default {
    name: 'home',
    components: {MovieItemComponent},
    mixins: [paginationMixin],
    data() {
      return {
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
      favoriteList() {
        return this.$store.state.favoriteList
      }
    },
    methods: {
      sortByDecade(value) {
        this.$store.dispatch('sortMovieListByDecades', value)
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
      // sortMoviesList() {
      //   this.caretReverse = !this.caretReverse
      //   this.$store.dispatch('reverseMoviesList')
      // }
    },
    mounted() {
      this.setupPagination(this.sortedMovieList)
    },
    beforeUpdate() {
      this.setupPagination(this.sortedMovieList)
    }
  }
</script>
<style lang="scss">
  .caret {
    margin: 8px;
    border-bottom: 10px solid #42b983;
    border-left: 6px solid rgba(0, 0, 0, 0);
    border-right: 6px solid rgba(0, 0, 0, 0);
    content: "";
    display: inline-block;
    height: 0;
    vertical-align: top;
    width: 0;

    &-down {
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
  .page-link {
    color:#42b983;
  }
  .page-item.active .page-link {
    background-color: #42b983;
    border-color: #42b983;
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
