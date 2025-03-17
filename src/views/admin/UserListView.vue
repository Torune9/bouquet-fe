<template>
    <div class="flex flex-col gap-y-2">
        <BtnSearch />

        <section>
            <EasyDataTable :headers="headers" :items="items" :rows-items="[8,12]" :rows-per-page="8" table-class-name="customize-table"/>
        </section>
    </div>
</template>

<script setup>
import BtnSearch from '@/components/admin/BtnSearch.vue';
const headers = [
 
];

const items = [
 
];
</script>