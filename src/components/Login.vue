<template>
  <ion-page>
    <ion-content>
      <header class="new-default h-12 w-full grid items-center justify-center">
        <h1>Entrar</h1>
      </header>

      <div class="logIn">
        <img
          src="@/assets/AgroIcon.svg"
          alt="App Icon"
          class="icon-app mx-auto my-4"
        />

        <form class="mx-auto grid items-center gap-3 w-full md:w-1/3">
          <input
            type="email"
            v-model="user.correo"
            class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Correo"
          />
          <input
            type="password"
            v-model="user.clave"
            class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Contraseña"
          />
          <button @click="initUserSession" type="button" class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded text-center">
            Entrar
          </button>
          
          <RouterLink to="/app/password" class="mx-auto default-color font-bold mt-2 mb-6">Recuperar Clave</RouterLink>
        </form>

      </div>

      <footer class="flex gap-5 mx-auto justify-center items-center mb-3">
        <p class="text-center text-sm text-gray-600">¿Eres nuevo en Agroec?</p>
        <RouterLink to="/app/signup" class="default-color font-bold">Registrarme</RouterLink>
      </footer>
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import { initUserSession } from "@/services/auth.service";
import { IonPage, IonContent, IonToolbar, IonHeader } from "@ionic/vue";
import {emitAlert} from '../libs/alert.js'
export default {
  components: {
    IonPage,
    IonContent,
    IonToolbar,
    IonHeader
  },
  data () {
    return {
      user: {
        correo: "",
        clave: ""
      }
    }
  },
  methods: {
    async initUserSession(){
      try {
        if(this.user.correo != "" && this.user.clave != ""){
          await initUserSession(this.user);
          this.$router.push('/app/home')
        }
      } catch (error) {
        return emitAlert(error.message, "error");
      }
    }
  }
}
</script>