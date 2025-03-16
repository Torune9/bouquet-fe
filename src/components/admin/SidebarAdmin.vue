<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <nav class="mt-6">
            <ul class="flex flex-col gap-y-1">
                <li v-for="(menu, i) in menus" :key="i">
                    <router-link :to="menu.routes"
                        class="flex items-center p-4 rounded-md text-gray-600 hover:bg-neutral hover:text-orioles-linen transition-colors duration-300 gap-x-4"
                        active-class="bg-indigo-900/30 text-indigo-900">
                        <span class="w-6 inline-flex justify-center items-center text-xl"><font-awesome-icon :icon="menu.icon" /></span>
                        <span>{{ menu.name }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
const menus = [
    {
        name: 'Dashboard',
        icon: 'fa-solid fa-globe',
        routes: '/admin/dashboard'
    },
    {
        name: 'Category',
        icon: 'fa-solid fa-arrows-to-circle',
        routes: '/admin/category'
    },
    {
        name: 'Bouquets',
        icon: 'fa-solid fa-seedling',
        routes: '/admin/bouquet'
    },
    {
        name: 'Order',
        icon: 'fa-solid fa-bullseye',
        routes: '/admin/order'
    },
    {
        name: 'User',
        icon: 'fa-solid fa-people-group',
        routes: '/admin/user'
    },
    {
        name: 'Role',
        icon: 'fa-solid fa-arrows-spin',
        routes: '/admin/role'
    },
]

</script>
