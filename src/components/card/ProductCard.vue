<template>
    <div>
        <RouterLink :to="{
            name: 'detail-bouquet', params: {
                id: bouquet.id
            }
        }">
            <div
                class="flex flex-col w-44 shadow-md relative cursor-pointer hover:bg-silver/10 hover:scale-95 transition duration-300 md:w-52 lg:w-56">
                <div class="h-36 md:h-40 lg:h-48">
                    <img :src="imageDefault(bouquet.ImageBouquets) " alt="product-image" class="w-full h-full object-cover">
                </div>
                <div class="p-2">
                    <h1 class="text-sm md:text-md">

                        {{ bouquet.name.length > 20 ? `${bouquet.name.slice(0,18)}...` : bouquet.name }}
                    </h1>
                    <h2 class="text-lg font-semibold mt-1">{{ formatToIdr(bouquet.price) }}</h2>
                    <small><span>Stock : </span>{{ bouquet.stock }}</small>
                </div>
                <div class="p-2 flex gap-2 justify-end text-sm">
                    <h1 class="text-center border w-12 rounded-sm">
                        New
                    </h1>
                    <h1 class="text-center border w-12 rounded-sm text-red-600">
                        Hot
                    </h1>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script setup>
import { formatToIdr } from '@/services/formatter';

const props = defineProps({
    bouquet : {
        type : Object
    }
})

const imageDefault = (image) => {
    return image.length > 0 ? image[0].path : 'https://placehold.co/600x400?text=Bouquet Image'
}
</script>