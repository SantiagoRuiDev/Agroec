<template>
    
    <div class="content w-full mx-auto grid my-5 gap-2">

        <div class="grid gap-1">
            <div class="tutorial-card flex gap-3 shadow-md p-3 items-center relative" v-for="tutorial in tutorials" :key="tutorial">
                <a :href="tutorial.url_video" target="_blank"><img src="@/assets/Play.svg" alt="Play Icon"></a>
                <p class="text-gray-500 text-sm font-semibold w-3/4">{{ tutorial.titulo }}</p>
                <span class="absolute right-0 grid items-center h-auto rounded-sm bottom-0 text-white text-center default-bar text-xs font-bold p-1" v-if="tutorial.nuevo > 0">NUEVO</span>
            </div>
        </div>
        
    </div>

</template>


<script>
import * as categoryService from '@/services/category.service.js';
export default {
  name: 'Tutorials',
  data(){
    return {
        tutorials: [],
    }
  },
  methods: {
    async getTutorials(){
      this.tutorials = await categoryService.getTutorials(this.$route.params.category);
    }
  },
  created: async function () {
    await this.getTutorials();
  },
}
</script>
