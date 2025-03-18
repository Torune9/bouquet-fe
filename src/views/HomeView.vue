<template>
  <main
    class="h-screen w-screen grid grid-rows-2 grid-cols-1 overflow-hidden font-archivo lg:grid-cols-2 lg:grid-rows-[80px_1fr]">
    <MarqueeComponent class="lg:col-span-2" />
    <section class="z-10">
      <div class="flex flex-col gap-y-5 justify-center items-center text-center h-full sm:gap-y-10">
        <h1 class="text-6xl font-black md:text-7xl font-bs lg:text-8xl">SNF BOUQUET</h1>
        <p class="text-xs sm:px-20 sm:text-sm md:text-md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
          amet odit repellat. Aliquid
          impedit, corporis reprehenderit, quae error mollitia deleniti, pariatur consectetur labore vero ex. Ab non
          accusantium mollitia consectetur.</p>
        <RouterLink to="/bouquet">
          <button class="btn btn-md sm:btn-lg btn-neutral font-light md:btn-lg">
            Browse
          </button>
        </RouterLink>
      </div>
    </section>
    <section class="flex flex-col items-center relative max-lg:h-96 z-0">
      <Transition name="entrance">
        <div
          class="bg-orioles-orange rounded-full flex justify-center items-center absolute bottom-0 h-80 w-80 lg:w-[450px] lg:h-[450px]" v-if="isEntrance">
          <img :src="img" alt="landing-image">
        </div>
      </Transition>
    </section>
  </main>
</template>


<script setup>
import img from '@/assets/img/image-landing.png'
import MarqueeComponent from '@/components/info/MarqueeComponent.vue';
import { onMounted, ref } from 'vue';
const isEntrance = ref(false)
onMounted(()=>isEntrance.value = !isEntrance.value)
</script>

<style scoped>
.entrance-enter-active {
  transition: all 0.6s cubic-bezier(0.39, 0.575, 0.565, 1.0);
}

.entrance-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.entrance-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>