<template>
  <v-container
    v-layout="'public-layout'"
    class="fill-height pa-0 back fondo-login"
    fluid
  >
    <v-row align="center" justify="center" class="fill-height pa-0">
      <v-col cols="12" sm="8" md="4">
        <v-form @submit.prevent="login">
          <v-card dark :loading="cargando" style="opacity: 0.9">
            <template slot="progress">
              <v-progress-linear
                color="aceptar"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-toolbar dark>
              <v-spacer></v-spacer>
              <v-toolbar-title style="justify-center"
                >Plantilla Vue.js</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <v-text-field
                id="txtUsuario"
                label="Usuario"
                v-model.trim="usuario"
                prepend-icon="mdi-account-circle"
                :error-messages="usuarioErrors"
                required
                @input="$v.usuario.$touch()"
                @blur="$v.usuario.$touch()"
              />

              <v-text-field
                id="txtPassword"
                label="Contraseña"
                v-model.trim="password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :error-messages="passwordErrors"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn id="btnLogin" dark type="submit" color="aceptar"
                >Iniciar Sesión</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-alert
            v-model="alert"
            v-if="alert"
            type="error"
            icon="mdi-cloud-alert"
            close-text="Cerrar"
            dismissible
            >{{ error }}</v-alert
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

@Component({
  mixins: [validationMixin],
  validations: {
    usuario: { required, maxLength: maxLength(20) },
    password: { required, maxLength: maxLength(30) },
  },
})
export default class Login extends Vue {
  usuario = "";
  password = "";
  showPassword = false;
  error = "";
  alert = false;
  cargando = false;

  get usuarioErrors(): Array<string> {
    const errors: Array<string> = [];

    if (!this.$v.usuario.$dirty) return errors;
    !this.$v.usuario.maxLength &&
      errors.push("Usuario puedo contener un máximo de 20 dígitos");
    !this.$v.usuario.required && errors.push("Usuario es requerido.");

    return errors;
  }

  get passwordErrors(): Array<string> {
    const errors: Array<string> = [];

    if (!this.$v.password.$dirty) return errors;
    !this.$v.password.maxLength &&
      errors.push("Contraseña puedo contener un máximo de 30 caracteres");
    !this.$v.password.required && errors.push("Contraseña es requerida.");
    return errors;
  }

  login(): void {
    this.$v.$touch();

    if (!this.$v.$invalid) {
      this.cargando = true;
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
