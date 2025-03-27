<template>
    <MainLayout>
        <template #content>
            <div class="flex flex-col lg:px-28  md:px-24 sm:px-16 py-10 p-2">
                <RouterView name="profileInfo"></RouterView>
                <RouterView name="profileAddress"></RouterView>
            </div>
        </template>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>
