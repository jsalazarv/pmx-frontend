<template>
  <div v-layout="'app-layout'">
    <v-row class="pa-4">
      <v-col cols="12">
        <v-icon class="mb-3">mdi-home</v-icon>
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12" class="px-4">
        <v-row justify="start" class="flex-wrap">
          <v-col cols="12">
            <div class="card__indicator pa-4">
              <small>Constancia de Asignación</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <v-row dense align="center">
                  <v-col cols="4">
                    <v-text-field
                      hide-details
                      dense
                      outlined
                      label="Id Folio"
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
          <v-col cols="3">
            <div class="card__indicator pa-4">
              <h4 class="card__indicator__title">Personas registradas</h4>
              <small>Total</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <p class="card__indicator__value">50</p>
              </div>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="card__indicator pa-4">
              <h4 class="card__indicator__title">Afiliaciones</h4>
              <small>Total</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <p class="card__indicator__value">30</p>
              </div>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="card__indicator pa-4">
              <h4 class="card__indicator__title">Empleados</h4>
              <small>Total</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <p class="card__indicator__value">23</p>
              </div>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="card__indicator pa-4">
              <h4 class="card__indicator__title">Empleados Registrados Hoy</h4>
              <small>Total</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center">
                <p class="card__indicator__value">23</p>
              </div>
            </div>
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <small>Alta de empleado</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <v-btn
                      small
                      outlined
                      color="secondary"
                      class="text-capitalize"
                      >Ir</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <small>Consulta</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <v-btn
                      small
                      outlined
                      color="secondary"
                      class="text-capitalize"
                      >Ir</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <small>Folios de Asignación</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <v-btn
                      small
                      outlined
                      color="secondary"
                      class="text-capitalize"
                      >Ir</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <small>Bitacora</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <v-btn
                      small
                      outlined
                      color="secondary"
                      class="text-capitalize"
                      >Ir</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="card__indicator pa-4">
                  <small>Generar Reporte</small>
                  <v-divider class="my-3"></v-divider>
                  <div class="card__indicator__graph text-center">
                    <v-btn
                      small
                      outlined
                      color="secondary"
                      class="text-capitalize"
                      >Ir</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="7">
            <div class="card__indicator pa-4">
              <h4 class="card__indicator__title">Empleados</h4>
              <small>Total</small>
              <v-divider class="my-3"></v-divider>
              <div class="card__indicator__graph text-center py-10">
                <v-row justify="center">
                  <v-col cols="5" class="text-center">
                    <small class="mr-4">Aceptados</small>
                    <v-progress-circular
                      :rotate="360"
                      :size="200"
                      :width="40"
                      :value="40"
                      color="green"
                    >
                      40
                    </v-progress-circular>
                  </v-col>
                  <v-col cols="5" class="text-center">
                    <small class="mr-4">Rechazados</small>
                    <v-progress-circular
                      :rotate="360"
                      :size="200"
                      :width="40"
                      :value="30"
                      color="red"
                    >
                      30
                    </v-progress-circular>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Inicio extends Vue {

  public numberAssignModel:string = '';

  searchNumberAssign():void {
    this.$router.push({
      name: "proof:assignment",
      query: {
        numAssign: this.numberAssignModel
      }
    })
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
</style>
