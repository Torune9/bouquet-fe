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

                <button class="btn btn-primary w-24">
                    Add
                </button>
            </div>
        </section>

        <section>
            <EasyDataTable :headers="headers" :items="items" :rows-items="[8, 12]" :rows-per-page="8"
                table-class-name="customize-table" />
        </section>
    </div>
</template>

<script setup>

const headers = [

];

const items = [

];
</script>