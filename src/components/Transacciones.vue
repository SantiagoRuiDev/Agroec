<template>
  <div class="content w-full mx-auto grid my-2 gap-2">
    <div class="w-11/12 mx-auto my-3 text-right">
      <h1 class="text-gray-500 font-bold text-md text-right mb-1">
        Saldo Total
      </h1>
      <h1 class="text-green font-bold text-md text-right">${{wallet.saldo}}</h1>
    </div>
    <div class="grid gap-1 max-h-96 overflow-y-scroll" v-if="!permissionError.enabled">
      <div class="order-card w-11/12 mx-auto rounded flex md:grid gap-3 shadow-sm p-2"  v-for="transaction in transactions" :key="transaction.id">
        <div class="flex w-full gap-3">
          <div class="Order-Text grid gap-2 w-full" v-if="transaction.tipo == 'Fee'">
            <div class="inline-flex justify-between w-full">
              <h1 class="text-red-600 text-md font-bold">Fee</h1>
              <h1 class="text-gray-600 text-xs font-bold">{{transaction.id.slice(0,8)}}</h1>
            </div>
            <div class="inline-flex gap-2">
              <h1 class="text-gray-600 text-xs font-bold">#5663</h1>
              <p class="text-gray-700 text-xs">{{ transaction.nombre }} {{transaction.apellido}}</p>
            </div>
            <p class="text-gray-700 text-xs w-5/6">
              Orden de {{ transaction.cantidad }} {{ transaction.cantidad_unidad }} de {{ transaction.id_producto }}, a entregar en {{ transaction.ubicacion }}
            </p>

            <div class="Order-Price inline-flex justify-between w-full items-center">
              <p class="text-gray-500 text-xs">{{formatWalletDate(transaction.fecha)}}</p>
              <h1 class="text-red-400 text-md font-bold">${{transaction.monto.toFixed(2)}}</h1>
            </div>
          </div>
          <div class="Order-Text grid gap-2 w-full"  v-if="transaction.tipo == 'Devolucion'">
            <div class="inline-flex justify-between w-full">
              <h1 class="text-gray-600 text-md font-bold">Devolucion</h1>
              <h1 class="text-gray-600 text-xs font-bold">{{transaction.id.slice(0,8)}}</h1>
            </div>

            <div class="Order-Price inline-flex justify-between w-full items-center">
              <p class="text-gray-500 text-xs">{{ formatWalletDate(transaction.fecha) }}</p>
              <h1 class="text-gray-400 text-md font-bold">${{transaction.monto.toFixed(2)}}</h1>
            </div>
          </div>
          <div class="Order-Text grid gap-2 w-full"  v-if="transaction.tipo == 'Recarga'">
            <div class="inline-flex justify-between w-full">
              <h1 class="text-green text-md font-bold">Recarga</h1>
              <h1 class="text-gray-600 text-xs font-bold">{{transaction.id.slice(0,8)}}</h1>
            </div>

            <div class="Order-Price inline-flex justify-between w-full items-center">
              <p class="text-gray-500 text-xs">{{formatWalletDate(transaction.fecha)}}</p>
              <h1 class="default-color text-md font-bold">${{transaction.monto.toFixed(2)}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-1 max-h-96 overflow-y-scroll" v-if="permissionError.enabled">
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
        <h1 class="font-bold text-2xl opacity-65 text-center">{{permissionError.message}}</h1>
        <RouterLink to="/app/home" class="default-bar text-center text-white rounded-md p-2">
          Volver al inicio
        </RouterLink>
      </div>
    </div>
    <div class="grid gap-1 max-h-96 overflow-y-scroll p-4" v-if="!permissionError.enabled && transactions.length == 0">
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
        <h1 class="font-bold text-2xl opacity-65 text-center">No encontramos movimientos en tu billetera</h1>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 mx-auto w-11/12" v-if="!permissionError.enabled">
      <RouterLink to="/app/recargar" class="default-bar text-white text-center h-12 rounded p-2 mt-5 items-center grid">
        Recargar
      </RouterLink>
      <a href="https://wa.me/593963195377" target="_blank" class="default-bar text-white text-center h-12 rounded p-2 mt-5 items-center grid">
        Solicitar Retiro
      </a>
    </div>
  </div>
</template>


<script>
import { formatWalletDate } from '@/libs/date';
import { emitAlert } from '../libs/alert.js'
import * as walletService from '../services/wallet.service.js'
export default {
  data() {
    return {
      wallet: {
        "id": "",
        "id_usuario": "",
        "saldo": 0
      },
      recharges: [],
      fees: [],
      chargebacks: [],
      transactions: [],
      permissionError: {
        enabled: false,
        message: false,
      }
    }
  },
  watch: {
    '$route.fullPath': async function() {
      if(this.$route.fullPath == '/app/transacciones'){
        await this.getWalletStats();  // Se ejecuta cada vez que el parámetro cambia
        return;
      }
    }
  },
  async created() {
    this.getWalletStats();
  },
  methods: {
    async getWalletStats() {
      try {
        const stats = await walletService.getWalletStats();
        this.wallet = stats.wallet;
        this.recharges = stats.recharge;
        this.fees = stats.fee;
        this.chargebacks = stats.chargeback;
        this.formatTransactions();
      } catch (error) {
        this.permissionError.enabled = true;
        this.permissionError.message = error;
        return emitAlert(error, 'error');
      }
    },
    formatWalletDate(x){
      return formatWalletDate(x);
    },
    // FUNCION FORMATEADORA DE TRANSACCIONES
    formatTransactions(){
      const fees = this.fees.map(fee => {
        return {
          id: fee.id,
          id_producto: fee.id_producto,
          monto: fee.monto_fee,
          fecha: new Date(fee.fecha),
          cantidad: fee.cantidad,
          cantidad_unidad: fee.cantidad_unidad,
          ubicacion: fee.ubicacion_google_maps,
          nombre: fee.vendedor_nombre,
          apellido: fee.vendedor_apellido,
          tipo: "Fee"
        }
      })

      const recharges = this.recharges.map(recharge => {
        return {
          id: recharge.id,
          monto: recharge.monto_recarga,
          fecha: new Date(recharge.fecha),
          tipo: "Recarga"
        }
      })

      const chargebacks = this.chargebacks.map(chargeback => {
        return {
          id: chargeback.id,
          monto: chargeback.monto_devolucion,
          fecha: new Date(chargeback.fecha),
          tipo: "Devolucion"
        }
      })

      // Combinamos todas las transacciones en un solo array
      const allTransactions = [...fees, ...recharges, ...chargebacks];

      // Ordenamos las transacciones por fecha (ascendente)
      allTransactions.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

      // Asignamos el array ordenado a this.transactions
      this.transactions = allTransactions;
    }
  }
}
</script>