<script lang="ts">
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

import { Component, Prop, Mixins } from "vue-property-decorator";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  extends: Bar,
  name: "GraphBar",
  mixins: [reactiveProp],
})
export default class GraphBar extends Mixins(Bar) {
  @Prop({
    type: Object,
    required: false,
    default() {
      return {};
    },
  })
  options!: ChartOptions;

  @Prop({
    type: Object,
    required: false,
    default() {
      return {};
    },
  })
  chartData!: ChartData;

  mounted(): void {
    setTimeout(() => {
      this.renderChart(this.chartData, this.setOptions);
    }, 300);
  }

  get setOptions() {
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
  }
}
</script>
