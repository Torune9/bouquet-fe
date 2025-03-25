<template>
    <div>
        <h1 class="p-2 text-xl md:px-14">Categories</h1>
        <div class="w-full overflow-x-auto hide-scrollbar">
            <div class="flex flex-row gap-x-4 min-w-max p-2 justify-evenly">
                <div class="flex items-center flex-col gap-y-2">
                    <button class="btn btn-circle btn-ghost w-12 h-12 bg-orioles-orange text-orioles-linen hover:bg-orange-500
                        lg:w-16 lg:h-16" type="button" @click="sendCategory(null)">
                        <font-awesome-icon icon="fa-solid fa-earth-asia" size="lg"/>
                    </button>
                    <small class="text-center">
                        All
                    </small>
                </div>
                <div v-for="category in mappedCategory" class="flex items-center flex-col gap-y-2">
                    <button class="btn btn-circle btn-ghost w-12 h-12 bg-orioles-orange text-orioles-linen hover:bg-orange-500
                        lg:w-16 lg:h-16" type="button" @click="sendCategory(category.id)">
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
    if (lowerCaseName.includes("wangi")) return "fa-solid fa-wind";
    if (lowerCaseName.includes("elegant")) return "fa-solid fa-user-tie";

    return "fa-solid fa-question-circle"; 
};

const categoryStore = useCategoryStore()

const { categories } = storeToRefs(categoryStore)

const mappedCategory = computed(() => {
    return categories.value.map(item => ({
        ...item,
        icon: getIcon(item.name)
    }));
})

const emits = defineEmits(['sendCategoryId'])

const sendCategory = (id)=>{
    return emits('sendCategoryId',id)
}

onMounted(async () => {
    await categoryStore.getCategories()
})

</script>