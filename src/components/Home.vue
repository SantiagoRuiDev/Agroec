<template>
  <div class="portait">
    <img
      src="@/assets/IconClean.svg"
      alt="App Icon"
      class="h-48 w-48 mx-auto"
    />
  </div>
  <div class="content w-11/12 mx-auto grid mb-5 mt-2 gap-2 md:w-3/4">
    <Slider />

    <div class="inline-flex my-1">
      <div class="content-message grid gap-2 text-left w-full items-center">
        <h1 class="font-bold text-md text-gray-600">Hola, Santiago</h1>
        <p class="text-md text-gray-400">Bienvenido a Agroec</p>
      </div>

      <div class="w-11/12 mx-auto text-right grid gap-2">
        <h1 class="text-gray-600 font-bold text-md text-right">
          Saldo Total
        </h1>
        <h1 class="text-green font-bold text-md text-right">$36</h1>
      </div>
    </div>

    <div
      class="content-cards grid grid-cols-3 gap-2 items-center justify-center"
    >
      <!--TOP GRID-->
      <RouterLink to="/app/market">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <img
            src="@/assets/AgroIcon.svg"
            alt="App Icon"
            class="w-12 h-12 mx-auto"
          />
          <h1 class="text-gray-500 text-sm font-bold">Tu comercio</h1>
        </div>
      </RouterLink>

      <RouterLink to="/app/filter/tutorials">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <img
            src="@/assets/Tutoriales.svg"
            alt="App Icon"
            class="w-12 h-12 mx-auto"
          />
          <h1 class="text-gray-500 text-sm font-bold">Tutoriales</h1>
        </div>
      </RouterLink>

      <RouterLink to="/app/insumos">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <img
            src="@/assets/Insumos.svg"
            alt="App Icon"
            class="w-12 h-12 mx-auto"
          />
          <h1 class="text-gray-500 text-sm font-bold">Insumos</h1>
        </div>
      </RouterLink>
      <!--TOP GRID-->

      <!--MIDDLE GRID-->
      <RouterLink to="/filtered/orders">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <span class="text-green-new text-4xl font-bold">5</span>
          <h1 class="text-gray-500 text-xs font-bold">Órdenes por recibir</h1>
        </div>
      </RouterLink>

      <RouterLink to="/app/home">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <span class="text-green-new text-4xl font-bold">8</span>
          <h1 class="text-gray-500 text-xs font-bold">Órdenes Recibidas</h1>
        </div>
      </RouterLink>

      <RouterLink to="/app/home">
        <div
          class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <span class="text-green-new text-4xl font-bold">7</span>
          <h1 class="text-gray-500 text-xs font-bold">
            Propuestas de vendedores
          </h1>
        </div>
      </RouterLink>
      <!--MIDDLE GRID-->

      <!--BOTTOM GRID-->
      <div
        class="card p-1 w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
      >
        <div class="flex justify-center">
          <img src="@/assets/Star.svg" alt="Calificacion" class="h-4 w-4" />
          <img src="@/assets/Star.svg" alt="Calificacion" class="h-4 w-4" />
          <img src="@/assets/Star.svg" alt="Calificacion" class="h-4 w-4" />
          <img src="@/assets/Star.svg" alt="Calificacion" class="h-4 w-4" />
          <img src="@/assets/Star.svg" alt="Calificacion" class="h-4 w-4" />
        </div>
        <h1 class="text-gray-500 text-xs font-bold">Tu Calificación</h1>
      </div>

      <RouterLink to="/app/propuestas/filter">
        <div
          class="card w-full h-28 border rounded-md border-gray-300 grid text-center items-center relative"
        >
          <span class="text-green-new text-4xl font-bold">7</span>
          <p class="text-gray-500 text-xs font-bold">Negociaciones Abiertas</p>
          <span class="bg-red-600 rounded-full h-6 grid items-center w-6 text-center text-white text-xs absolute -top-1 -right-1">9</span>
        </div>
      </RouterLink>

      <RouterLink to="/app/home">
        <div
          class="card w-full h-28 border rounded-md border-gray-300 grid text-center items-center"
        >
          <span class="text-green-new text-4xl font-bold">7</span>
          <h1 class="text-gray-500 text-xs font-bold">Licitaciones activas</h1>
        </div>
      </RouterLink>
      <!--BOTTOM GRID-->
    </div>

    <RouterLink
      to="/app/dashboard"
      class="text-center py-3 px-1 default-bar mx-auto my-6 w-5/6 rounded md:w-1/4"
    >
      Gestión por producto
    </RouterLink>

    <div
      class="mt-5 p-3 h-24 border-gray-300 rounded-md border-2 grid items-center grid-cols-2 md:w-3/4 mx-auto gap-2 justify-items-center"
    >
      <h1 class="font-bold text-gray-600">Contacta a un Asesor</h1>
      <button
        class="rounded-md p-2 h-12 default-bar md:w-3/4 mx-auto flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24px"
          fill="#ffffff"
          viewBox="0 0 50 50"
        >
          <path
            d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"
          />
        </svg>
        <p class="text-zinc-50 text-xs font-bold">Soporte WhatsApp</p>
      </button>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
export default {
  name: "Home",
  components: {
    Slider,
  },
};
</script>

<style scoped>
.portait {
  height: 168px;
  background: linear-gradient(to bottom, #3b4c28, #455d29, #456025);
}
</style>
