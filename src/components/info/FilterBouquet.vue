<template>
    <div>
        <div class="space-x-2">
            <label for="filter">Filter</label>
            <input type="checkbox"  class="toggle" v-model="isActiveFilter"/>
        </div>
        <section class="py-4 space-y-4" v-if="isActiveFilter">
            <!-- Filter -->
            <div class="flex flex-wrap gap-4">
                <!-- Filter Kategori -->
                <div>
                    <h1 class="text-sm">Categories</h1>
                    <select class="select cursor-pointer" v-model="filter.selectedCategory" @change="sendFilterization">
                        <option value="">All category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                        </option>
                    </select>
                </div>
                <!-- Filter Stock -->
                <div>
                    <h1 class="text-sm">Stock Above</h1>
                    <select class="select cursor-pointer" v-model="filter.stockAbove" @change="sendFilterization">
                        <option selected :value="0">Pick a stock</option>
                        <option v-for="stock in stocks" :value="stock">{{ stock }}</option>
                    </select>
    
                </div>
                <div>
                    <h1 class="text-sm">Stock Below</h1>
                    <select class="select cursor-pointer" v-model="filter.stockBelow" @change="sendFilterization">
                        <option selected :value="0">Pick a stock</option>
                        <option v-for="stock in stocks" :value="stock">{{ stock }}</option>
                    </select>
    
                </div>
                <!-- Pricing -->
                <div>
                    <h1 class="text-sm">Greater Than</h1>
                    <select class="select cursor-pointer" v-model="filter.maxPrice" @change="sendFilterization">
                        <option :value="0">Pick price</option>
                        <option v-for="(price,i) in prices" :key="i" :value="price">{{ formatToIdr(price) }}
                        </option>
                    </select>
                </div>
                <div>
                    <h1 class="text-sm">Lower Than</h1>
                    <select class="select cursor-pointer" v-model="filter.minPrice" @change="sendFilterization">
                        <option :value="0">Pick price</option>
                        <option v-for="(price,i) in prices" :key="i" :value="price">{{ formatToIdr(price) }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- Sorting -->
            <div>
                <h1>Filter</h1>
                <form class="filter">
                    <input class="btn btn-square" type="reset" value="×" @click="resetFilter" />
                    <input v-for="order in orders" :key="order.value" class="btn capitalize" type="radio" name="frameworks"
                        :aria-label="order.name" @click="setSorting(order.value)" />
                </form>
            </div>
            <!-- Paranoid  -->
            <div class="space-x-2">
                <input @change="sendFilterization" type="checkbox" v-model="filter.isParanoid" id="paranoid" class="checkbox checkbox-neutral" />
                <label for="paranoid">Deleted Bouquets</label>
            </div>
        </section>
    </div>
</template>

<script setup>
import { formatToIdr } from '@/services/formatter'
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'
import { reactive,shallowReactive, ref, watch } from 'vue'

const orders = [
    { name: 'lowest price', value: 'priceAsc' },
    { name: 'highest price', value: 'priceDesc' },
    { name: 'oldest', value: 'oldest' },
    { name: 'latest price', value: 'latestPriceAsc' },
    { name: 'high stock', value: 'stockDesc' },
    { name: 'low stock', value: 'stockAsc' },
]
const isActiveFilter = ref(false)

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const filter = shallowReactive({
    selectedCategory: '',
    selectedStock: 0,
    selectedSorting: '',
    stockAbove: 0,
    stockBelow: 0,
    minPrice: 0,
    maxPrice: 0,
    isParanoid : false,
})

const stocks = [10, 40, 60, 100]

const prices = [35000, 50000, 70000, 100000, 250000]

const emits = defineEmits(['sendFilterization'])

const sendFilterization = () => {
    return emits('sendFilterization', {
        category: filter.selectedCategory || null,
        stockBelow: filter.stockBelow || null,
        stockAbove: filter.stockAbove || null,
        minPrice: filter.minPrice || null,
        maxPrice: filter.maxPrice || null,
        stock: filter.selectedStock || null,
        sortBy: filter.selectedSorting || null,
        isParanoid : filter.isParanoid
    })
}

const setSorting = (value) => {
    if (value) {
        filter.selectedSorting = value
    }
    sendFilterization()
}

const resetFilter = () => {
    Object.assign(filter, {
        selectedCategory: '',
        selectedStock: 0,
        selectedSorting: '',
        stockAbove: 0,
        stockBelow: 0,
        minPrice: 0,
        maxPrice: 0,
    })
    sendFilterization()
}

watch(() => ([filter.stockAbove, filter.stockBelow]), ([aboveNew, belowNew], [aboveOld, belowOld]) => {
    if (aboveNew > aboveOld) {
        return filter.stockBelow = 0
    }

    if (belowNew > belowOld) {
        return filter.stockAbove = 0
    }

})

watch(() => ([filter.minPrice, filter.maxPrice]), ([minPriceNew, maxPriceNew], [minPriceold, maxPriceOld]) => {
    if (minPriceNew > minPriceold) {
        return filter.maxPrice = 0
    }

    if (maxPriceNew > maxPriceOld) {
        return filter.minPrice = 0
    }

})

</script>