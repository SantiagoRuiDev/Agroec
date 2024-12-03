<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="tertiary">
                <div class="flex items-center mx-auto w-11/12">
                    <button @click="goBack">
                        <img src="@/assets/Arrow.svg" alt="Back" class="w-4 h-4" />
                    </button>
                    <h2 class="text-center mx-auto">Detalles</h2>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <InsumosDetalles />
        </ion-content>
        <BottomBar />
    </ion-page>
</template>

<script allowJs>
import BottomBar from "@/components/others/Bottom.vue";
import InsumosDetalles from "@/components/input/InsumoDetalles.vue";
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
        InsumosDetalles,
        BottomBar,
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonIcon,
    },
    data() {
        return {
            backToDetails: false,
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
};
</script>