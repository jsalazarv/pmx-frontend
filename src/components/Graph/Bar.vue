<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,

  mixins: [reactiveProp],

  props: {
    options: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },

  mounted() {
    setTimeout(() => {
      this.renderChart(this.chartData, this.setOptions);
    }, 300)
  },

  computed: {
    setOptions() {
      return {
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
        ...this.options,
      };
    },
  },
};
</script>
