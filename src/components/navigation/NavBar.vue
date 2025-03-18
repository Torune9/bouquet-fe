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
                <RouterLink class="flex items-center" to="/sign-in" v-if="!isAuthenticated">
                    <button class="btn btn-md">
                        Login
                    </button>
                </RouterLink>
                <div class="dropdown dropdown-end" v-else>
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <RouterLink class="justify-between" to="/profile">
                                Profile
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/order-list">
                                History
                            </RouterLink>
                        </li>
                        <li>
                            <button @click="logout" type="button">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useOrderStore } from '@/stores/orderStore'
import { storeToRefs } from 'pinia'


const emits = defineEmits(['showCart'])

const showCart = () => {
    emits('showCart')
}

const orderStore = useOrderStore()
const { cart } = storeToRefs(orderStore)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const logout = () => authStore.logout()

</script>