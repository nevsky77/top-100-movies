import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {MOVIE_DB_API_KEY, MOVIE_DB_BASE_URI, VUE_APP_CORS_URL} from "../main";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    movieList: [],
    sortedMovieList: [],
    favoriteList: [],
    movieListForChart: []
  },
  mutations: {
    setMoviesList(state, {movieList}) {
      state.movieList = movieList
    },
    setFavoriteList(state, favouriteItem) {
      state.favoriteList = [...state.favoriteList, ...favouriteItem]
    },
    setNewArray(state, newArray) {
      state.favoriteList = newArray
    },
    serReverseMoviesList(state, reverseMoviesList) {
      state.sortedMovieList = reverseMoviesList
    },
    setSortedByDecadeMovieList(state, sortedByDecade){
      state.sortedMovieList = sortedByDecade
    },
    setMovieListForChart(state, movieListForChart){
      state.movieListForChart = movieListForChart
    }
  },
  actions: {
    async loadMovieList ({ commit, state }) {
      try {
        let fetchMovieList = async () => {
          let fetchMovies = await axios.get(`${VUE_APP_CORS_URL}/${MOVIE_DB_BASE_URI}/top?start=1&end=100&token=${MOVIE_DB_API_KEY}&format=json&data=0`)
          let {movies: movieList} = fetchMovies.data.data
          commit('setMoviesList', { movieList });
          commit('setSortedByDecadeMovieList', movieList);
        }
        let sortMoviesArrayForChart = async () => {
          let initial = [
            {decade: 1920, min: 1920, max: 1929},
            {decade: 1930, min: 1930, max: 1939},
            {decade: 1940, min: 1940, max: 1949},
            {decade: 1950, min: 1950, max: 1959},
            {decade: 1960, min: 1960, max: 1969},
            {decade: 1970, min: 1970, max: 1979},
            {decade: 1980, min: 1980, max: 1989},
            {decade: 1990, min: 1990, max: 1999},
            {decade: 2000, min: 2000, max: 2009},
            {decade: 2010, min: 2010, max: 2019},
            {decade: 2020, min: 2020, max: 2029}
            ]
          let movieListForChart = initial.reduce((result, current) => {
            let movieArray = state.movieList.filter(movie => movie.year >= current.min && movie.year <= current.max)
            result.push(movieArray)
            return result;
          }, []);
          commit('setMovieListForChart', movieListForChart)
          return
        };
        await fetchMovieList()
        await sortMoviesArrayForChart()
      } catch (e) {
        console.log('error', e)
      }
    },
    addToFavourite({commit, state}, itemId) {
      let movieID = state.favoriteList.find(movie => {
        return movie.idIMDB === itemId
      })
      if (!movieID) {
        let movieToFavourite = state.movieList.filter(movie => {
          return movie.idIMDB === itemId
        })
        commit('setFavoriteList', movieToFavourite)
      } else {
        console.info("Film already in favourite list")
      }
    },
    removeFromFavourite({commit, state}, itemId){
     let removed = state.favoriteList.filter(movie => movie.idIMDB !== itemId)
      commit('setNewArray', removed)
    },
    reverseMoviesList({commit, state}) {
      let movies = state.sortedMovieList
      movies.reverse()
      commit('serReverseMoviesList', movies)
    },
    sortMovieListByDecades({commit, state}, decadeValue){
      if(decadeValue == 'all') {
        commit('setSortedByDecadeMovieList', state.movieList);
      } else {
        let max = +decadeValue + 9;
        let sortedByDecade = state.movieList.filter(movie => movie.year >= decadeValue && movie.year <= max);
        commit('setSortedByDecadeMovieList', sortedByDecade);
      }
    }
  }
})
