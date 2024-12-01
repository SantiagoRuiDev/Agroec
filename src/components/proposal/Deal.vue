<template>
  <div class="grid gap-3" v-if="sale">
    
    <Slider :images="sale.images"/>
    
    <RouterLink :to="'/app/vendedor/' + sale.id_usuario" class="profilepad inline-flex w-5/6 mx-auto gap-3 items-center md:w-1/2">
      <img src="@/assets/People/Business.svg" alt="Profile Image" />
      <div class="grid gap-1 items-center">
        <h2 class="text-xl font-bold text-gray-500">{{sale.type}}</h2>
        <p class="text-sm text-gray-400">{{sale.nombre}} {{sale.apellido}}</p>
      </div>
    </RouterLink>

    <div class="pricepad bg-gray-200 text-center h-28 grid items-center">
      <div class="">
        <h2 class="text-sm font-bold text-gray-900">Precio con transacción protegida</h2>
        <p class="text-3xl font-bold text-gray-700">USD ${{ Number(sale.precio).toFixed(2) }} x {{ sale.precio_unidad }}</p>
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
        <p>{{sale.id_producto}}</p>
        <p>{{sale.cantidad}} {{sale.cantidad_unidad}}</p>
        <p>{{ sale.provincia }}, {{ sale.canton }}</p>
        <p>{{sale.presentacion_entrega}}</p>
        <p>{{formatDateTime(sale.fecha_entrega).plainDate}}</p>
      </div>
    </div>

    <hr class="text-gray-700 my-3">

    <div class="descripcionpad my -2 w-5/6 mx-auto text-left text-gray-700 text-sm md:w-1/2">
      <h1 class="font-bold text-xl mb-2 text-center">Parámetros de Calidad</h1>
      <ul class="grid gap-1" v-if="sale.quality_params.length > 0">
        <li class="text-base" v-for="param in sale.quality_params">{{param.nombre}}: min {{param.min_calidad}}% max {{param.max_calidad}}%</li>
      </ul>
      <ul class="grid gap-1" v-else>
        <li class="text-base">No se registraron parámetros</li>
      </ul>
    </div>

    <div class="propuestapad grid bg-gray-200 items-center gap-3 h-48 p-3">

      <div class="informative-text text-center text-gray-700">
        Para proceder con la compra de este producto debes generar una propuesta al vendedor.
      </div>

      <RouterLink class="default-bar p-3 rounded-md text-center text-zinc-50 md:w-1/2 mx-auto" :to="{name: 'propuestaDeals', params: { name: product, identifier: sale.id }}">Generar propuesta de compra</RouterLink>

    </div>
  </div>
</template>


<script>
import Slider from '@/components/others/SliderImage.vue';
import * as saleService from '../../services/sale.service.js';
import { formatDateTime } from '@/libs/date.js';
export default {
  name: 'Home',
  components: {
    Slider
  },
  data(){
    return {
      sale: null,
      product: this.$route.params.name
    }
  },
  methods: {
    async getSale(){
      this.sale = await saleService.getSaleByIdentifier(this.$route.params.identifier, this.$route.params.name);
    },
    formatDateTime(x){
      return formatDateTime(x)
    }
  },
  created: async function () {
    await this.getSale();
  },
}
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
