<template>
  <div class="grid gap-3 my-3" v-if="proposal">

    <RouterLink :to="'/app/vendedor/' + proposal.id_vendedor" class="profilepad inline-flex w-5/6 mx-auto gap-3 items-center md:w-1/2">
      <ProfileIcon :profile="proposal.tipo_perfil"></ProfileIcon>
      <div class="grid gap-1 items-center">
        <h2 class="text-xl font-bold text-gray-500">{{proposal.tipo_perfil}}</h2>
        <p class="text-sm text-gray-400">{{proposal.nombre}} {{proposal.apellido}}</p>
      </div>
    </RouterLink>

    <div class="pricepad bg-gray-200 text-center h-28 grid items-center">
      <div class="">
        <h2 class="text-sm font-bold text-gray-900">Precio con transacción protegida</h2>
        <p class="text-3xl font-bold text-gray-700">USD ${{ proposal.precio }} x {{ proposal.precio_unidad }}</p>
      </div>
    </div>

    <div class="detailspad inline-flex w-5/6 mx-auto gap-6 md:w-1/2">
      <div class="titles grid gap-2 text-gray-400">
        <p>Producto</p>
        <p>Cantidad</p>
        <p>Provincia y cantón</p>
        <p>Presentación de entrega</p>
        <p>Fecha de entrega</p>
      </div>
      <div class="titles grid gap-2 text-gray-700">
        <p>{{proposal.id_producto}}</p>
        <p>{{proposal.cantidad}} {{proposal.cantidad_unidad}}</p>
        <p>{{ proposal.provincia }}, {{ proposal.canton }}</p>
        <p>{{proposal.presentacion_entrega}}</p>
        <p>{{formatDateTime(proposal.fecha_entrega).plainDate}}</p>
      </div>
    </div>

    <hr class="text-gray-700 my-3" />

    <div class="descripcionpad my -2 w-5/6 mx-auto text-left text-gray-700 text-sm md:w-1/2">
      <h1 class="font-bold text-xl mb-2 text-center">Parámetros de Calidad</h1>
      <ul class="grid gap-1">
        <li class="text-base" v-for="param in proposal.quality_params">{{param.nombre}}: min {{param.min_calidad}}% max {{param.max_calidad}}%</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { formatDateTime } from '@/libs/date.js';
import * as proposalService from '../../services/proposal.service.js';
import ProfileIcon from '../profile/ProfileIcon.vue';
export default {
  name: "Revisar Detalles de Oferta",
  components: {
    ProfileIcon
  },
  data(){
    return {
      proposal: null,
      product: this.$route.params.name
    }
  },
  methods: {
    async getProposal(){
      this.proposal = await proposalService.getProposalInformation(this.$route.params.identifier);
    },
    formatDateTime(x){
      return formatDateTime(x);
    }
  },
  created: async function () {
    await this.getProposal();
  },
};
</script>

<style scoped>
.message-wrap {
  height: 50vh;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #b4b1b1 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #b4b1b1;
  border-radius: 10px;
  border: 3px solid #ffffff;
}
</style>
