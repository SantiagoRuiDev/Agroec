<template>

    <div class="content w-full mx-auto grid my-5 gap-2">

        <div class="grid gap-1" v-for="notification in notifications" :key="notification.id">
            <div class="tutorial-card grid gap-1 p-3 items-center w-11/12 mx-auto border-b-2 border-gray-100">
                <div class="inline-flex justify-between">
                    <h3 class="text-gray-600 text-md font-bold">
                        {{ notification.tipo_notificacion }}:
                        #{{ notification.id_redireccion.slice(0, 8) }}</h3>
                    <span class="text-gray-500 text-xs justify-self-end">{{formatDateTime(notification.fecha).plainDate}}</span>
                </div>
                <p class="text-gray-500 text-sm w-full">{{ notification.mensaje }}</p>
            </div>
        </div>

    </div>

    <!--ORDEN COMPLETA: Tu proceso ha finalizado con total exito, gracias a Agroec.-->
</template>

<script allowJs>
import { emitAlert } from '@/libs/alert.js';
import * as notificationService from '../services/notification.service.js';
import { formatDateTime } from '@/libs/date.js';

export default {
    data() {
        return {
            notifications: []
        }
    },
    async created() {
        await this.getNotifications();
    },
    methods: {
        formatDateTime(date){
            return formatDateTime(date)
        },
        async getNotifications() {
            try {
                this.notifications = await notificationService.getNotifications();
            } catch (error) {
                emitAlert(error, 'error');
            }
        }
    }
}
</script>