<template>
  <div class="grid gap-3 my-3" v-if="sale">

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
        <p class="text-3xl font-bold text-gray-700">USD ${{ sale.precio }} x {{ sale.precio_unidad }}</p>
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
        <p>{{sale.fecha_entrega.slice(0,10)}}</p>
      </div>
    </div>

    <hr class="text-gray-700 my-3" />

    <div class="descripcionpad my -2 w-5/6 mx-auto text-left text-gray-700 text-sm md:w-1/2">
      <h1 class="font-bold text-xl mb-2 text-center">Parámetros de Calidad</h1>
      <ul class="grid gap-1">
        <li class="text-base" v-for="param in sale.quality_params">{{param.nombre}}: min {{param.min_calidad}}% max {{param.max_calidad}}%</li>
      </ul>
    </div>

  </div>
</template>

<script>
import * as saleService from '../services/sale.service.js';
export default {
  name: "Revisar Detalles de Oferta",
  data(){
    return {
      sale: null,
      product: this.$route.params.name
    }
  },
  methods: {
    async getSale(){
      this.sale = await saleService.getSaleByIdentifier(this.$route.params.identifier, this.$route.params.name);
    }
  },
  created: async function () {
    await this.getSale();
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
