<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["options"],

  mounted() {
    this.renderChart(this.chartData, this.setOptions);
  },

  computed: {
    setOptions() {
      return {
        ...this.options,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 5,
              },
            },
          ],
        },
      };
    },
  },
};
</script>
