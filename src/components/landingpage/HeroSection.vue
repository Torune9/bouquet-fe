<template>
    <div class="relative w-screen h-44 bg-[url(@/assets/img/img8.jpg)] bg-cover bg-center before:content-[''] before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-tranparent overflow-hidden">
        <div class="z-10 text-white absolute w-full top-1/2 -translate-y-1/2 text-lg flex items-end gap-x-2 justify-evenly ">
            <h1 class="w-54 text-xl">
                Up to <strong class="text-2xl text-orioles-orange">30% off</strong>,
                Custom bouquet 
                & More flower
            </h1>
            <button @click="scrollToProduct" class="border cursor-pointer btn btn-sm btn-outline">
                Browse
            </button>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['scroll-to-product']);

const scrollToProduct = () => {
  emit('scroll-to-product');
};
</script>