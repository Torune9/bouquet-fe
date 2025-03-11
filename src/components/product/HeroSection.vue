<template>
    <div class="relative w-screen h-32 bg-[url(@/assets/img/img8.jpg)] bg-cover bg-center before:content-[''] before:w-full before:h-full before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-tranparent px-10">
        <div class="z-10 text-white absolute w-72 top-1/2 -translate-y-1/2 text-lg flex items-end gap-x-2">
            <h1 class="w-full text-xl">
                Up to <strong class="text-2xl text-orioles-orange">30% off</strong>,
                Custom bouquet 
                & More flower
            </h1>
            <button class="border cursor-pointer btn btn-sm btn-outline">
                Browse
            </button>
        </div>
    </div>
</template>

<script setup>
import img from '@/assets/img/img8.jpg'
</script>