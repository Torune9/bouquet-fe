<template>

    <NavBar/>
    
    <main class="font-archivo overflow-x-hidden">
        <slot name="content" />
    </main>

    <Footer/>

</template>

<script setup>
import Footer from '@/components/navigation/Footer.vue';
import NavBar from '@/components/navigation/NavBar.vue';
</script>