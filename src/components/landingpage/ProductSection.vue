<template>
  <div class="p-2">
    <h1 class="text-center text-2xl">A Sprig of Love, a Million Meanings.</h1>
    <fieldset class="fieldset md:px-8 lg:px-18" v-if="productSearch.length !== 0">
      <legend class="fieldset-legend">Search bouquet</legend>
      <label class="input w-full ">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <input type="search" required placeholder="Search" v-model="search" />
      </label>

    </fieldset>
    <div class="mt-4 md:px-8 lg:px-18" v-if="productSearch.length !== 0">
      <FilterBouquet @send-filterization="captureFilterization" :is-deleted="false"/>
    </div>
    <div v-if="productSearch.length == 0">
      <p class="text-center text-sm p-4">
        Sorry,bouquets not available
      </p>
    </div>
    <div class="flex mt-4 flex-wrap gap-x-1 gap-y-4 justify-center sm:gap-x-4" v-else>
      <div class="flex flex-wrap gap-4 justify-center" v-if="isLoading">
        <div class="flex w-40 md:w-52 flex-col gap-4 md:gap-10" v-for="n in 8">
          <div class="skeleton h-32 w-full"></div>
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>
      <ProductCard v-for="bouquet in productSearch" :bouquet="bouquet" v-else/>
    </div>
  </div>
</template>

<script setup>
import { useBouquetStore } from '@/stores/bouquetStore';
import ProductCard from '../card/ProductCard.vue';
import { computed, onMounted, ref, watch } from 'vue';
import FilterBouquet from '../info/FilterBouquet.vue';
const props = defineProps({
  category : {
    type : String,
  }
})
const bouquetStore = useBouquetStore()

const filters = ref({})
const isLoading = ref(false)
const search = ref('')

const products = ref([])
const getBouquets = async () => {
  isLoading.value = true
  try {
    const response = await bouquetStore.getBouquets(filters.value)
    products.value = response.data.filter(val => val.stock !== 0)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
const productSearch = computed(() => {
  return products.value.filter(val => val.name.toLowerCase().includes(search.value.toLowerCase()))
})

const captureFilterization = (filterData) => {
  filters.value = filterData
  getBouquets()
}

watch(()=>props.category,()=>{
  Object.assign(filters.value,{
    category : props.category
  })

  return getBouquets()
})

onMounted(() => {
  getBouquets()
})
</script>