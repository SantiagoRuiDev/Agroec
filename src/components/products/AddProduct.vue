<template>
  <div class="addProduct mt-6">
    <form class="mx-auto grid items-center gap-3 w-full md:w-2/5">
      <div class="w-5/6 mx-auto relative">
        <label
          for="listado"
          class="text-gray-500 font-bold w-full mx-auto relative"
          >Productos en listado</label
        >
        <input
          type="text"
          v-model="param"
          @input="checkParam"
          placeholder="Productos en listado"
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

        <div class="absolute right-3 top-11">
          <img
            src="@/assets/Search.svg"
            alt="Type of your business"
            class="h-5 w-5"
          />
        </div>

        <div
          class="grid gap-1 border-b-2 border-l-2 border-r-2 rounded-b-md border-gray-300 p-2"
          v-if="paramSelected"
        >
          <p
            class="text-gray-600"
            v-for="product in filteredList()"
            :key="product"
            @click="setProduct(product)"
          >
            {{ product }}
          </p>
          <p class="text-gray-600" v-if="param && !filteredList().length">
            No hay resultados!
          </p>
        </div>
      </div>

      <div class="grid relative w-5/6 mx-auto">
        <div class="relative">
          <label
            for="negocio"
            class="text-gray-500 font-bold w-5/6 mb-3 mx-auto"
            >¿Parámetros de calidad?</label
          >
          <div class="relative">
            <select
              v-model="parametros"
              id="negocio"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
            >
              <option selected :value="false">No</option>
              <option :value="true">Si</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid relative w-5/6 mx-auto" v-if="parametros">
        <div class="inline-flex gap-2 w-full items-center">
          <label for="" class="text-gray-500 font-bold w-full"
            >Agregar Parámetros de Calidad</label
          >
          <button
            type="button"
            class="default-bar h-10 p-2 text-white font-bold rounded-md"
            @click="newParametro"
          >
            +
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-1 w-5/6 mx-auto" v-if="parametros">
        <div class="grid gap-1 w-full items-center">
          <label for="nombreParametro" class="text-gray-500 font-bold w-full"
            >Nombre</label
          >
          <input
            v-model="nombreParametro"
            id="nombreParametro"
            placeholder="Nombre"
            type="text"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
          />
        </div>
        <div class="grid gap-1 w-full items-center">
          <label for="minParametro" class="text-gray-500 font-bold w-full"
            >Min</label
          >
          <input
            v-model="minParametro"
            placeholder="2%"
            id="minParametro"
            type="number"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
          />
        </div>
        <div class="grid gap-1 w-full items-center">
          <label for="maxParametro" class="text-gray-500 font-bold w-full"
            >Max</label
          >
          <input
            v-model="maxParametro"
            placeholder="No Max"
            id="maxParametro"
            type="number"
            class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
          />
        </div>
      </div>

      <div class="grid gap-1 w-5/6 mx-auto" v-if="newParametros.length > 0">
        <h1 class="text-gray-600 mb-3 font-bold">Parámetros Agregados</h1>

        <p
          class="text-gray-500 flex gap-3 items-center"
          v-for="item in newParametros"
          :key="item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            fill="#a2afbe"
            viewBox="0 -960 960 960"
            width="18"
          >
            <path
              d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z"
            />
          </svg>
          {{ item.nombre }}, Min: {{ minParametro }}%, Max: {{ maxParametro }}%

          <button type="button" v-on:click="deleteParametro(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="#E87C61"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </button>
        </p>
      </div>

      <div class="grid relative w-5/6 mx-auto" v-if="parametros">
        <div class="relative">
          <label
            for="negocio"
            class="text-gray-500 font-bold w-5/6 mb-3 mx-auto"
            >¿Aplica tabla de castigos?</label
          >
          <div class="relative">
            <select
              v-model="castigos"
              id="negocio"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-600"
            >
              <option selected :value="false">No</option>
              <option :value="true">Si</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mx-auto w-5/6" v-if="castigos && parametros">
        <label
          for="castigos"
          class="text-gray-500 font-bold w-full mx-auto mb-3"
          >Subir Tabla de castigos (Excel)</label
        >
        <label
          for="uploadCastigo"
          class="w-full flex justify-between items-center mx-auto bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md text-gray-500 text-left"
          >Subir excel aquí

          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4CAF50"
              d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z"
            ></path>
            <path
              fill="#FFF"
              d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z"
            ></path>
            <path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z"></path>
            <path
              fill="#FFF"
              d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z"
            ></path>
          </svg>
        </label>
        <input type="file" id="uploadCastigo" class="hidden" />

        <button
          class="w-full mx-auto bg-transparent text-center text-gray-500 font-bold mt-3 flex justify-center items-center gap-2"
        >
          Descargar plantilla de Ejemplo
          <svg
            fill="#8d919a"
            height="24px"
            width="24px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 29.978 29.978"
            xml:space="preserve"
          >
            <g>
              <path
                d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012
		v-8.861H25.462z"
              />
              <path
                d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723
		c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742
		c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193
		C15.092,18.979,14.62,18.426,14.62,18.426z"
              />
            </g>
          </svg>
        </button>
      </div>
      <div class="mx-auto w-11/12 overflow-x-scroll md:w-5/6" v-if="castigos && parametros">
          <table class="text-gray-500">
            <thead>
              <tr>
                <th class="text-sm">Imp-Hum</th>
                <th>1%</th>
                <th>2%</th>
                <th>3%</th>
                <th>4%</th>
                <th>5%</th>
                <th>6%</th>
                <th>7%</th>
                <th>8%</th>
                <th>9%</th>
                <th>10%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="number"
                    value="13.0"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.6"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.3"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.2"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.0"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.8"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.6"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.4"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.2"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.1"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="13.9"
                    class="bg-transparent w-11/12"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="number"
                    value="13.0"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.6"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.3"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.2"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.0"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.8"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.6"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.4"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.2"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.1"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="13.9"
                    class="bg-transparent w-11/12"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="number"
                    value="13.0"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.6"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.3"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.2"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="15.0"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.8"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.6"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.4"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.2"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="14.1"
                    class="bg-transparent w-11/12"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value="13.9"
                    class="bg-transparent w-11/12"
                  />
                </td>
              </tr>
              <!-- Agrega más filas según sea necesario -->
            </tbody>
          </table>
        </div>

      <button
        @click="sendProduct"
        type="button"
        class="py-3 px-5 default-bar mx-auto mt-3 w-2/3 rounded text-center"
      >
        Agregar
      </button>
    </form>
  </div>

  <CModal alignment="center" :visible="visible" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img
          src="@/assets/Nav/X.svg"
          alt="Close alert"
          @click="closeModal"
          class="justify-self-end"
        />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Agregado con éxito
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Agroec agregará el producto de interés a la Aplicación.
          </p>
        </div>
      </div>
    </CModalBody>
  </CModal>
</template>

<style scoped>

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>

<script allowJs>
import { mapGetters, mapActions } from "vuex";
import { CModal, CModalBody } from "@coreui/vue";
export default {
  computed: {
    ...mapGetters(["getProducts"]),
  },
  components: {
    CModal,
    CModalBody,
  },
  data() {
    return {
      visible: false,
      parametros: false,
      castigos: false,
      paramSelected: false,
      param: "",
      minmax: "",
      isActive: true,
      borders: true,
      parametroData: false,
      minParametro: 0,
      maxParametro: 0,
      nombreParametro: "",
      fruits: ["Aguacate", "Maiz", "Tomate", "Cacao", "Papa", "Arroz"],
      newParametros: [],
    };
  },
  methods: {
    ...mapActions(["updateProduct"]),
    sendProduct() {
      if (this.param == "") return;
      this.updateProduct({
        nombre: this.param,
        parametros: this.parametros,
        castigos: this.castigos,
      });
      this.visible = true;
    },
    closeModal() {
      // Close the menu by setting menuOpen to false
      this.visible = false;
    },
    deleteParametro(x) {
      return (this.newParametros = this.newParametros.filter((y) => y != x));
    },
    newParametro() {
      if (
        this.nombreParametro != "" &&
        this.minParametro != "" &&
        this.maxParametro != ""
      ) {
        this.newParametros.push({
          nombre: this.nombreParametro,
          min: this.minParametro,
          max: this.maxParametro,
        });
        return;
      }
    },
    filteredList() {
      return this.fruits.filter((fruit) =>
        fruit.toLowerCase().includes(this.param.toLowerCase())
      );
    },
    setProduct(product) {
      this.param = product;
      this.paramSelected = false;
      this.borders = true;
    },
    checkParam() {
      this.paramSelected = true;
      if (this.param != "") {
        this.borders = false;
      } else {
        this.borders = true;
      }
    },
    addParametro() {
      this.parametroData = !this.parametroData;
    },
  },
};
</script>
