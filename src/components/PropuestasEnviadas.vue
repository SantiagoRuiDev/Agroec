<template>
  <div class="content w-full mx-auto grid my-2 gap-2">
    <div class="grid gap-1">
      <div class="tutorial-card w-full p-2 gap-2 grid" v-if="proposals.length > 0">
        <div class="w-11/12 mx-auto flex gap-3 justify-between" v-for="proposal in proposals" :key="proposal">
          <RouterLink class="message-incoming flex gap-2 w-full" v-if="proposal.lastMessage && proposal.lastMessage.id_remitente != 'Sistema'" :to="'/chat/licitacion/' + proposal.id_producto + '/' + proposal.chat_id">
            <div class="grid gap-2 justify-center items-end text-center text-gray-700 text-sm max-w-16">
              <ProfileIcon :profile="proposal.tipo_perfil" :height="true" :weight="true"></ProfileIcon>
            </div>
            <div class="grid gap-1 w-full">
              <div class="grid text-gray-600">
                <p class="text-sm"><span class="font-bold text-base">{{ proposal.tipo_perfil }}</span>
                  {{ proposal.provincia }}, {{ proposal.canton }}</p>
              </div>
              <div class="message-content rounded-md p-2 w-full grid"
                  :class="{'outgoing-chat': proposal.lastMessage.leido == 0, 'incoming-chat': proposal.lastMessage.leido == 1}"
                v-if="proposal.lastMessage && proposal.lastMessage.id_remitente == proposal.id_vendedor">
                <p class="text-sm text-gray-800" :class="{'font-bold': proposal.lastMessage.leido == 0}">
                  {{ proposal.lastMessage.texto }}
                </p>
                <span class="text-gray-700 text-xs justify-self-end hour-text">{{ formatDateTime(proposal.lastMessage.fecha).whenMessageSent }}
                  {{ formatDateTime(proposal.lastMessage.fecha).time }}</span>
              </div>
              <div class="message-content incoming-chat rounded-md p-2 w-full grid"
                v-if="proposal.lastMessage && proposal.lastMessage.id_remitente != proposal.id_vendedor">
                <p class="text-sm text-gray-800">
                  {{ proposal.lastMessage.texto }}
                </p>
                <span class="text-gray-700 text-xs justify-self-end hour-text">{{ formatDateTime(proposal.lastMessage.fecha).whenMessageSent }}
                  {{ formatDateTime(proposal.lastMessage.fecha).time }}</span>
              </div>
              <div class="message-content incoming-chat rounded-md p-2 w-full grid" v-if="!proposal.lastMessage">
                <p class="text-sm text-gray-800">
                  Envia el primer mensaje de la negociación
                </p>
              </div>
            </div>
          </RouterLink>
          <RouterLink class="message-incoming flex gap-2 w-full" :to="'/chat/licitacion/' + proposal.id_producto + '/' + proposal.chat_id" v-else>
            <div class="grid gap-2 justify-center text-center text-gray-700 text-sm">
              <img src="@/assets/AgroIcon.svg" alt="Agroec System Icon Image"
                class="h-16 w-16 mx-auto self-end" />
            </div>
            <div class="grid gap-1 w-full">
              <div class="grid text-gray-600">
                <p class="text-sm"><span class="font-bold text-base">Sistema Agroec</span>
                  {{ proposal.provincia }}, {{ proposal.canton }}</p>
              </div>
              <div class="message-content rounded-md p-2 w-full grid"
                :class="{ 'system-chat': proposal.lastMessage.leido == 0, 'incoming-chat': proposal.lastMessage.leido == 1 }"
                v-if="proposal.lastMessage && proposal.lastMessage.id_remitente != proposal.id_vendedor">
                <p class="text-sm text-gray-800" :class="{ 'font-bold': proposal.lastMessage.leido == 0 }">
                  {{ proposal.lastMessage.texto }}
                </p>
                <span class="text-gray-700 text-xs justify-self-end hour-text">{{
                  formatDateTime(proposal.lastMessage.fecha).whenMessageSent }}
                  {{ formatDateTime(proposal.lastMessage.fecha).time }}</span>
              </div>
              <div class="message-content incoming-chat rounded-md p-2 w-full grid"
                v-if="proposal.lastMessage && proposal.lastMessage.id_remitente == proposal.id_vendedor">
                <p class="text-sm text-gray-800">
                  {{ proposal.lastMessage.texto }}
                </p>
                <span class="text-gray-700 text-xs justify-self-end hour-text">
                  {{ formatDateTime(proposal.lastMessage.fecha).whenMessageSent }}
                  {{ formatDateTime(proposal.lastMessage.fecha).time }}</span>
              </div>
              <div class="message-content incoming-chat rounded-md p-2 w-full grid" v-if="!proposal.lastMessage">
                <p class="text-sm text-gray-800">
                  Envia el primer mensaje de la negociación
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <div v-else class="min-h-64 grid items-center">
        <div class="mx-auto w-full grid gap-5 text-black justify-items-center">
          <h1 class="font-bold text-2xl opacity-65 text-center">No enviaste propuestas de {{ this.$route.params.product }}</h1>
          <RouterLink to="/app/market" class="default-bar text-center text-white rounded-md p-2">
            Enviar ofertas
          </RouterLink>
        </div>
      </div>


    </div>
  </div>

</template>

<script allowJs>
import { emitAlert } from "@/libs/alert.js";
import * as proposalService from '../services/proposal.service.js';
import ProfileIcon from "./ProfileIcon.vue";
import { formatDateTime } from "@/libs/date.js";
export default {
  data() {
    return {
      products: [],
      proposals: []
    };
  },
  components: {
    ProfileIcon
  },
  async mounted() {
    await this.getLicitationsProposal();
  },
  watch: {
    '$route.params.product': async function() {
      if(this.$route.params.product == undefined){
        return;
      }
      await this.getLicitationsProposal();  // Se ejecuta cada vez que el parámetro cambia
    }
  },
  methods: {
    async getLicitationsProposal() {
      try {
        this.proposals = await proposalService.getLicitationProposalByUserAndProduct(this.$route.params.product);
      } catch (error) {
        return emitAlert(error.message, "error");
      }
    },
    formatDateTime(x) {
      return formatDateTime(x);
    }
  },
};
</script>

<style scoped>
.input {
  font-size: 14px;
}

.checkbox {
  accent-color: #a3e635;
}

.rangeDistancia {
  accent-color: #a3e635;
}

.input-container {
  border-top: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.input-hover {
  border-bottom: none;
  border-top: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.hour-text {
  opacity: 0.8;
}
</style>
