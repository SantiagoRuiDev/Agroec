import { reactive } from "vue";
import { io } from "socket.io-client";
import { getToken, getMultiuserToken } from "@/libs/storage";
import { production } from "@/libs/axios";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = production
  ? "https://agroec-api.onrender.com"
  : "http://localhost:3000";

let socket; // Declarar el socket fuera de la función

// Función asíncrona para inicializar el socket con el token
export async function initializeSocket() {
  const token = await getToken(); // Obtener el token
  const multiuser_token = await getMultiuserToken(); // Obtener el token
  socket = io(URL, {
    extraHeaders: {
      Authorization: `Bearer ${token}`, // Token de usuario principal
      'x-multiuser-token': multiuser_token
    },
  });

  // Configurar eventos
  socket.on("connect", () => {
    state.connected = true;
  });

  socket.on("disconnect", () => {
    state.connected = false;
  });

  socket.on("foo", (...args) => {
    state.fooEvents.push(args);
  });

  socket.on("bar", (...args) => {
    state.barEvents.push(args);
  });
}


export { socket }; // Exportar el socket para su uso en otras partes del código
