<template>
    <div>
        <h1 class="p-2 text-xl">Categories</h1>
        <div class="w-full overflow-x-auto hide-scrollbar">
            <div class="flex flex-row gap-x-4 min-w-max p-2 justify-evenly">
                <div v-for="category in categories" class="flex items-center flex-col gap-y-2">
                    <button
                        class="btn btn-circle btn-ghost w-12 h-12 bg-orioles-orange text-orioles-linen hover:bg-orange-500
                        lg:w-16 lg:h-16"
                        type="button">
                        <font-awesome-icon :icon="category.icon" size="lg" />
                    </button>
                    <small class="text-center">
                        {{ category.name }}
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const categories = [
    { id: 1, name: "Romantis", icon: 'fa-solid fa-heart-circle-check' },
    { id: 2, name: "Ulang Tahun", icon: 'fa-solid fa-cake-candles' },
    { id: 3, name: "Wisuda", icon: 'fa-solid fa-graduation-cap' },
    { id: 4, name: "Pernikahan", icon: 'fa-solid fa-children' },
    { id: 5, name: "Valentine", icon: 'fa-solid fa-heart-pulse' },
    { id: 6, name: "Hari Ibu", icon: 'fa-solid fa-person-dress' },
    { id: 7, name: "Duka Cita", icon: 'fa-solid fa-feather-pointed' },
    { id: 8, name: "Spesial Custom", icon: 'fa-solid fa-puzzle-piece' }
];

</script>