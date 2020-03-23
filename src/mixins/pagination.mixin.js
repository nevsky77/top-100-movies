import _ from 'lodash'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 9,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    paginateChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    reverseMoviesList() {
      this.caretReverse = !this.caretReverse
      let sortedMovieList = this.items
      sortedMovieList.reverse()
      this.items = sortedMovieList
    },
  }
}