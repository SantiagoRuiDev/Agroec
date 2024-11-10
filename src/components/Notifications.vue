<template>

    <div class="content w-full mx-auto grid my-5 gap-2">

        <div class="grid gap-1" v-for="notification in filteredNotifications" :key="notification.id">
            <RouterLink :to="'/chat/licitacion/' + notification.id_producto + '/' + notification.id_redireccion" v-if="!Object.values(notification).includes(null)"
                class="tutorial-card grid gap-1 p-3 items-center w-11/12 mx-auto border-b-2 border-gray-100">
                <div class="inline-flex justify-between">
                    <h3 class="text-gray-600 text-md font-bold">
                        {{ notification.tipo_notificacion }}:
                        #{{ notification.id_redireccion.slice(0, 8) }}</h3>
                    <span
                        class="text-gray-500 text-xs justify-self-end">{{ formatDateTime(notification.fecha).plainDate }}</span>
                </div>
                <p class="text-gray-500 text-sm w-full">{{ notification.mensaje }}</p>
            </RouterLink>
        </div>

    </div>

    <!--ORDEN COMPLETA: Tu proceso ha finalizado con total exito, gracias a Agroec.-->
</template>

<script allowJs>
import { emitAlert } from '@/libs/alert.js';
import * as notificationService from '../services/notification.service.js';
import { formatDateTime } from '@/libs/date.js';

export default {
    props: {
        product_filter: {
            type: String,
            required: true
        }
    },
    watch: {
        '$route.fullPath': async function () {
            if (this.$route.fullPath == '/app/notificaciones') {
                await this.getNotifications();  // Se ejecuta cada vez que el parámetro cambia
                return;
            }
        },
        product_filter: function (newVal, oldVal) {
            this.filterByProduct();
        }
    },
    data() {
        return {
            filteredNotifications: [],
            notifications: []
        }
    },
    async created() {
        await this.getNotifications();
    },
    methods: {
        filterByProduct() {
            if (this.product_filter.trim() == "") {
                this.filteredNotifications = this.notifications;
                return;
            }
            this.filteredNotifications = this.notifications.filter(notification => String(notification.id_producto).includes(this.product_filter))
        },
        formatDateTime(date) {
            return formatDateTime(date)
        },
        async getNotifications() {
            try {
                this.notifications = await notificationService.getNotifications();
                this.filterByProduct();
            } catch (error) {
                emitAlert(error, 'error');
            }
        }
    }
}
</script>