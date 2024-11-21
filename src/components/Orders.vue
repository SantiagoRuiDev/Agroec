<template>
  <div class="content w-full mx-auto grid my-5 gap-2">
    <div
      class="border-2 w-11/12 mx-auto rounded grid items-center relative h-12 text-gray-500 md:w-1/3"
    >
      <input
        placeholder="Filtrar por ID"
        v-model="filter"
        class="text-left text-sm md:text-md bg-transparent h-full p-2"
      />
      <button @click="filterByIdentifier" class="absolute right-1 top-2.5">
        <img
          src="@/assets/Search.svg"
          alt="Search by Identifier"
          class="h-6 w-6"
        />
      </button>
    </div>
    
    <div class="grid gap-1" v-if="filteredOrders.length > 0">
      <RouterLink :to="'/order/' + order.id" v-for="order in filteredOrders" :key="order.id">
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
              <p class="text-gray-500 text-xs">{{formatWalletDate(order.creado).slice(0,10)}}</p>
            </div>
          </div>

          <div class="Order-Price text-right grid mt-2 justify-end">
            <h1 class="text-yellow-400 text-md font-bold">${{Number(order.precio).toFixed(2)}}</h1>
            <h1 class="text-yellow-400 text-md font-bold">{{order.precio_unidad}}</h1>
            <p class="text-red-600 text-xs font-bold" v-if="order.estado == 'Rechazado'">{{order.estado}}</p>
            <p class="text-lime-600 text-xs font-bold w-16" v-else-if="order.estado == 'En camino'">{{order.estado}}</p>
            <p class="text-orange-400 text-xs font-bold w-16" v-else-if="order.estado == 'En espera'">{{order.estado}}</p>
            <p class="text-lime text-xs font-bold" v-else>{{order.estado}}</p>
          </div>
        </div>
      </RouterLink>
    </div>
    
    <div v-if="filteredOrders.length==0 && !contentLoading" class="grid p-3">
      <h1 class="font-bold text-xl opacity-65 text-center text-zinc-900">No encontramos ordenes {{ (status_filter) ? 'activas' : 'en historial' }} de {{ product_filter }}</h1>
    </div>
    <div class="p-3" v-if="contentLoading && filteredOrders.length == 0">
      <Spinner></Spinner>
    </div>
  </div>

  <RouterLink to="/print" class="rounded-full p-3 h-14 w-14 dark-bar grid justify-items-center align-items-center fixed right-2 bottom-2">
    <img src="@/assets/Pdf.svg" alt="Plus Icon" />
  </RouterLink>
</template>


<script>
import { emitAlert } from "@/libs/alert.js";
import * as orderService from '../services/order.service.js';
import { formatWalletDate } from "@/libs/date.js";
import Spinner from './Spinner.vue';
export default {
  props: {
    product_filter: {
      type: String,
      required: true
    },
    status_filter: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Spinner,
  },
  data() {
    return {
      orders: [],
      filteredOrders: [],
      filter: "",
      contentLoading: false
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
    },
    product_filter: function(newVal, oldVal) {
      this.filterByProduct();
    },
    status_filter: function(newVal, oldVal) {
      this.filterByIdentifier();
    }
  },
  methods: {
    filterByIdentifier(){
      if(this.filter.trim() == ""){
        this.filteredOrders = this.orders;
      }
      this.filteredOrders = this.orders.filter(order => String(order.id).includes(this.filter) && String(order.producto).includes(this.product_filter))
      this.filterByStatus();
    },
    filterByProduct(){
      if(this.product_filter.trim() == ""){
        this.filteredOrders = this.orders;
      }
      this.filteredOrders = this.orders.filter(order => String(order.producto).includes(this.product_filter))
      this.filterByStatus();
    },
    filterByStatus(){
      if(this.status_filter){
        this.filteredOrders = this.filteredOrders.filter(order => order.estado != "Aceptado" && order.estado != "Rechazado");
      } else {
        this.filteredOrders = this.filteredOrders.filter(order => order.estado == "Aceptado" || order.estado == "Rechazado");
      }
    },
    async getMyOrders() {
      try {
        this.contentLoading = true;
        this.orders = await orderService.getOrders();
        this.filterByIdentifier();
        this.filterByProduct();
        this.contentLoading = false;
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
