<template>
  <div class="content w-full mx-auto grid my-5 gap-2">
    <div
      class="border-2 w-11/12 mx-auto rounded grid items-center relative h-12 text-gray-500 md:w-1/3"
    >
      <input
        placeholder="Filtrar por ID"
        class="text-left text-sm md:text-md bg-transparent h-full p-2"
      />
      <div class="absolute right-1 top-2.5">
        <img
          src="@/assets/Search.svg"
          alt="Search by Comerciante"
          class="h-6 w-6"
        />
      </div>
    </div>
    
    <div class="grid gap-1">
      <RouterLink :to="'/order/' + order.id" v-for="order in orders" :key="order.id">
        <div class="order-card flex md:grid md:grid-cols-2 gap-3 shadow-md p-2">
          <div class="flex w-full gap-3">
            <div class="Order grid items-center text-center">
              <img
                :src="order.imagen"
                :alt="order.producto + 'Order Icon Image'"
                class="h-16 w-16 mx-auto"
              />
            </div>

            <div class="Order-Text text-left">
              <h1 class="text-gray-600 text-sm font-bold">Orden #{{order.id.slice(0,8)}}</h1>
              <h1 class="text-gray-600 text-xs font-bold">
                {{ order.producto }}
              </h1>
              <p class="text-gray-500 text-xs">Cant: {{order.cantidad}} {{ order.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{formatWalletDate(order.fecha_entrega).slice(0,10)}}</p>
            </div>
          </div>

          <div class="Order-Price text-right grid mt-2 justify-end">
            <h1 class="text-yellow-400 text-md font-bold">${{order.precio}}</h1>
            <h1 class="text-yellow-400 text-md font-bold">{{order.precio_unidad}}</h1>
            <p class="text-red-600 text-xs font-bold" v-if="order.estado == 'Rechazado'">{{order.estado}}</p>
            <p class="text-lime-600 text-xs font-bold w-16" v-else-if="order.estado == 'En camino'">{{order.estado}}</p>
            <p class="text-orange-400 text-xs font-bold w-16" v-else-if="order.estado == 'En espera'">{{order.estado}}</p>
            <p class="text-lime text-xs font-bold" v-else>{{order.estado}}</p>
          </div>
        </div>
      </RouterLink>

    </div>
  </div>

  <RouterLink to="/print" class="rounded-full p-3 h-14 w-14 dark-bar grid justify-items-center align-items-center absolute right-2 bottom-2">
    <img src="@/assets/Pdf.svg" alt="Plus Icon" />
  </RouterLink>
</template>


<script>
import { emitAlert } from "@/libs/alert.js";
import * as orderService from '../services/order.service.js';
import { formatWalletDate } from "@/libs/date.js";
export default {
  data() {
    return {
      orders: []
    };
  },
  created: async function () {
    await this.getMyOrders();
  },
  watch: {
    '$route.fullPath': async function() {
      if(this.$route.fullPath == '/orders'){
        await this.getMyOrders();  // Se ejecuta cada vez que el parámetro cambia
        return;
      }
    }
  },
  methods: {
    async getMyOrders() {
      try {
        this.orders = await orderService.getOrders();
      } catch (error) {
        return emitAlert(error, "error");
      }
    },
    formatWalletDate(x){
      return formatWalletDate(x)
    }
  },
};
</script>
