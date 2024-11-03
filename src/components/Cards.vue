<template>
  <div class="content w-full mx-auto grid my-2 gap-2">
    <div class="grid gap-1 max-h-96 overflow-y-scroll" v-if="!permissionError.enabled && cards.length > 0">
      <div class="w-11/12 mx-auto my-3 grid gap-3">
        <div class="grid gap-1">
          <h1 class="text-gray-500 font-bold text-md mb-1">
            Datos de facturación
          </h1>
          <h1 class="text-green font-bold text-md">{{ person.name }}</h1>
        </div>
        <div class="grid gap-1">
          <h1 class="text-gray-500 font-bold text-md mb-1">
            Vencimiento de tarjeta
          </h1>
          <h1 class="text-green font-bold text-md">{{ person.expire_month }}/{{ person.expire_year
            }}</h1>
        </div>
      </div>

      <div class="grid gap-4 w-11/12 mx-auto my-2 md:grid-cols-4">
        <div class="bg-gradient-to-l from-slate-200 to-gray-300 p-4 rounded-md grid gap-4 relative"
          v-for="card in cards" :key="card.card_brand">
          <button type="button" @click="removeCard(card.identifier)" class="absolute right-2 top-2">
            <img src="@/assets/Nav/X.svg" alt="Remove card">
          </button>
          <img src="@/assets/Visa.svg" v-if="card.card_brand == 'visa'" alt="" class="h-16 w-16">
          <img src="@/assets/Mastercard.svg" v-if="card.card_brand == 'mastercard'" alt="" class="h-16 w-16">

          <div class="inline-flex justify-between items-center w-full text-gray-400">
            <p class="text-xl">{{ String(card.number).slice(0, 4) }}</p>
            <p class="text-xl">{{ String(card.number).slice(4, 8) }}</p>
            <p class="text-xl">{{ String(card.number).slice(8, 12) }}</p>
            <p class="text-xl">{{ String(card.number).slice(12, 16) }}</p>
          </div>

          <div class="inline-flex items-center justify-between w-full">
            <p class="text-gray-400">{{ person.name }}</p>
            <h1 class="text-gray-400">{{ person.expire_month }}/{{ person.expire_year
              }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-1 max-h-96 overflow-y-scroll" v-if="permissionError.enabled">
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
        <h1 class="font-bold text-2xl opacity-65 text-center">{{ permissionError.message }}</h1>
        <RouterLink to="/app/home" class="default-bar text-center text-white rounded-md p-2">
          Volver al inicio
        </RouterLink>
      </div>
    </div>
    <div class="grid gap-1 max-h-96 overflow-y-scroll p-4" v-if="!permissionError.enabled && cards.length == 0">
      <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
        <h1 class="font-bold text-2xl opacity-65 text-center">No encontramos tarjetas en tu billetera</h1>
      </div>
    </div>

    <div class="grid gap-2 mx-auto w-11/12 md:w-1/4" v-if="!permissionError.enabled">
      <RouterLink to="/app/cards/add"
        class="default-bar text-white text-center h-12 rounded p-2 mt-5 items-center grid">
        Agregar tarjeta
      </RouterLink>
    </div>
  </div>
</template>


<script>
import { formatWalletDate } from '@/libs/date';
import { emitAlert } from '../libs/alert.js';
import * as walletService from '../services/wallet.service.js';
export default {
  data() {
    return {
      cards: [],
      person: { name: "", expire_month: "", expire_year: "" },
      permissionError: {
        enabled: false,
        message: false,
      }
    }
  },
  watch: {
    '$route.fullPath': async function () {
      if (this.$route.fullPath == '/app/cards') {
        await this.getWalletCards();  // Se ejecuta cada vez que el parámetro cambia
        return;
      }
    }
  },
  async created() {
    await this.getWalletCards();
  },
  methods: {
    async getWalletCards() {
      try {
        this.person = {};
        this.cards = [];
        const { personInfo, cardsInfo } = await walletService.getWalletCards();
        this.cards = cardsInfo;
        this.person = personInfo;
      } catch (error) {
        this.permissionError.enabled = true;
        this.permissionError = error;
      }
    },
    async removeCard(id) {
      try {
        await walletService.removeCard(id);
        emitAlert("Tarjeta eliminada correctamente", 'success');
        await this.getWalletCards();
      } catch (error) {
        this.permissionError.enabled = true;
        this.permissionError = error;
        return emitAlert(error, 'error');
      }
    },
    formatWalletDate(x) {
      return formatWalletDate(x);
    }
  }
}
</script>