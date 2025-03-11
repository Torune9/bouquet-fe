<template>

    <NavBar/>
    
    <main class="font-archivo">
        <slot name="content" />
    </main>

    <footer>
        footer
    </footer>

</template>

<script setup>
import NavBar from '@/components/navigation/NavBar.vue';
</script>