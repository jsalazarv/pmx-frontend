<template>
  <div class="graph">
    <Bar :chart-data="data" :styles="styles" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Bar from "@/components/Graph/Bar.vue";

// services
import DashboardService from "@/services/Dashboard";
import { IEmployeeTypesEmployee } from "@/services/Dashboard/types";

@Component({
  name: "Graph",
  components: {
    Bar,
  },
})
export default class Graph extends Vue {
  protected dashboardService = new DashboardService();

  public data: any = {
    labels: [],
    datasets: []
  };

  get styles() {
    return {
      height: `150px`,
      position: "relative",
    };
  }

  mounted(): void {
    this.getTotalEmployeeByTypesEmployee();
  }

  getTotalEmployeeByTypesEmployee(): void {
    this.dashboardService
      .totalEmpleadosPorTiposEmpleado()
      .then((res) => {
        let data: Array<IEmployeeTypesEmployee> = res.Data;
        if (data.length) {
          this.processDataEmployee(data);
        }
      })
      .catch((err) => console.error(err));
  }

  processDataEmployee(data: Array<IEmployeeTypesEmployee>): void {
    let typesEmployee = data.map((types) => types.TipoEmpleado);
    let total = data.map((types) => types.Total);

    this.data = {
      labels: typesEmployee,
      datasets: [
        {
          label: "Total por Tipos de Empleados",
          data: total,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
        },
      ]
    };
  }
}
</script>

<style scoped>
.graph {
  max-width: 92%;
  max-height: 140px !important;
}
</style>
