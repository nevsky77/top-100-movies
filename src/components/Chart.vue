<script>
import { Bar } from "vue-chartjs";

export default {
    extends: Bar,
    props: {
      movieListForChart: Array
    },
    mounted() {
      let numberTopMovieInDecade = () => {
        const count = this.movieListForChart.map((item) => {
          return item.length
        });
        return count
      }
        this.renderChart(
          {
            labels: [
              "1920-th",
              "1930-th",
              "1940-th",
              "1950-th",
              "1960-th",
              "1970-th",
              "1980-th",
              "1990-th",
              "2000-th",
              "2010-th",
              "2020-th",
          ],
          datasets: [
            {
              // barPercentage: 0.5,
              // barThickness: 6,
              // maxBarThickness: 8,
              minBarLength: 1,
              // maxBarLength: 10,
              label: "Number of top movie in decade",
              backgroundColor: "#42b983",
              data: numberTopMovieInDecade()
            }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
    }
};
</script>
