<template>
    <div>
        <RouterLink :to="{
            name: 'detail-bouquet', params: {
                id: id
            }
        }">
            <div
                class="flex flex-col w-44 shadow-md relative cursor-pointer hover:bg-silver/10 hover:scale-95 transition duration-300 md:w-52 lg:w-56">
                <div class="h-36 md:h-40 lg:h-48">
                    <img :src="img" alt="product-image" class="w-full h-full object-cover">
                </div>
                <div class="p-2">
                    <h1 class="text-sm">

                        {{ name.length > 20 ? `${name.slice(0,18)}...` : name }}
                    </h1>
                    <h2 class="text-lg font-semibold mt-1">{{ idrFormatter(price) }}</h2>
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
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: 'Bouquet image'
    },
    name: {
        type: String,
        default: 'Bouquet Name'
    },
    price: {
        type: Number,
        default: 0
    },
})

const idrFormatter = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number)
}
</script>