<template>
  <!-- drawer component -->
  <div
    v-if="menuOpen"
    id="drawer-navigation"
    class="fixed top-0 left-0 z-40 w-68 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-navigation-label"
  >
    <h5
      id="drawer-navigation-label"
      class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
    >
      AGROEC
    </h5>
    <button
      type="button"
      @click="closeMenu"
      data-drawer-hide="drawer-navigation"
      aria-controls="drawer-navigation"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li>
          <RouterLink
            to="/profile"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#a2afbe"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g>
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"
                />
              </g>
            </svg>
            <span class="ml-3 text-gray-500">Mi Perfil</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/orders"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              height="24px"
              width="24px"
              fill="#a2afbe"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 470 470"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M290,102.736c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S285.589,102.736,290,102.736z"
                />
                <path
                  d="M270,72.736c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S265.589,72.736,270,72.736z"
                />
                <path
                  d="M190,94.736c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S185.589,94.736,190,94.736z"
                />
                <path
                  d="M406.322,409.316l-10.934-10.934l-6.57-188.861c11.321-3.342,19.608-13.826,19.608-26.215v-38.138
		c0-15.072-12.262-27.334-27.334-27.334h-18.28C300.124,25.442,272.378,0,235,0c-37.378,0-65.124,25.442-127.813,117.835h-18.28
		c-15.072,0-27.334,12.262-27.334,27.334v38.138c0,12.389,8.287,22.873,19.608,26.215l-6.57,188.861l-10.935,10.934
		c-13.034,13.035-13.034,34.244,0,47.278c6.314,6.314,14.709,9.792,23.64,9.792c8.93,0,17.324-3.477,23.639-9.792l1.647-1.647
		C146.97,464.267,193.347,470,235,470s88.03-5.733,122.397-15.053l1.647,1.647c6.314,6.314,14.709,9.792,23.639,9.792
		c8.931,0,17.325-3.477,23.64-9.792C419.357,443.56,419.357,422.351,406.322,409.316z M369.652,445.988l-4.748-4.748
		c-1.931-1.93-4.758-2.66-7.384-1.903C324.048,448.999,277.101,455,235,455s-89.048-6.001-122.521-15.663
		c-2.629-0.757-5.452-0.027-7.384,1.903l-4.748,4.748c-3.48,3.481-8.108,5.398-13.031,5.398c-4.924,0-9.552-1.917-13.032-5.398
		c-7.187-7.187-7.187-18.879-0.001-26.065L87.307,406.9c1.343-1.343,2.127-3.145,2.192-5.042l6.651-191.216h22.757
		c4.143,0,7.5-3.358,7.5-7.5c0-4.142-3.357-7.5-7.5-7.5h-30c-6.801,0-12.334-5.533-12.334-12.334v-38.138
		c0-6.801,5.533-12.334,12.334-12.334h292.186c6.801,0,12.334,5.533,12.334,12.334v38.138c0,6.801-5.533,12.334-12.334,12.334
		H148.907c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5H373.85l6.651,191.216c0.065,1.898,0.85,3.7,2.192,5.042
		l13.022,13.023c7.187,7.186,7.187,18.879,0,26.065c-3.48,3.481-8.108,5.398-13.032,5.398
		C377.761,451.386,373.133,449.469,369.652,445.988z M235,15c30.151,0,54.572,22.467,109.659,102.835H125.341
		C180.428,37.467,204.849,15,235,15z"
                />
                <path
                  d="M331.563,254.125l-28.604,29.458l-28.604-29.458c-1.412-1.455-3.354-2.275-5.381-2.275s-3.969,0.821-5.381,2.276
		l-28.6,29.457l-28.598-29.457c-1.412-1.455-3.354-2.276-5.381-2.276s-3.969,0.821-5.381,2.276l-28.599,29.457l-28.598-29.457
		c-2.885-2.972-7.631-3.042-10.605-0.157c-2.972,2.885-3.042,7.634-0.156,10.605l33.979,35c1.412,1.455,3.354,2.276,5.381,2.276
		s3.969-0.821,5.381-2.276l28.599-29.457l28.598,29.457c1.412,1.455,3.354,2.276,5.381,2.276s3.969-0.821,5.381-2.276l28.6-29.458
		l28.604,29.458c1.412,1.455,3.354,2.275,5.381,2.275s3.969-0.821,5.381-2.275l33.985-35c2.886-2.972,2.815-7.72-0.156-10.605
		C339.197,251.083,334.448,251.152,331.563,254.125z"
                />
              </g>
            </svg>
            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Mis Órdenes</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/transacciones"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
            ><svg
              height="24px"
              width="24px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 235.517 235.517"
              xml:space="preserve"
            >
              <g>
                <path
                  style="fill: #a2afbe"
                  d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473
		c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549
		c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251
		c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843
		c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021
		c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029
		c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12
		c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549
		c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
                />
              </g>
            </svg>
            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Mi Billetera</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/garantias"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
            ><svg
              height="24px"
              width="24px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 235.517 235.517"
              xml:space="preserve"
            >
              <g>
                <path
                  style="fill: #a2afbe"
                  d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473
		c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549
		c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251
		c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843
		c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021
		c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029
		c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12
		c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549
		c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
                />
              </g>
            </svg>
            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Garantías</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/licitaciones/filter"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              fill="#a2afbe"
              viewBox="0 -960 960 960"
            >
              <path
                d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z"
              />
            </svg>

            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Mis Licitaciones</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/sugerir"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="#a2afbe"
            >
              <path
                d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"
              />
            </svg>
            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Sugerir Producto</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/multiusuarios"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#a2afbe"
            >
              <path
                d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"
              />
            </svg>

            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Multiusuarios</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/multiusuarios"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24px"
              fill="#a2afbe"
              viewBox="0 0 50 50"
            >
              <path
                d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"
              />
            </svg>

            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Soporte WhatsApp</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/app/home"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#a2afbe"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <path
                  d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1L12,1z M11,7h2v2h-2V7z M11,11h2v6h-2V11z"
                />
              </g>
            </svg>
            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap"
              >Términos y Condiciones</span
            >
          </RouterLink>
        </li>
        <li>
          <button @click="logout"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="#a2afbe"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
            <span class="flex-1 ml-3 text-gray-500 whitespace-nowrap">Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMultiuserToken, removeMultiuserToken, removeToken } from '@/libs/storage.js';
import * as authService from '../../services/auth.service.js'
export default {
  name: "Sidebar",
  props: {
    menuOpen: Boolean,
  },
  methods: {
    closeMenu() {
      // Emit a custom event to request the parent to close the menu
      this.$emit("close-menu-request");
    },
    async logout(){
      try {
        await authService.finalizeSession()
        await removeToken().then(async () => {
          if(await getMultiuserToken()){
            await removeMultiuserToken();
          }
          window.location.href="/app/signin"
        }) 
      } catch (error) {
        return;
      }
    }
  },
};
</script>
