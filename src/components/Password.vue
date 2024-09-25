<template>
  <ion-page>
    <ion-content>
      <ion-header>
        <ion-toolbar color="tertiary">
          <div class="grid grid-cols-3 items-center mx-auto w-11/12">
            <RouterLink to="/app/signin">
              <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
            </RouterLink>
            <h2 class="text-center">Recuperar</h2>
          </div>
        </ion-toolbar>
      </ion-header>

      <div class="logIn my-4">
        <img src="@/assets/AgroIcon.svg" alt="App Icon" class="icon-app mx-auto my-4" />

        <div class="text-content my-5 grid gap-3 text-center w-5/6 mx-auto">
          <h3 class="text-md text-gray-700 font-bold">Recuperar clave</h3>
          <p class="text-gray-500 text-sm">
            Ingrese porfavor su correo electrónico para recuperar su clave
          </p>
        </div>

        <form class="mx-auto grid items-center gap-3 w-full md:w-1/3">
          <input type="email"
            class="text-gray-400 w-5/6 mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md"
            placeholder="Correo" v-model="correo" />
          <button class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded" type="button" @click="showModal">
            Enviar
          </button>
        </form>
      </div>

      <CModal alignment="center" :visible="visible">
        <CModalBody>
          <div class="grid w-full gap-3 pb-3">
            <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
            <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
              Correo enviado
            </h2>
            <div class="mx-auto text-center">
              <p class="text-gray-400 text-sm w-3/4 mx-auto">
                Las instrucciones para recuperar la clave de su cuenta, fueron enviadas al correo: {{ correo }}
              </p>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </ion-content>
  </ion-page>
</template>

<script allowJs>
import { CModal, CModalBody } from "@coreui/vue";
import { IonPage, IonContent, IonToolbar, IonHeader } from "@ionic/vue";
export default {
  components: {
    IonPage,
    IonContent,
    IonToolbar,
    IonHeader,
    CModal,
    CModalBody,
  },
  data() {
    return {
      visible: false,
      correo: ""
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
  },
};
</script>
