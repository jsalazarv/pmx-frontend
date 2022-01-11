<template>
  <div v-layout="'app-layout'">
    <v-row class="pa-4">
      <v-col cols="12">
        <v-icon class="mb-3">mdi-home</v-icon>
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12" class="px-4">
        <v-row>
          <v-col cols="12" md="9">
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
                <v-btn small outlined color="secondary" class="text-capitalize"
                  >Ir</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="card__indicator pa-4">
              <small>Folios de Asignación</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-btn small outlined color="secondary" class="text-capitalize"
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
                <v-btn small outlined color="secondary" class="text-capitalize"
                  >Ir</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="card__indicator pa-4">
              <small>Generar Reporte</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-btn small outlined color="secondary" class="text-capitalize"
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
                        <v-avatar size="80" color="success" class="avatar white--text mt-4">
                          <span>
                            {{ totalEmpleadosEstatuAprobados }}
                          </span>
                        </v-avatar>
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="5" class="text-center">
                    <small class="mr-4">Cancelados</small>
                    <div class="card__indicator__graph text-center">
                      <p class="card__indicator__value">
                       <v-avatar size="80" color="red" class="avatar white--text mt-4">
                         <span>{{totalEmpleadosEstatuCancelacion}}</span>
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
                  <h4 class="card__indicator__title">Personas registradas</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">{{ totalPersonas }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">Afiliaciones</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">{{ totalSolicitud }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">Empleados</h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">{{ totalEmpleados }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <h4 class="card__indicator__title">
                    Empleados Registrados Hoy
                  </h4>
                  <small>Total</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <p class="card__indicator__value">
                      {{ totalEmpleadosHoy }}
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import DashboardService from "@/services/Dashboard";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Inicio extends Vue {
  public numberAssignModel = "";
  public totalPersonas = 0;
  public totalSolicitud = 0;
  public totalEmpleados = 0;
  public totalEmpleadosHoy = 0;
  public totalEmpleadosEstatuCancelacion = 0;
  public totalEmpleadosEstatuAprobados = 0;

  protected dashboardService = new DashboardService();

  searchNumberAssign(): void {
    this.$router.push({
      name: "proof:assignment",
      query: {
        numAssign: this.numberAssignModel,
      },
    });
  }

  mounted(): void {
    this.ObtenerTotalPersonas();
    this.ObtenerTotalFiliaciones();
    this.ObtenerTotalEmpleados();
    this.ObtenerTotalEmpleadosHoy();
    this.ObtenerTotalEmpleadosEstatus();
  }

  ObtenerTotalPersonas(): void {
    this.dashboardService
      .totalPersonas()
      .then((res) => {
        this.totalPersonas = res.Data;
      })
      .catch((err) => console.error(err));
  }

  ObtenerTotalFiliaciones(): void {
    this.dashboardService
      .totalSolicitudAfiliaciones()
      .then((res) => {
        this.totalSolicitud = res.Data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  ObtenerTotalEmpleados(): void {
    this.dashboardService
      .totalEmpleados()
      .then((res) => {
        this.totalEmpleados = res.Data;
      })
      .catch((err) => console.error(err));
  }

  ObtenerTotalEmpleadosHoy(): void {
    this.dashboardService
      .totalEmpleadosHoy()
      .then((res) => {
        this.totalEmpleadosHoy = res.Data;
      })
      .catch((err) => console.error(err));
  }

  ObtenerTotalEmpleadosEstatus(): void {
    this.dashboardService
      .totalEmpleadosEstatus()
      .then((res) => {
        let data = res.Data;

        if (data && data.length) {
          this.totalEmpleadosEstatuAprobados = data[0].total;
          this.totalEmpleadosEstatuCancelacion = data[1].total;
        }
      })
      .catch((err) => console.error(err));
  }
}
</script>

<style scoped>
.card__indicator {
  border-radius: 1px;
  -webkit-box-shadow: 0px 0px 10px -6px #000000;
  box-shadow: 0px 0px 10px -6px #000000;
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
.avatar{
  font-size: 1.5em;
}
</style>
