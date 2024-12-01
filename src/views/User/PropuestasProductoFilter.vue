<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="tertiary">
          <div class="flex items-center mx-auto w-11/12">
            <RouterLink to="/app/home">
              <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
            </RouterLink>
            <h2 class="text-center mx-auto">Propuestas enviadas por producto</h2>
          </div>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <LicitacionesFilter />
      </ion-content>
      <BottomBar/>
    </ion-page>
  </template>
  
  <script allowJs>
  import BottomBar from '@/components/others/Bottom.vue';
  import LicitacionesFilter from "@/components/proposal/PropuestasFilter.vue";
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
      LicitacionesFilter,
      IonPage,
      BottomBar,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonIcon,
    },
  };
  </script>
  