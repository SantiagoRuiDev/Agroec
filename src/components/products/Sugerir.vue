<template>
  <div class="addProduct mt-6">
    <form class="mx-auto grid items-center gap-3 w-full md:w-2/5">
      <div class="grid w-5/6 mx-auto relative">
        <label for="listado" class="text-gray-500 font-bold w-full mx-auto relative">Sugerir Producto</label>
        <input
          type="text"
          v-model="param"
          @input="checkParam"
          placeholder="Sugerir Producto"
          :class="{
            'w-full': isActive,
            'mx-auto': isActive,
            'bg-transparent': isActive,
            'border-l-2': !borders,
            'border-t-2': !borders,
            'border-r-2': !borders,
            'border-2': borders,
            'border-gray-300': isActive,
            'px-3': isActive,
            'py-3': isActive,
            'rounded-t-md': !borders,
            'rounded-md': borders,
            'text-gray-600': isActive,
          }"
        />
        <div
          class="grid gap-1 border-b-2 border-l-2 border-r-2 rounded-b-md border-gray-300 p-2"
          v-if="paramSelected"
        >
          <p
            class="text-gray-600"
            v-for="product in filteredList()"
            :key="product"
            @click="setProduct(product.id)"
          >
            {{ product.nombre }}
          </p>
          <p class="text-gray-600" v-if="param && !filteredList().length">
            No hay resultados!
          </p>
        </div>
      </div>

      <div class="grid relative w-5/6 mx-auto">
        <label for="listado" class="text-gray-500 font-bold w-full mx-auto">Cantidad a comprar</label>
        <input type="number" placeholder="Cantidad"
          v-model="cantidad"
          class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600">
      </div>

      <button @click="sendSuggestion" type="button" class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded text-center">
        Enviar
      </button>
    </form>
  </div>

  <CModal alignment="center" :visible="visible">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Sugerencia enviada
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Agroec analizará su sugerencia.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import { CModal, CModalBody } from "@coreui/vue";
import * as suggestionService from '@/services/suggestion.service.js';
import { emitAlert } from "@/libs/alert.js";
export default {
  components: {
    CModal,
    CModalBody,
  },
  data() {
    return {
      visible: false,
      param: "",
      isActive: true,
      borders: true,
      paramSelected: false,
      cantidad: 0,
      fruits: [],
    };
  },
  async created() {
    await this.getProducts();
  },
  methods: {
    async getProducts(){
      try {
        this.fruits = await suggestionService.getProducts();
      } catch (error) {
        emitAlert(error, 'error');
      }
    }, 
    async sendSuggestion(){
      try {
        await suggestionService.sendSuggestion({producto: this.param, cantidad: this.cantidad});
        this.showModal();
      } catch (error) {
        emitAlert(error, 'error');
      }
    },
    setProduct(product) {
      this.param = product;
      this.paramSelected = false;
      this.borders = true;
    },
    filteredList() {
      return this.fruits.filter((fruit) =>
        fruit.id.toLowerCase().includes(this.param.toLowerCase())
      );
    },
    checkParam() {
      this.paramSelected = true;
      if (this.param != "") {
        this.borders = false;
      } else {
        this.borders = true;
      }
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    }
  },
};
</script>