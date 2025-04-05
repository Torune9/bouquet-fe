<template>
    <MainLayout>
        <template #content>
            <HeroSection @scroll-to-product="scrollToProduct"/>

            <MarqueeComponent />

            <CategorySection class="mt-4" @send-category-id="getCategory" />

            <ProductSection class="mt-4" :category="id" id="product-section"/>
        </template>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import MarqueeComponent from '@/components/info/MarqueeComponent.vue';

import HeroSection from '@/components/landingpage/HeroSection.vue';
import CategorySection from '@/components/landingpage/CategorySection.vue';
import ProductSection from '@/components/landingpage/ProductSection.vue';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
const id = ref('')
const getCategory = (category) => {
    return id.value = category
}

const scrollToProduct = () => {
    const section = document.getElementById('product-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => { })
if (history.state.isSuccess) {
    toast.success('Login success', {
        onClose: () => {
            history.replaceState(null, '')
        }
    })
}
</script>