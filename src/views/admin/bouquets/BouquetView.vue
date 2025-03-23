<template>
  <ConfirmModal :title="'Are you sure want to delete?'" modal-id="modal_delete" title-btn="Delete"
    @send-confirmation="getConfirmation" />
  <div class="flex flex-col gap-y-2">
    <!-- Searching -->
    <section>
      <div class="inline-flex w-full justify-between">
        <div class="sm:w-full">
          <label class="input sm:min-w-3/4">
            <span><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
            <input type="search" class="grow" placeholder="Search" v-model="searchQuery" />
          </label>
        </div>

        <RouterLink :to="{ name: 'add-bouquet' }" class="btn btn-primary w-24">Add</RouterLink>
      </div>
    </section>
    <!-- Filter -->
    <FilterBouquet @send-filterization="captureFilterization" />
    <!-- Main card -->
    <section>
      <div class="flex flex-wrap gap-2 justify-center sm:gap-4">
        <!-- Skeleton -->
        <div class="flex flex-wrap gap-4 justify-center" v-if="isLoading">
          <div class="flex w-52 flex-col gap-4 md:gap-10" v-for="n in 8">
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
          </div>
        </div>

        <!-- Bouquet Card -->
        <div v-else class="relative shadow-md rounded-md bg-white flex flex-col gap-y-2"
          v-for="bouquet in dataFilterBouquet" :key="bouquet.id">
          <!-- Btn delete -->
          <button class="btn btn-circle btn-danger btn-sm text-red-900 absolute top-2 right-2"
            @click="deleteBouquet(bouquet.id, bouquet.deletedAt)">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
          <div class="h-32 w-40 sm:w-52 sm:h-52 md:w-58">
            <img :src="bouquet.ImageBouquets[0]?.path || 'https://placehold.co/600x400?text=Bouquet Image'"
              alt="image-bouquet" class="w-full h-full object-cover" />
          </div>
          <div class="px-2 text-sm w-40 sm:w-52 md:w-58">
            <h1 class="text-lg">{{ bouquet.name.length > 14 ? `${bouquet.name.slice(0, 8)}...` : bouquet.name }}</h1>
            <h2 class="sm:text-md">{{ formatToIdr(bouquet.price) }}</h2>
            <h2 class="sm:text-sm">Stock : {{ bouquet.stock }}</h2>
            <h2 class="text-xs border p-1 w-fit border-red-700 text-red-600 rounded-md">{{ bouquet.Category.name }}</h2>
          </div>
          <div class="text-end p-2">
            <button v-if="!bouquet.deletedAt">
              <RouterLink :to="{ name: 'boqouet-detail', params: { id: bouquet.id } }"
                class="btn bg-indigo-700 text-white w-24 btn-sm sm:btn-md">
                Edit
              </RouterLink>
            </button>
            <button @click="restoreBouquet(bouquet.id)" v-else class="btn btn-info text-white w-24 btn-sm sm:btn-md">
              Restore
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBouquetStore } from '@/stores/bouquetStore'
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { formatToIdr } from '@/services/formatter'
import FilterBouquet from '@/components/info/FilterBouquet.vue'
import ConfirmModal from '@/components/info/ConfirmModal.vue'

const bouquetStore = useBouquetStore()
const bouquets = ref([])
const isLoading = ref(false)
const searchQuery = ref('')
const filters = ref({})

const getBouquets = async () => {
  isLoading.value = true
  try {
    const response = await bouquetStore.getBouquets(filters.value)
    bouquets.value = response.data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const captureFilterization = (filterData) => {
  filters.value = filterData
  getBouquets()
}

const dataFilterBouquet = computed(() => {
  return bouquets.value.filter((bouquet) =>
    bouquet.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const bouquetId = ref('')
const force = ref(null)

const deleteBouquet = (id, deletedAt) => {
  bouquetId.value = id
  force.value = deletedAt
  return modal_delete.showModal()
}

const deleteBouquetTruly = async () => {
  try {
    await bouquetStore.deleteBouquet(bouquetId.value, force.value)
    if (!force.value) {
      toast.success('Bouquet has been deleted')

    } else {
      toast.warning('Bouquet truly has been delete')
    }
  } catch (error) {
    console.log(error);
  } finally {
    await getBouquets()
  }
}

const getConfirmation = (data) => {
  if (data) {
    deleteBouquetTruly()
  }
}

const restoreBouquet = async (id) => {
  try {
    await bouquetStore.updateBouquet(id, true, null)
    toast.info('Bouquets succesfully restore')
  } catch (error) {
    console.log(error);
  } finally {
    await getBouquets()
  }
}


onMounted(() => {
  if (history.state.isSuccess) {
    toast.success('Bouquet has successfully added', {
      onClose: () => {
        history.replaceState(null, '')
      }
    })
  }
  getBouquets()
})
</script>