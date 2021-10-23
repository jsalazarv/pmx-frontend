<template>
  <v-container
    v-layout="'public-layout'"
    class="fill-height pa-0 back fondo-login"
    fluid
  >
    <v-row align="center" justify="center" class="fill-height pa-0">
      <v-col cols="12" sm="8" md="4">
        <ValidationObserver ref="form">
          <v-card dark style="opacity: 0.9">
            <template slot="progress">
              <v-progress-linear
                color="aceptar"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-toolbar dark>
              <v-spacer></v-spacer>
              <v-toolbar-title class="justify-center">
                Plantilla Vue.js
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <ValidationProvider
                name="user"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  id="txtUsuario"
                  label="Usuario"
                  name="user"
                  v-model="usuario"
                  prepend-icon="mdi-account-circle"
                  required
                  :error-messages="errors"
                />
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required|min:8"
                v-slot="{ errors }"
              >
                <v-text-field
                  id="txtPassword"
                  label="Contraseña"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                id="btnLogin"
                dark
                type="submit"
                color="aceptar"
                @click="login"
              >
                Iniciar Sesión
              </v-btn>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IValidationObserver } from "@/components/types";

@Component({})
export default class Login extends Vue {
  usuario = "";
  password = "";
  showPassword = false;
  error = "";
  alert = false;
  cargando = false;

  async login(): Promise<void> {
    this.cargando = true;

    if (await (this.$refs.form as IValidationObserver).validate()) {
      this.$store
        .dispatch("user/login", {
          usuario: this.usuario,
          password: this.password,
        })
        .then(() => {
          this.cargando = false;
          this.$router.push({ name: "Inicio" });
        })
        .catch(() => {
          this.error = "Error interno. Favor de verificar";
          this.alert = true;
          this.cargando = false;
        });
    }
  }
}
</script>
<style>
.fondo-login {
  background-image: url("../assets/login-background.png");
  background-size: cover;
}
</style>
