<template>
    <header class="sticky inset-0 z-50 glass">
        <div class="navbar">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl font-light">SnfBouquet</a>
            </div>
            <div class="flex gap-x-4">
                <RouterLink class="flex items-center" to="/">
                    <button class="btn btn-circle btn-ghost">
                        <font-awesome-icon icon="fa-solid fa-house-chimney" size="lg" />
                    </button>
                </RouterLink>
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle" @click="showCart">
                    <div class="indicator">
                        <font-awesome-icon icon="fa-solid fa-cart-shopping" size="lg" />
                        <span class="badge badge-sm indicator-item badge-warning">{{ cart.length }}</span>
                    </div>
                </div>
                <RouterLink class="flex items-center" to="/sign-in">
                    <button class="btn btn-md">
                       Login
                    </button>
                </RouterLink>
                <div class="dropdown dropdown-end" v-if="isLogin">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>History</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { storeToRefs } from 'pinia'


const emits = defineEmits(['showCart'])

const showCart = ()=>{
    emits('showCart')
}

const orderStore = useOrderStore()
const {cart} = storeToRefs(orderStore)

</script>