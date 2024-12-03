<template>
  <div class="content w-full mx-auto grid my-5 gap-2">
    <form class="grid gap-1 w-11/12 mx-auto">
      <div class="mx-auto grid relative w-full">
        <div class="relative">
          <label for="identificador" class="text-gray-600 font-bold w-5/6 mx-auto">Seleccionar Orden</label>
          <select id="identificador" v-model="selectedOrder"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
            <option :value="order.id" v-for="order in orders" :key="order.id">Orden de {{ order.producto }} #{{ String(order.id).slice(0, 8) }}
            </option>
          </select>
        </div>
      </div>


      <button class="dark-bar p-2 h-14 w-full mx-auto text-center text-white rounded mt-3" type="button" @click="generateOrderPdf">Generar Orden</button>
    </form>

  </div>

</template>

<script>
import { emitAlert } from "@/libs/alert.js";
import * as orderService from '@/services/order.service.js';
export default {
  data() {
    return {
      orders: [],
      selectedOrder: ""
    }
  },
  async created() {
    await this.getMyOrders();
  },
  methods: {
    async getMyOrders() {
      try {
        this.orders = await orderService.getOrders();
        this.selectedOrder = this.orders[0].id;
      } catch (error) {
        return emitAlert(error, "error");
      }
    },
    async generateOrderPdf() {
      try {
        await orderService.generateOrderPdf(this.selectedOrder);
      } catch (error) {
        return emitAlert(error, "error");
      }
    }
  }
}

</script>