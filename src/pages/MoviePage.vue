<template>
  <div>
    <h1>
      Film component
    </h1>
  </div>
</template>

<script>
  export default {
    name: "FilmComponent",
    mounted() {
      console.log('movie component', this.$route.params)
    }
  }
</script>

<style scoped>

</style>