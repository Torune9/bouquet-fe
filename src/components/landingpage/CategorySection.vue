<template>
    <div>
        <h1 class="p-2 text-xl md:px-14">Categories</h1>
        <div class="w-full overflow-x-auto hide-scrollbar">
            <div class="flex flex-row gap-x-4 min-w-max p-2 justify-evenly">
                <div v-for="category in mappedCategory" class="flex items-center flex-col gap-y-2">
                    <button class="btn btn-circle btn-ghost w-12 h-12 bg-orioles-orange text-orioles-linen hover:bg-orange-500
                        lg:w-16 lg:h-16" type="button">
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
import { useCategoryStore } from '@/stores/categoryStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const getIcon = (categoryName) => {
    const lowerCaseName = categoryName.toLowerCase();

    if (lowerCaseName.includes("romantis")) return "fa-solid fa-heart-circle-check";
    if (lowerCaseName.includes("ulang tahun")) return "fa-solid fa-cake-candles";
    if (lowerCaseName.includes("wisuda")) return "fa-solid fa-graduation-cap";
    if (lowerCaseName.includes("pernikahan")) return "fa-solid fa-children";
    if (lowerCaseName.includes("valentine")) return "fa-solid fa-heart-pulse";
    if (lowerCaseName.includes("hari ibu")) return "fa-solid fa-person-dress";
    if (lowerCaseName.includes("pemakaman") || lowerCaseName.includes("duka")) return "fa-solid fa-feather-pointed";
    if (lowerCaseName.includes("custom")) return "fa-solid fa-puzzle-piece";
    if (lowerCaseName.includes("wangi")) return "fa-solid fa-wind"; // Contoh tambahan untuk "wangi"
    if (lowerCaseName.includes("elegant")) return "fa-solid fa-user-tie"; // Contoh tambahan untuk "wangi"

    return "fa-solid fa-question-circle"; // Default jika tidak ditemukan
};


const categoryStore = useCategoryStore()

const { categories } = storeToRefs(categoryStore)

const mappedCategory = computed(() => {
    return categories.value.map(item => ({
        ...item,
        icon: getIcon(item.name) // Menambahkan ikon berdasarkan kategori
    }));
})

onMounted(async () => {
    await categoryStore.getCategories()
})

</script>