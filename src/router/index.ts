import { isAuthentified } from "@/services/auth.service";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/app/signin",
  },
  {
    path: "/app/signin",
    component: () => import("@/views/Session/login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/app/signup",
    component: () => import("@/views/Session/register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/app/password",
    component: () => import("@/views/Session/password.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/sale/:name/:identifier",
    name: "chatDeals",
    component: () => import("@/views/User/Deal.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/propuesta/:name/:identifier",
    name: "propuestaDeals",
    component: () => import("@/views/User/Propuesta.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/print",
    name: "printDetails",
    component: () => import("@/views/User/Print.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/licitacion/:product",
    component: () => import("@/views/User/LicitacionRecibida.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/chat/licitacion/:name/:identifier",
    component: () => import("@/views/User/ChatLicitacion.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/chat/oferta/:name",
    name: "chatOferta",
    component: () => import("@/views/User/ChatOferta.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/chat/orden/:name/:identifier",
    name: "chatOrden",
    component: () => import("@/views/User/ChatOrden.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/review/:name/:identifier",
    component: () => import("@/views/User/ReviewOferta.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    component: () => import("@/views/User/Orders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/filtered/orders",
    component: () => import("@/views/User/FilteredOrders.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: () => import("@/views/User/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/:identifier",
    component: () => import("@/views/User/OrderStatus.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/status/unpaid",
    component: () => import("@/views/User/OrderStatusUnpaid.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/insumos/filter",
    component: () => import("@/views/User/Insumos.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/insumos/:id",
    component: () => import("@/views/User/InsumosInfo.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/insumos/details/:id",
    component: () => import("@/views/User/InsumosDetalles.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/tutorials/:category",
    component: () => import("@/views/User/Tutorials.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/filter/tutorials",
    component: () => import("@/views/User/Categorias.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/market",
    component: () => import("@/views/User/MarketDeals.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/product/:name",
    name: "product",
    component: () => import("@/views/User/Product.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/add/product/",
    component: () => import("@/views/User/AddProduct.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/dashboard",
    component: () => import("@/views/User/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/multiusuarios",
    component: () => import("@/views/User/Multi.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/sugerir",
    component: () => import("@/views/User/Sugerir.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/multiusuarios/crear",
    component: () => import("@/views/User/Multicrear.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/multiusuarios/rol",
    component: () => import("@/views/User/Multiroles.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/multiusuarios/editar/:identifier",
    component: () => import("@/views/User/Multieditar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/transacciones",
    component: () => import("@/views/User/Transacciones.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/garantias",
    component: () => import("@/views/User/Garantias.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/recargar",
    component: () => import("@/views/User/Recargar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/manage/:name",
    component: () => import("@/views/User/Manage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/licitar",
    component: () => import("@/views/User/Licitaciones.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/licitar/:name",
    component: () => import("@/views/User/Licitar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/licitacion/editar/:name/:id",
    component: () => import("@/views/User/LicitacionEditar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/propuestas/recibidas",
    component: () => import("@/views/User/PropuestasRecibidas.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/propuestas/filter",
    component: () => import("@/views/User/PropuestasProductoFilter.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/propuestas/:product",
    component: () => import("@/views/User/PropuestasProducto.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/add/product/interested/:from",
    component: () => import("@/views/User/InterestedProduct.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/app/licitaciones/filter",
    component: () => import("@/views/User/LicitacionesFilter.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/licitaciones/:name",
    component: () => import("@/views/User/MisLicitaciones.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/notifications",
    component: () => import("@/views/User/Notifications.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/app/vendedor/:identifier",
    component: () => import("@/views/User/PerfilVendedor.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach(async (to, from, next) => {
  try {
    const response = await isAuthentified();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Rutas que requieren autenticación
      if (response.loggedIn) {
        next(); // Usuario autenticado, continuar a la ruta
      } else {
        if (to.path !== "/app/signin") {
          next("/app/signin"); // Usuario no autenticado, redirigir a login
        } else {
          next(); // Ya está en la página de login, evitar bucle
        }
      }
    } else {
      // Rutas que no requieren autenticación
      if (response.loggedIn) {
        next("/app/home"); // Si está autenticado y quiere ir a signin, redirigir a home
      } else {
        next(); // Continuar a la ruta deseada
      }
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
    if (to.matched.some((record) => !record.meta.requiresAuth)) {
      next(); // En caso de error, redirigir a login si no está ahí
    } else {
      next("/app/signin")
    }
  }
});