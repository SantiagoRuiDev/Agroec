<template>
  <div class="system-chat mt-2 border-green-600 border-opacity-10 border-2 rounded-lg p-2 w-11/12 mx-auto"
    v-if="suscription">
    <h1 class="font-bold second-color text-xl text-center" v-if="suscription.estado == 1">SUBSCRIPCIÓN ACTIVA</h1>
    <h1 class="font-bold second-color text-xl text-center" v-if="suscription.estado == 0">SUBSCRIPCIÓN CANCELADA</h1>

    <div class="inline-flex items-center justify-between w-full">
      <div class="grid mt-1">
        <label for="canton" class="second-color text-left font-bold">Tipo</label>
        <h2 class="second-color font-bold text-left text-xl">
          {{ suscription.nombre }}
        </h2>
      </div>
      <div class="grid mt-1">
        <label for="canton" class="second-color text-left font-bold">Prox. Cobro</label>
        <h2 class="second-color font-bold text-left text-xl" v-if="suscription.estado == 1">
          {{ formatDateTime(suscription.vencimiento).plainDate }}
        </h2>
        <h2 class="second-color font-bold text-left text-xl" v-else>
          No se cobrara
        </h2>
      </div>
      <div class="grid mt-1">
        <label for="canton" class="second-color text-left font-bold">Total</label>
        <h2 class="second-color font-bold text-left text-xl">
          {{ formatToUSD(suscription.valor) }}
        </h2>
      </div>
    </div>

    <button v-if="suscription.estado == 1" @click="openSuscriptionModal"
      class="bg-black rounded-md w-full text-center text-white p-2 font-bold mt-3">Cancelar
      Suscripción</button>
  </div>

  <div class="licitacion mb-2 w-full md:w-5/6 mx-auto grid">
    <form class="mx-auto flex items-center gap-3 w-11/12 md:w-1/2 mt-3 justify-evenly">
      <div class="grid mt-3 gap-2 relative w-full">
        <label for="filtroUnidad" class="text-gray-500 font-bold text-sm">Filtrar por unidad</label>
        <select id="filtroUnidad" name="filtroUnidad"
          class="w-full text-gray-500 bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md">
          <option value="0" selected disabled>Unidad</option>
          <option value="1">QQ</option>
          <option value="2">KG</option>
        </select>
      </div>
      <div class="grid mt-3 gap-2 relative w-full">
        <label for="filtroVendedor" class="text-gray-500 font-bold text-sm">Filtrar por vendedor</label>
        <select id="filtroVendedor" name="filtroVendedor"
          class="w-full text-gray-500 bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md">
          <option value="0" selected disabled>Vendedor</option>
          <option value="1">Agricultor</option>
          <option value="2">Asociación de Agricultor</option>
          <option value="3">Agroquimica</option>
          <option value="4">Comerciante</option>
        </select>
      </div>
    </form>
    <form class="mx-auto flex items-center gap-3 w-11/12 md:w-1/2 mt-3 justify-evenly">
      <div class="grid mt-3 gap-2 relative">
        <label for="Inicio" class="text-gray-500 font-bold text-sm">Fecha: Desde</label>
        <input type="date" name="Inicio"
          class="w-full text-gray-500 bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
      </div>
      <div class="grid mt-3 gap-2 relative">
        <label for="Fin" class="text-gray-500 font-bold text-sm">Fecha: Hasta</label>
        <input type="date" name="Fin"
          class="w-full text-gray-500 bg-transparent border-2 border-gray-300 px-3 py-3 rounded-md" />
      </div>
    </form>

    <div class="grid gap-6 grid-cols-2 mx-auto justify-center w-11/12 mt-4">
      <div @click="show" class="statistic-card pt-6 pb-2 border border-gray-200 h-auto rounded-md grid gap-2">
        <Analytic type="line"></Analytic>
        <p class="text-gray-400 font-bold text-sm text-center w-5/6 mx-auto">
          Evolución de tu precio Agricultor
        </p>
      </div>

      <div @click="show" class="statistic-card pt-6 pb-2 border border-gray-200 h-auto rounded-md grid gap-2">
        <Analytic type="line"></Analytic>
        <p class="text-gray-400 font-bold text-sm text-center w-5/6 mx-auto">
          Evolución de tu precio Comerciante
        </p>
      </div>

      <div @click="show" class="statistic-card pt-6 pb-2 border border-gray-200 h-auto rounded-md grid gap-2">
        <Analytic type="bar"></Analytic>
        <p class="text-gray-400 font-bold text-sm text-center w-5/6 mx-auto">
          Cantidad comprada por tipo de cliente (tm)
        </p>
      </div>

      <div @click="show" class="statistic-card pt-6 pb-2 border border-gray-200 h-auto rounded-md grid gap-2">
        <Analytic type="bar"></Analytic>
        <p class="text-gray-400 font-bold text-sm text-center w-5/6 mx-auto">
          Cantidad comprada por zona (Cantón)
        </p>
      </div>
    </div>

    <div class="mx-auto w-11/12 mt-3 md:w-4/6" v-if="showTendencia">
      <table class="text-gray-500">
        <thead>
          <tr>
            <th class="text-sm text-gray-50">Provincia</th>
            <th class="text-sm text-gray-50">Rango Precio (USD x QQ)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pedro Carbo</td>
            <td>
              <div class="inline-flex justify-center items-center gap-2">
                $25 - $35
                <svg fill="#2db412" class="rotate" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 123.959 123.959"
                  xml:space="preserve">
                  <g>
                    <path d="M85.742,1.779l-56,56c-2.3,2.3-2.3,6.1,0,8.401l56,56c3.801,3.8,10.2,1.1,10.2-4.2v-112
                    C95.942,0.679,89.543-2.021,85.742,1.779z" />
                  </g>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td>Guayas</td>
            <td>
              <div class="inline-flex justify-center items-center gap-2">
                $55 - $75
                <svg fill="#ff4961" class="rotateminor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 123.959 123.959"
                  xml:space="preserve">
                  <g>
                    <path d="M85.742,1.779l-56,56c-2.3,2.3-2.3,6.1,0,8.401l56,56c3.801,3.8,10.2,1.1,10.2-4.2v-112
                    C95.942,0.679,89.543-2.021,85.742,1.779z" />
                  </g>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td>Azuay</td>
            <td>
              <div class="inline-flex justify-center items-center gap-2">
                $35 - $45
                <span class="bg-indigo-500 rounded-full text-gray-50 text-xs p-1">MAX</span>
              </div>
            </td>
          </tr>
          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>

    <div class="grid md:grid-cols-2 md:w-2/3 mx-auto md:gap-4">
      <button @click="showModal" v-if="suscription" class="default-bar p-3 h-16 rounded-md text-center text-white mt-4">
        Desbloquear más reportes
      </button>

      <button @click="manageTendencias" v-if="!showTendencia"
        class="default-bar p-3 h-16 rounded-md text-center text-white mt-4">
        Mostrar tendencia de precios
      </button>
      <button @click="manageTendencias" v-if="showTendencia"
        class="default-bar p-3 h-16 rounded-md text-center text-white mt-4">
        Ocultar tendencia de precios
      </button>
    </div>
  </div>

  <CModal alignment="center" :visible="cancel_modal" @close="closeSuscriptionModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Cancelar suscripción
        </h2>
        <p class="text-center text-gray-600 mx-auto">
          Si cancelas tu suscripción recurrente, no te cobraremos en el proximo vencimiento, pero dejaras de tener
          acceso a los beneficios adquiridos, si quieres recuperar la suscripción deberes esperar para volver a
          suscribirte o contactar al soporte
        </p>
        <div class="mx-auto text-center inline-flex gap-2">
          <button class="text-white text-center grid items-center h-10 w-12 font-bold rounded default-bar"
            @click="cancelSuscription">
            Si
          </button>
          <button class="text-white text-center grid items-center h-10 w-12 font-bold rounded bg-red-500"
            @click="closeSuscriptionModal">
            No
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="visible" @close="closeModal">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3 h-modal md:h-96 overflow-y-scroll">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          ¿Quieres ver más reportes?
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400 text-sm w-3/4 mx-auto">
            Accede a uno de nuestros planes y obten herramientas de gestion.
          </p>

          <div class="grid mt-2 gap-2 w-3/4 mx-auto">
            <ul class="text-gray-400 text-left grid gap-2">
              <li class="inline-flex gap-2 items-center">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
                    fill="#9CA3AF" />
                </svg>

                Tus precios vs mercado
              </li>
              <hr />

              <li class="inline-flex gap-2 items-center">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
                    fill="#9CA3AF" />
                </svg>
                Precio por zona
              </li>
              <hr />

              <li class="inline-flex gap-2 items-center">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
                    fill="#9CA3AF" />
                </svg>
                Información demográfica
              </li>
              <hr />

              <li class="inline-flex gap-2 items-center">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
                    fill="#9CA3AF" />
                </svg>
                Demanda del mercado
              </li>
              <hr />

              <li class="inline-flex gap-2 items-center">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34874 18.9425 4.80691 17.0678 2.93219C15.1931 1.05746 12.6513 0.00294858 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.1539 14.1544 15.6542 15.6542C14.1544 17.1539 12.121 17.9976 10 18ZM10 9.5C9.73479 9.5 9.48043 9.60536 9.2929 9.79289C9.10536 9.98043 9 10.2348 9 10.5V13.5C9 13.7652 9.10536 14.0196 9.2929 14.2071C9.48043 14.3946 9.73479 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V10.5C11 10.2348 10.8946 9.98043 10.7071 9.79289C10.5196 9.60536 10.2652 9.5 10 9.5ZM10 5.5C9.75278 5.5 9.5111 5.57331 9.30554 5.71066C9.09998 5.84801 8.93976 6.04324 8.84516 6.27165C8.75055 6.50005 8.72579 6.75139 8.77402 6.99386C8.82225 7.23634 8.94131 7.45907 9.11612 7.63388C9.29094 7.8087 9.51367 7.92775 9.75614 7.97598C9.99862 8.02421 10.25 7.99946 10.4784 7.90485C10.7068 7.81024 10.902 7.65002 11.0393 7.44446C11.1767 7.2389 11.25 6.99723 11.25 6.75C11.25 6.41848 11.1183 6.10054 10.8839 5.86612C10.6495 5.6317 10.3315 5.5 10 5.5Z"
                    fill="#9CA3AF" />
                </svg>
                Precio por estacionalidad
              </li>
            </ul>
          </div>
          <div class="grid mt-4 w-3/4 mx-auto">
            <label for="canton" class="text-gray-500 text-left font-bold">Plan</label>

            <div class="custom-select bg-transparent text-gray-500 border-2 border-gray-200 rounded-md"
              @mouseenter="toggleDropdown">
              <div class="select-selected border-">{{ selectedOption.name }}</div>
              <div v-if="isOpen" class="select-items">
                <div v-for="option in options" :key="option" @click="selectOption(option)">
                  {{ option.name }}
                </div>
              </div>
            </div>
          </div>

          <div class="grid mt-3 w-3/4 mx-auto" v-if="tipo != null">
            <label for="canton" class="text-gray-500 text-left font-bold">Total</label>
            <h2 class="text-gray-400 font-bold text-left text-3xl">
              <span class="default-color">$</span>{{ tipo }}
            </h2>
          </div>

          <button class="default-bar p-2 w-3/4 h-16 rounded-md text-center text-white mx-auto mt-4"
            @click="procederPago">
            Realizar pago
          </button>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="excel" @close="downloadExcel">
    <CModalBody>
      <div class="grid w-full gap-3 pb-2">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="downloadExcel" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 w-3/4 mx-auto">
          Exportación de gráficos en Excel
        </h2>
        <div class="mx-auto text-center">
          <p class="text-gray-400">
            Descarga una planilla, con los datos de tus gráficos actuales.
          </p>
        </div>
        <button class="default-bar rounded-md py-1 shadow-md w-1/2 mx-auto text-center text-white font-bold">
          Confirmar
        </button>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="grafico" @close="closeGrafico">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <div class="inline-flex justify-between">
          <img src="@/assets/ExcelBlack.svg" alt="Back" class="w-6 h-6 mr-2" v-on:click="downloadExcel" />
          <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeGrafico" class="justify-self-end" />
        </div>
        <h2 class="text-center text-xl font-bold text-gray-500 w-5/6 mx-auto">
          Grafico
        </h2>
        <div class="mx-auto text-center">
          <Analytic type="line" class="mx-auto" :extended="true"></Analytic>
        </div>
      </div>
    </CModalBody>
  </CModal>

  <CModal alignment="center" :visible="pagarSuscripcion" @close="procederPago">
    <CModalBody>
      <div class="grid w-full gap-3 pb-3">
        <img src="@/assets/Nav/X.svg" alt="Close alert" @click="closeModal" class="justify-self-end" />
        <h2 class="text-center text-xl font-bold text-gray-500 mx-auto">
          Metodo de pago
        </h2>
        <div class="mx-auto grid gap-2">
          <div class="grid mt-4">
            <select id="paymentMethod" v-model="paymentMethod"
              class="w-full mx-auto bg-transparent border-2 border-gray-300 p-2 rounded-md text-gray-600">
              <option value="TD/TC">TC/TD</option>
              <option value="TRANSFERENCIA">Transferencia Bancaria</option>
            </select>
          </div>

          <div class="grid gap-1 mx-auto mt-3 w-full" v-if="paymentMethod == 'TRANSFERENCIA'">
            <label for="garantia" class="text-gray-700">Transferencia Bancaria</label>
            <li class="text-gray-700">Numero Cuenta: 0000005721192722</li>
            <li class="text-gray-700">Banco: Banco A</li>
            <li class="text-gray-700">
              Contacta con área financiera vía WhatsApp
              <a href="wa.link/10nq8r" class="font-bold" target="_blank">+593 96 319 5377</a>
            </li>
          </div>

          <div class="form-input grid gap-1 mt-2" v-if="paymentMethod == 'TD/TC' && cards.length > 0">
            <label for="tarjeta" class="text-gray-600 font-bold">Elige una tarjeta</label>
            <select name="tarjeta" v-model="identificador" id="tarjeta"
              class="bg-transparent p-2 h-12 border-2 rounded-md w-auto text-gray-700">
              <option v-for="card in cards" :key="card.identifier" :value="card.identifier">{{
                String(card.card_brand).toUpperCase() }} - {{ card.number.slice(0, 4) }} {{ card.number.slice(4, 8) }}
              </option>
            </select>
          </div>

          <div class="form-input grid gap-1" v-if="paymentMethod == 'TD/TC' && cards.length > 0">
            <label for="documento" class="text-gray-600 font-bold">Confirma el numero de documento</label>
            <input type="text" id="documento" @change="verifyDocument" v-model="documento"
              placeholder="El mismo que el de la tarjeta"
              class="bg-transparent p-2 h-12 border-2 rounded-md w-auto text-gray-700" />
          </div>

          <div class="form-input grid gap-1 my-3" v-if="paymentMethod == 'TD/TC' && cards.length == 0">
            <label for="documento" class="text-gray-600 font-bold w-full">No se encontraron tarjetas asociadas</label>
            <RouterLink to="/app/cards/add"
              class="mt-1 dark-bar grid items-center text-center text-white font-bold p-2 h-12 rounded-md">
              Agregar tarjeta
            </RouterLink>
          </div>

          <div class="form-input grid gap-1 my-3" v-if="paymentMethod == 'TD/TC' && cards.length > 0">
            <RouterLink to="/app/cards/add"
              class="mt-1 dark-bar grid items-center text-center text-white font-bold p-1 h-12 rounded-md">
              Agregar nueva tarjeta
            </RouterLink>
          </div>

        </div>
        <button @click="subscribe" v-if="!paymentWaiting && (paymentMethod == 'TD/TC' && cards.length > 0)"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-1/2 rounded-md">
          Pagar
        </button>
        <button v-if="paymentWaiting"
          class="mt-1 default-bar text-white font-bold shadow p-2 h-12 mx-auto w-1/2 rounded-md">
          <div style="border-top-color:transparent"
            class="w-8 h-8 mx-auto border-4 border-white-400 border-solid rounded-full animate-spin"></div>
        </button>
      </div>
    </CModalBody>
  </CModal>
</template>

<script allowJs>
import Analytic from "@/components/dashboard/Analytic.vue";
import { CModal, CModalBody, CFormSelect } from "@coreui/vue";
import * as walletService from '@/services/wallet.service.js'
import * as suscriptionService from '@/services/suscription.service.js'
import { emitAlert } from "@/libs/alert.js";
import { formatDateTime } from '@/libs/date.js';
import event from "@/libs/event.js";
export default {
  components: {
    CModal,
    Analytic,
    CModalBody,
    CFormSelect,
  },
  props: {
    Item: String,
  },
  data() {
    return {
      visible: false,
      tipo: null,
      graficoExtendido: null,
      grafico: false,
      showTendencia: false,
      pagarSuscripcion: false,
      excel: false,
      isOpen: false,
      cards: [],
      identificador: "",
      cancel_modal: false,
      documento: "",
      paymentMethod: "TD/TC",
      paymentWaiting: false,
      suscription: null,
      selectedOption: { name: "Selecciona una opción" },
      options: [{ name: "", price: 0, id: "" }], // Agrega aquí tus opciones
    };
  },
  async created() {
    await this.getPlans();
    await this.getSuscription();
    event.on('suscription-modal', () => {
      this.showModal();
    })
    await this.getWalletCards();
  },
  methods: {
    formatDateTime(x) {
      return formatDateTime(x)
    },
    formatToUSD(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    },
    verifyDocument() {
      const value = this.documento; // Obtiene el valor del input y elimina espacios en blanco
      const TEN_DIGITS_TEST = /^[0-9]{10}$/.test(value); // Verifica si son exactamente 10 dígitos
      if (TEN_DIGITS_TEST) {
        return emitAlert("Documento valido", 'success');
      } else {
        return emitAlert("Documento invalido, revisa la cantidad de digitos", "warning");
      }
    },
    async getPlans() {
      try {
        const data = await suscriptionService.getPlans();
        this.options = data.map(
          (plan) => {
            return {
              name: plan.nombre,
              price: plan.valor,
              id: plan.id
            }
          }
        );
      } catch (error) {
        return;
      }
    },
    async subscribe() {
      try {
        await suscriptionService.suscribe(this.selectedOption.id, this.identificador, this.documento);
        await this.getSuscription();
        this.closeModal();
      } catch (error) {
        return emitAlert(error.message, 'error');
      }
    },
    closeSuscriptionModal() {
      this.cancel_modal = false;
    },
    openSuscriptionModal() {
      this.cancel_modal = true;
    },
    async cancelSuscription() {
      try {
        await suscriptionService.cancel();
        emitAlert('Suscripción cancelada correctamente', 'info');
        this.closeSuscriptionModal();
        await this.getSuscription();
      } catch (error) {
        return emitAlert(error.message, 'error');
      }
    },
    async getSuscription() {
      try {
        const data = await suscriptionService.getSuscription();
        this.suscription = data;
        event.emit('suscription-data', this.suscription);
      } catch (error) {
        return emitAlert(error.message, 'error');
      }
    },
    async getWalletCards() {
      try {
        const { cardsInfo } = await walletService.getWalletCards();
        this.cards = cardsInfo;
      } catch (error) {
        return;
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.toggleDropdown();
      this.tipo = option.price;
    },
    downloadExcel() {
      this.closeGrafico();
      this.excel = !this.excel;
    },
    manageTendencias() {
      this.showTendencia = this.showTendencia ? false : true;
    },
    show() {
      this.grafico = true;
    },
    procederPago() {
      this.closeModal();
      this.pagarSuscripcion = !this.pagarSuscripcion;
    },
    closeGrafico() {
      this.grafico = false;
    },
    closeModal() {
      this.visible = false;
      this.pagarSuscripcion = false;
    },
    showModal() {
      this.visible = true;
    },
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  display: inline-block;
}

.select-selected {
  padding: 10px 20px;
  cursor: pointer;
}

.select-items {
  position: absolute;
  background-color: #f1f1f1;
  width: 100%;
  z-index: 1;
}

.select-items div {
  padding: 10px 20px;
  cursor: pointer;
}

.select-items div:hover {
  background-color: #ccc;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #b4b1b1 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 2px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #b4b1b1;
  border-radius: 2px;
  border: 1px solid #ffffff;
}

.rotate {
  transform: rotate(90deg);
}

.rotateminor {
  transform: rotate(-90deg);
}

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
  background-color: #a8cf7b;
  text-align: left;
}

.h-modal {
  height: 70vh;
}
</style>
