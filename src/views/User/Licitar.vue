<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="tertiary">
          <div class="flex items-center mx-auto w-11/12">
          <RouterLink to="/app/licitar">
            <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
          </RouterLink>
            <h2 class="text-center mx-auto">Licitar</h2>
          </div>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <Licitar :Licitacion="Item" />
      </ion-content>
    </ion-page>
  </template>
  
  <script allowJs>
  import Licitar from "@/components/licitations/Licitar.vue";
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
  } from "@ionic/vue";
  
  export default {
    components: {
      Licitar,
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonIcon,
    },
    data() {
      return {
        Item: this.$route.params.name,
      };
    },
  };
  </script>
  