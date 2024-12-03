<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="tertiary">
          <div class="flex items-center mx-auto w-11/12">
            <RouterLink to="/app/market">
              <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
            </RouterLink>
            <h2 class="text-center mx-auto">Agregar Productos de interés</h2>
          </div>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <AddProduct />
      </ion-content>
    <BottomBar/>
  </ion-page>
</template>

<script allowJs>
import BottomBar from '@/components/others/Bottom.vue';
  import AddProduct from "@/components/products/AddProduct.vue";
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
      AddProduct,
      BottomBar,
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonIcon,
    }
  };
  </script>
  