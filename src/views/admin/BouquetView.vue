<script setup lang="ts">
import BtnSearch from '@/components/admin/BtnSearch.vue';

</script>

<template>
    <div class="flex flex-col gap-y-2">
       <BtnSearch/>
        <section>
            <h1>Filter</h1>
            <form class="filter">
                <input class="btn btn-square" type="reset" value="×" />
                <input class="btn" type="radio" name="frameworks" aria-label="Svelte" />
                <input class="btn" type="radio" name="frameworks" aria-label="Vue" />
                <input class="btn" type="radio" name="frameworks" aria-label="React" />
            </form>
        </section>
        <section>
            <div class="border border-red-600 flex flex-wrap gap-2 justify-center">
                <!-- card -->
                <div class="border bg-white flex flex-col gap-y-2">
                    <div class="h-32 w-48 sm:w-52 md:w-58">
                        <img src="https://placehold.co/600x400" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="px-2">
                        <h1 class="text-xl">Product name</h1>
                        <h2>Rp 200.000</h2>
                    </div>
                    <p class="w-40 text-xs px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit... </p>
                    <div class="text-end p-2">
                        <button>
                            <RouterLink :to="{
                                name : 'boqouet-detail',
                                params : {
                                    id : 1
                                }
                            }" class="btn btn-accent w-24">
                            edit
                            </RouterLink>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>