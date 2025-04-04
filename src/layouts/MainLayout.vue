<template>
    <NavBar @show-cart="showCart"/>

    <CartComponent :is-show-cart="isShowCart" @close="closeCart"/>

    <main class="font-archivo overflow-x-hidden relative">
        <slot name="content" />
    </main>

    <Footer/>

</template>

<script setup>
import CartComponent from '@/components/landingpage/CartComponent.vue';
import Footer from '@/components/navigation/Footer.vue';
import NavBar from '@/components/navigation/NavBar.vue';
import { ref } from 'vue';

const isShowCart = ref(false)

const showCart = ()=>{
    isShowCart.value = !isShowCart.value
}

const closeCart = (data) => {
    isShowCart.value = data
}
</script>