<template>
    <header class="sticky -top-1 z-50 glass">
        <div class="navbar shadow-sm">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl font-light">SnfBouquet</a>
            </div>
            <div class="flex gap-x-4">
                <RouterLink class="flex items-center" to="/">
                    <button class="btn btn-circle btn-ghost">
                        <font-awesome-icon icon="fa-solid fa-house-chimney" size="lg" />
                    </button>
                </RouterLink>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <font-awesome-icon icon="fa-solid fa-cart-shopping" size="lg" />
                            <span class="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div tabindex="0" class="dropdown-content">
                        <CartComponent />
                    </div>
                </div>
                <div class="dropdown dropdown-end">
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
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import CartComponent from '@/components/landingpage/CartComponent.vue';
</script>