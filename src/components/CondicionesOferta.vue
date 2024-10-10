<template>
  <div class="grid mx-auto gap-3 my-3 w-11/12">
    <h2 class="text-center text-xl font-bold text-gray-500 w-full mx-auto">
      Datos de la negociación
    </h2>
    <div class="mx-auto md:grid md:grid-cols-2 w-full gap-2">
      <p class="text-gray-400 text-sm mx-auto col-span-2">
        Revisa los detalles para despachar tu venta.
      </p>

      <h3 class="text-gray-400 text-sm mt-3 col-span-2">
        Producto:
        <span class="text-gray-600 font-bold">{{this.$route.params.name}}</span>
      </h3>

      <div class="grid gap-1 mt-3">
        <label for="entrega" class="text-gray-400 text-sm">Precio Final</label>
        <input
          type="text"
          id="entrega"
          disabled
          class="bg-transparent border-2 rounded-md h-10 w-full text-gray-600 text-sm p-1"
          :placeholder="'$' + delivery.precio + ' ' + delivery.precio_unidad"
        />
      </div>

      <div class="grid gap-1 mt-3">
        <label for="entrega" class="text-gray-400 text-sm">Cantidad</label>
        <input
          type="text"
          id="entrega"
          disabled
          class="bg-transparent border-2 rounded-md h-10 w-full text-gray-600 text-sm p-1"
          :placeholder="delivery.cantidad + ' ' + delivery.cantidad_unidad"
        />
      </div>

      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
        <label for="recepcion" class="text-gray-400 text-sm"
          >Fecha de entrega</label
        >
        <input
          type="text"
          id="recepcion"
          disabled
          :placeholder="delivery.fecha_entrega"
          class="bg-transparent border-2 rounded-md h-10 w-full text-gray-400 text-sm p-1"
        />
      </div>
      <div class="grid gap-1 mx-auto mt-3 col-span-2 w-full">
        <label for="hora" class="text-gray-400 text-sm">Hora de entrega</label>
        <input
          type="text"
          id="hora"
          disabled
          :placeholder="delivery.hora_entrega"
          class="bg-transparent border-2 rounded-md h-10 w-full text-gray-400 text-sm p-1"
        />
      </div>

      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3">
        <label for="entrega" class="text-gray-400 text-sm"
          >Dirección de entrega</label
        >
        <input
          type="text"
          id="entrega"
          disabled
          class="bg-transparent border-2 rounded-md h-10 w-full text-gray-600 text-sm p-1"
          :placeholder="delivery.ubicacion_google_maps"
        />
      </div>

      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3">
        <label for="recepcion" class="text-gray-400 text-sm"
          >Politicas de recepción</label
        >
        <input
          type="text"
          disabled
          :placeholder="delivery.politicas_recepcion"
          id="recepcion"
          class="bg-transparent border p-2 rounded-md text-sm text-gray-600"
        />
        <button class="text-gray-700 font-bold" @click="openPoliticas">
          Ver todo
        </button>
      </div>
      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3">
        <label for="modopago" class="text-gray-400 text-sm">Modo de pago</label>
        <input
          type="text"
          disabled
          :placeholder="delivery.modo_pago"
          id="modopago"
          class="bg-transparent border p-2 rounded-md text-sm text-gray-600"
        />
      </div>
      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3"
          v-if="delivery.modo_pago == 'Modo Garantía'">
        <label for="pctajeinicial" class="text-gray-400 text-sm"
          >Porcentaje Inicial</label
        >
        <input
          type="text"
          disabled
          :placeholder="delivery.porcentaje_inicial"
          id="pctajeinicial"
          class="bg-transparent border p-2 rounded-md text-sm text-gray-600"
        />
      </div>
      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3"
          v-if="delivery.modo_pago == 'Modo Garantía'">
        <label for="pctajefinall" class="text-gray-400 text-sm"
          >Porcentaje Final</label
        >
        <input
          type="text"
          disabled
          :placeholder="delivery.porcentaje_final"
          id="pctajefinall"
          class="bg-transparent border p-2 rounded-md text-sm text-gray-600"
        />
      </div>

      <div class="grid gap-1 mx-auto col-span-2 w-full mt-3">
        <label for="notas" class="text-gray-400 text-sm">Notas</label>
        <textarea
          type="text"
          rows="3"
          disabled
          :placeholder="delivery.notas"
          id="notas"
          class="bg-transparent border p-2 rounded-md text-sm text-gray-600"
        ></textarea>
      </div>

      <div class="inline-flex justify-between mx-auto mt-3 col-span-2 w-11/12">
        <label for="domicilio" class="text-gray-400 text-sm"
          >Precio es puesto en domicilio del cliente</label
        >
        <input type="checkbox" class="accent-[#a3e635]" v-if="delivery.precio_puesto_domicilio" :checked="true" disabled />
        <input type="checkbox" class="accent-[#a3e635]" v-if="!delivery.precio_puesto_domicilio" :checked="false" disabled />
      </div>
    </div>

    <button
      class="default-bar rounded-md p-2 h-12 text-center text-white text-sm w-full"
      @click="backToChat"
    >
      Regresar a la conversación
    </button>
  </div>
</template>

<script setup>
import event from "@/libs/event";


defineProps({
  delivery: {
    type: Object,
    required: true
  }
})

const openPoliticas = () => {
  event.emit("openPoliticas");
};

const backToChat = () => {
    event.emit('closeDatos')
}

</script>