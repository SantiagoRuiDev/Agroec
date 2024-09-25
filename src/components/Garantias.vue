<template>
  <div class="content w-full mx-auto grid my-2 gap-2">
    <div class="w-11/12 mx-auto my-3 text-right">
      <h1 class="text-gray-500 font-bold text-md text-right mb-1">
        Saldo Total
      </h1>
      <h1 class="text-green font-bold text-md text-right">${{stats.saldo}}</h1>
    </div>
    <div class="grid gap-1 max-h-72 overflow-y-scroll pb-2">

      <div
        class="order-card w-11/12 mx-auto rounded flex md:grid gap-3 shadow-sm p-2"  v-for="warranty in stats.warranties" :key="warranty.id"
      >
        <div class="flex w-full gap-3" v-if="warranty.devolucion == 0">
          <div class="Order-Text grid gap-2 w-full">
            <div class="inline-flex justify-between w-full">
              <h1 class="text-gray-600 text-md font-bold">Garantía</h1>
              <h1 class="text-gray-600 text-xs font-bold">{{warranty.id.slice(0,8)}}</h1>
            </div>

            <div
              class="Order-Price inline-flex justify-between w-full items-center"
            >
              <p class="text-gray-500 text-xs">{{formatWalletDate(warranty.fecha)}}</p>
              <h1 class="text-gray-400 text-md font-bold">${{warranty.total}}</h1>
            </div>
          </div>
        </div>
        <div class="flex w-full gap-3" v-else>
          <div class="Order-Text grid gap-2 w-full">
            <div class="inline-flex justify-between w-full">
              <h1 class="text-red-600 text-md font-bold">Devolución de garantía</h1>
              <h1 class="text-gray-600 text-xs font-bold">{{warranty.id.slice(0,8)}}</h1>
            </div>

            <div
              class="Order-Price inline-flex justify-between w-full items-center"
            >
              <p class="text-gray-500 text-xs">{{formatWalletDate(warranty.fecha)}}</p>
              <h1 class="text-red-400 text-md font-bold">${{warranty.total}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { formatWalletDate } from '@/libs/date.js';
import { emitAlert } from '../libs/alert.js'
import * as warrantyService from '../services/warranty.service.js'
export default {
  data() {
    return {
      stats: {
        saldo: 0,
        warranties: []
      }
    };
  },
  async created(){
    await this.getWarranties();
  },
  watch: {
    '$route.fullPath': async function() {
      if(this.$route.fullPath == '/app/garantias'){
        await this.getWarranties();  // Se ejecuta cada vez que el parámetro cambia
        return;
      }
    }
  },
  methods: {
    async getWarranties() {
      try {
        this.stats = await warrantyService.getWarranties();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    formatWalletDate(x){
      return formatWalletDate(x);
    }
  },
};
</script>
