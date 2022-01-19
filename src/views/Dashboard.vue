<template>
  <div v-layout="'app-layout'">
    <v-row class="pa-4">
      <v-col cols="12">
        <v-icon class="mb-3">mdi-home</v-icon>
        <v-divider></v-divider>
      </v-col>

      <v-col cols="7" class="px-4">
        <v-row>
          <v-col cols="12" md="12">
            <div class="card__indicator pa-4">
              <small>Constancia de Asignación</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-row dense align="center">
                  <v-col cols="7">
                    <v-text-field
                      hide-details
                      dense
                      outlined
                      label="Número de Asignación"
                      v-model="numberAssignModel"
                      @keypress.enter="searchNumberAssign"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-btn
                    @click="searchNumberAssign"
                    small
                    color="secondary"
                    class="text-capitalize ml-3"
                    >Buscar</v-btn
                  >
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="card__indicator pa-4">
              <small>Alta de empleado</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-btn
                  small
                  outlined
                  color="secondary"
                  class="text-capitalize py-2"
                  @click="goToRegister"
                  >Ir</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="card__indicator pa-4">
              <small>Consulta</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-btn
                  small
                  outlined
                  color="secondary"
                  class="text-capitalize"
                  @click="goToQuery"
                  >Ir</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="card__indicator pa-4">
              <small>Folios Asignación</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-btn
                  small
                  outlined
                  color="secondary"
                  class="text-capitalize"
                  @click="goToInvoiceAssign"
                  >Ir</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="card__indicator pa-4">
              <small>Bitacora</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-btn
                  small
                  outlined
                  color="secondary"
                  class="text-capitalize"
                  @click="goToBinnacle"
                  >Ir</v-btn
                >
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row justify="start" class="flex-wrap">
          <v-col cols="12" md="6">
            <div class="card__indicator pa-4">
              <h4 class="card__indicator__title">Empleados</h4>
              <small>Total</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center py-7">
                <v-row justify="center">
                  <v-col cols="5" class="text-center">
                    <small class="mr-4">Aceptados</small>
                    <div class="card__indicator__graph text-center">
                      <p class="card__indicator__value">
                        <v-avatar
                          size="80"
                          color="success"
                          class="avatar white--text mt-4"
                        >
                          <span>
                            {{ totalEmployeeStatusAccept }}
                          </span>
                        </v-avatar>
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="5" class="text-center">
                    <small class="mr-4">Cancelados</small>
                    <div class="card__indicator__graph text-center">
                      <p class="card__indicator__value">
                        <v-avatar
                          size="80"
                          color="red"
                          class="avatar white--text mt-4"
                        >
                          <span>{{ totalEmployeeStatusCancel }}</span>
                        </v-avatar>
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-row dense>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">Personas</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">{{ totalPeople }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">Afiliaciones</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">{{ totalRequest }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">Empleados</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">{{ totalEmployee }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">Empleados Hoy</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">
                      {{ totalEmployeeCurrent }}
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="5">
        <Graph />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import DashboardService from "@/services/Dashboard";
import Graph from "./mfe/IndicatorDashboard/Graph.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Graph,
  },
})
export default class Dashboard extends Vue {
  public numberAssignModel = "";
  public totalPeople = 0;
  public totalRequest = 0;
  public totalEmployee = 0;
  public totalEmployeeCurrent = 0;
  public totalEmployeeStatusCancel = 0;
  public totalEmployeeStatusAccept = 0;

  protected dashboardService = new DashboardService();

  searchNumberAssign(): void {
    if (!this.numberAssignModel) {
      this.$store.dispatch("app/setNotify", {
        status: 400,
        text: "Ingrese un Número de Asignación"
      });
      return;
    }

    this.$router.push({
      name: "proof:assignment",
      query: {
        numAssign: this.numberAssignModel,
      },
    });
  }

  mounted(): void {
    this.getTotalPeople();
    this.getTotalMembership();
    this.getTotalEmployee();
    this.getTotalEmployeeCurrent();
    this.getTotalEmployeeStatus();
  }

  getTotalPeople(): void {
    this.dashboardService
      .totalPeople()
      .then((res) => {
        this.totalPeople = res.Data;
      })
      .catch((err) => console.error(err));
  }

  getTotalMembership(): void {
    this.dashboardService
      .totalRequestMembership()
      .then((res) => {
        this.totalRequest = res.Data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getTotalEmployee(): void {
    this.dashboardService
      .totalEmployee()
      .then((res) => {
        this.totalEmployee = res.Data;
      })
      .catch((err) => console.error(err));
  }

  getTotalEmployeeCurrent(): void {
    this.dashboardService
      .totalEmployeeCurrent()
      .then((res) => {
        this.totalEmployeeCurrent = res.Data;
      })
      .catch((err) => console.error(err));
  }

  getTotalEmployeeStatus(): void {
    this.dashboardService
      .totalEmployeeStatus()
      .then((res) => {
        let data = res.Data;

        if (data && data.length) {
          this.totalEmployeeStatusAccept = data[0].Total;
          this.totalEmployeeStatusCancel = data[1].Total;
        }
      })
      .catch((err) => console.error(err));
  }

  goToRegister(): void {
    this.goToRoute({
      name: "people:create",
    });
  }

  goToQuery(): void {
    this.goToRoute({
      name: "people:list",
    });
  }

  goToInvoiceAssign(): void {
    this.goToRoute({
      name: "folios:list",
    });
  }

  goToBinnacle() {
    this.goToRoute({
      name: "affiliationLog:list",
    });
  }

  goToReport() {
    this.goToRoute({
      name: "proof:assignment",
    });
  }

  goToRoute(route: any): void {
    this.$router.push({
      ...route,
    });
  }
}
</script>

<style scoped>
.card__indicator {
  border-radius: 1px;
  -webkit-box-shadow: 1px 1px 7px -5px rgba(0, 0, 0, 0.77);
  box-shadow: 1px 1px 7px -5px rgba(0, 0, 0, 0.77);
}

.card__indicator__title {
  font-size: 0.8em;
  font-weight: 300;
  letter-spacing: 1px;
}

.card__indicator__value {
  font-size: 1.4em;
  font-weight: normal;
  margin-bottom: 0;
}
.avatar {
  font-size: 1.5em;
}
</style>
