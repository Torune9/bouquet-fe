<template>
    <div class="flex flex-col gap-y-2">
        <BtnSearch />

        <section>
            <EasyDataTable :headers="headers" :items="items" :rows-items="[8, 12]" :rows-per-page="8"
                table-class-name="customize-table" :loading="isLoading">
                <template #loading>
                    <span class="loading loading-bars loading-lg"></span>
                </template>
                <template #item-name="{name}">
                   <span class="capitalize">{{ name }}</span>
                </template>
                <template #item-action>
                    <div class="inline-flex gap-x-2">
                        <button class="btn btn-circle btn-sm btn-info">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </button>
                        <button class="btn btn-circle btn-sm btn-error">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                </template>
            </EasyDataTable>
        </section>
    </div>
</template>

<script setup>
import BtnSearch from '@/components/admin/BtnSearch.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted, ref } from 'vue';
const categoryStore = useCategoryStore()
const headers = [
    {
        text: 'Name',
        value: 'name',
    },
    {
        text: 'ID',
        value: 'id'
    },
    {
        text: 'Action',
        value: 'action'
    }
];

const items = ref([])
const isLoading = ref(false)

const getCategories = async () => {
    isLoading.value = !isLoading.value
    try {
        const response = await categoryStore.getCategories()
        items.value = response.data
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = !isLoading.value
    }
}
onMounted(async () => {
    await getCategories()
})
</script>