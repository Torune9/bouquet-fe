<template>
    <div class="flex flex-col gap-y-2">
        <section>
            <div class="inline-flex w-full justify-between">
                <div class="sm:w-full">
                    <label class="input sm:min-w-3/4">
                        <span><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
                        <input type="search" class="grow" placeholder="Search" />
                    </label>
                </div>

                <RouterLink :to="{ name: 'add-bouquet' }" class="btn btn-primary w-24">
                    Add
                </RouterLink>

            </div>
        </section>
        <!-- Filter -->
        <section>
            <h1>Filter</h1>
            <form class="filter">
                <input class="btn btn-square" type="reset" value="×" />
                <input class="btn" type="radio" name="frameworks" aria-label="Svelte" />
                <input class="btn" type="radio" name="frameworks" aria-label="Vue" />
                <input class="btn" type="radio" name="frameworks" aria-label="React" />
            </form>
        </section>
        <!-- Main card -->
        <section>
            <div class="flex flex-wrap gap-2 justify-center sm:gap-4 ">
                <!-- Skeleton -->
                <div class="flex flex-wrap gap-4 justify-center" v-if="isLoading">
                    <div class="flex w-52 flex-col gap-4" v-for="n in 8">
                        <div class="skeleton h-32 w-full"></div>
                        <div class="skeleton h-4 w-28"></div>
                        <div class="skeleton h-4 w-full"></div>
                        <div class="skeleton h-4 w-full"></div>
                    </div>
                </div>
                <!-- card -->
                <div v-else class="shadow-md rounded-md bg-white flex flex-col gap-y-2" v-for="bouquet in bouquets">
                    <div class="h-32 w-40 sm:w-52 sm:h-52 md:w-58">
                        <img :src="bouquet.ImageBouquets[0].path || 'https://placehold.co/600x400'" alt=""
                            class="w-full h-full object-cover">
                    </div>
                    <div class="px-2 text-sm">
                        <h1 class="text-lg">{{ bouquet.name }}</h1>
                        <h2 class="sm:text-md">{{ formatToIdr(bouquet.price) }}</h2>
                    </div>
                    <div class="text-end p-2">
                        <button>
                            <RouterLink :to="{
                                name: 'boqouet-detail',
                                params: {
                                    id: bouquet.id
                                }
                            }" class="btn btn-accent w-24 btn-sm sm:btn-md">
                                edit
                            </RouterLink>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useBouquetStore } from '@/stores/bouquetStore';
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import { formatToIdr } from '@/services/formatter';

const bouquetStore = useBouquetStore()
const bouquets = ref(null)
const isLoading = ref(false)

const getBouquets = async () => {
    isLoading.value = !isLoading.value
    try {
        const response = await bouquetStore.getBouquets()
        console.log(response);

        bouquets.value = response.data

    } catch (error) {
        console.log(error);
    }
    finally{
        isLoading.value = !isLoading.value
    }
}

onMounted(async () => {
    if (history.state.isSuccess) {
        return toast.success('Bouquet has successfully added', {
            onClose: () => {
                return history.replaceState(null, '')
            }
        })
    }

    await getBouquets()
})
</script>
