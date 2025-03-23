<template>
    <div class="flex flex-col gap-y-2">
        <BtnSearch />

        <section>
            <EasyDataTable :headers="headers" :items="categories" :rows-items="[8, 12]" :rows-per-page="8"
                table-class-name="customize-table" :loading="isLoading">
                <template #loading>
                    <span class="loading loading-bars loading-lg"></span>
                </template>
                <template #item-name="{name}">
                   <span class="capitalize">{{ name }}</span>
                </template>
                <template #item-action>
                    <div class="gap-x-2 inline-flex">
                        <button class="btn btn-circle btn-info btn-sm">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </button>
                        <button class="btn btn-circle btn-error btn-sm">
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
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
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

const {categories} = storeToRefs(categoryStore)

const isLoading = ref(false)

</script>