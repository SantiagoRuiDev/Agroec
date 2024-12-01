<template>
  <div class="content w-11/12 mx-auto grid my-5 gap-2 md:w-1/2">
    <div
      class="content-cards grid grid-cols-3 gap-2 items-center justify-center"
    >
      <RouterLink :to="'/app/propuestas/' + product.id" v-for="product in products" :key="product.id">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center relative"
        >
          <img
            :src="product.imagen"
            alt="App Icon"
            class="w-12 h-12 mx-auto"
          />
          <h1 class="text-gray-500 text-sm">{{product.nombre}}</h1>
          
          
          <span
            v-if="proposals.filter(proposal => proposal.lastMessage != null && proposal.leido == 0 && proposal.lastMessage != proposal.id_comprador && proposal.id_producto == product.id).length"
            class="h-6 w-6 bg-red-600 rounded-full p-0.5 absolute grid items-center justify-center top-0 right-0 text-white"
            >{{ proposals.filter(proposal => proposal.lastMessage != null && proposal.leido == 0 && proposal.lastMessage != proposal.id_comprador  && proposal.id_producto == product.id).length }}</span
          >
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
span {
  font-size: 12px;
}
</style>

<script>
import { emitAlert } from "@/libs/alert.js";
import event from "../../libs/event.js";
import * as productService from '../../services/product.service.js';
import * as proposalService from '../../services/proposal.service.js';
export default {
  data() {
    return {
      deleteProducts: false,
      products: [],
      proposals: []
    };
  },
  created: async function () {
    event.on("change-deleteProduct", this.changeDeleteProduct);
    await this.getMarketProducts();
    await this.getLicitationsProposal();
  },
  watch: {
    '$route.fullPath': async function () {
      if (this.$route.fullPath == '/app/propuestas/filter') {
        await this.getLicitationsProposal();  // Se ejecuta cada vez que el parámetro cambia
        await this.getMarketProducts();  // Se ejecuta cada vez que el parámetro cambia
        return;
      }
    }
  },
  methods: {
    changeDeleteProduct() {
      this.deleteProducts = !this.deleteProducts;
    },
    async getLicitationsProposal(){
      try {
        this.proposals = await proposalService.getLicitationProposalByUser();
      } catch (error) {
        return emitAlert(error.message, "error");
      }
    },
    async getMarketProducts(){
      try {
        this.products = await productService.getMarketProducts();
      } catch (error) {
        return emitAlert(error.message, "error");
      }
    }
  },
};
</script>