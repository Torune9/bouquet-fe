<template>
   <MainLayout>
    <template #content>
        <HeroSection/>

        <MarqueeComponent/>

        <CategorySection class="mt-4"/>

        <ProductSection class="mt-4"/>
    </template>
   </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import MarqueeComponent from '@/components/info/MarqueeComponent.vue';

import HeroSection from '@/components/landingpage/HeroSection.vue';
import CategorySection from '@/components/landingpage/CategorySection.vue';
import ProductSection from '@/components/landingpage/ProductSection.vue';
</script>