<template>
  <div class="content w-full mx-auto grid my-3 gap-4">
    <div class="grid gap-1" v-if="orders.length > 0">
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
                {{ order.id_producto }}
              </h1>
              <p class="text-gray-500 text-xs">Cant: {{order.cantidad}} {{ order.cantidad_unidad }}</p>
              <p class="text-gray-500 text-xs">{{formatWalletDate(order.creado).slice(0,10)}}</p>
            </div>
          </div>

          <div class="Order-Price text-right grid mt-2 justify-end">
            <h1 class="text-yellow-400 text-md font-bold">${{order.precio}}</h1>
            <h1 class="text-yellow-400 text-md font-bold">{{order.precio_unidad}}</h1>
            <p class="text-red-400 text-xs font-bold w-20">Por pagar</p>
          </div>
        </div>
      </RouterLink>
    </div>
      <div v-else class="min-h-64 grid items-center">
        <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
          <h1 class="font-bold text-2xl opacity-65 text-center">No hay ordenes pendientes de pago</h1>
          <RouterLink to="/orders" class="default-bar text-center text-white rounded-md p-2">
            Revisar ordenes
          </RouterLink>
        </div>
      </div>
  </div>
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
        this.orders = await orderService.getOrdersUnpaid();
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
