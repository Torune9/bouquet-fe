<template>
    <ModalConfirm modal-id="my_modal" :bouquet="product" @add-to-cart="hasAddedToCart" />
    <MainLayout>
        <template #content>
            <!-- navigation -->
            <div class="breadcrumbs text-sm p-2">
                <ul>
                    <li>
                        <RouterLink to="/bouquet">
                            Bouquet
                        </RouterLink>
                    </li>
                    <li>Documents</li>
                </ul>
            </div>
            <!-- container detail -->
            <div class="p-2 md:px-20 lg:px-40">
                <!-- detail sub-container -->
                <div class="flex flex-col gap-y-2">
                    <!-- image wrapper -->
                    <div class="grid sm:grid-cols-[1fr_200px] gap-2 lg:h-[400px] overflow-hidden">
                        <!-- image hero -->
                        <div class="w-full h-60 sm:h-80 lg:h-[400px] bg-lavender/10" id="img-hero">
                            <img :src="heroImage ? heroImage : imgUrlDefault" alt="bouquet-image"
                                class="h-full w-full object-contain">
                        </div>
                        <!-- image child -->
                        <div class="flex flex-row justify-between sm:flex-col sm:gap-2" ref="childImage">
                            <div class="h-18 lg:h-20 cursor-pointer w-20" v-for="image of product.images"
                                @click="setImage">
                                <img :src="image" class=" h-full w-full object-cover">
                            </div>
                        </div>
                    </div>
                    <!-- info product -->
                    <div class="flex flow-row justify-between items-center font-semibold">
                        <h1 class="text-xl">{{ product.name }}</h1>
                        <h2 class="text-lg">Rp {{ product.price }}</h2>
                    </div>
                    <h1>
                        Stock : {{ product.stock }}
                    </h1>
                    <!-- description -->
                    <div class="flex flex-col gap-y-4">
                        <div>
                            <p>
                                {{ !isExpanded ? `${product.description.slice(0, 100)}...` : product.description }}
                            </p>
                            <button @click="toggleExpand" class="text-blue-500 underline cursor-pointer text-sm">
                                {{ showInfo }}
                            </button>
                        </div>

                        <div class="flex flex-row justify-between items-center">
                            <p class="border px-4 rounded-md">
                                Category
                            </p>
                            <span>
                                <span class="border w-20 text-center rounded-md text-info inline-block mr-2">New</span>
                                <span
                                    class="border w-20 text-center rounded-md text-orioles-orange inline-block">Hot</span>
                            </span>
                        </div>
                        <div class="flex gap-x-2">
                            <button @click="increment" class="btn btn-xs">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                            <input type="text" v-model="quantity" class=" field-sizing-content text-center min-w-10">
                            <button @click="decrement" class="btn btn-xs">
                                <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                        </div>

                    </div>
                    <!-- order btn -->
                    <div class="flex flex-row  justify-between gap-x-2 lg:justify-evenly">
                        <button class="btn btn-lg w-1/2 btn-success sm:w-52">
                            Order
                        </button>
                        <button class="btn btn-lg btn-warning w-40 sm:w-52" onclick="my_modal.showModal()">
                            add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex mt-4 flex-wrap gap-x-1 gap-y-4 justify-center sm:gap-x-4">
                <ProductCard v-for="bouquet in products" :id="bouquet.id" :img="bouquet.img" :name="bouquet.name"
                    :price="bouquet.price" />
            </div>
        </template>
    </MainLayout>
</template>

<script setup>
import ModalConfirm from '@/components/info/ModalConfirm.vue';
import ProductCard from '@/components/info/ProductCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import img from '@/assets/img/img7.jpg'

import { toast } from 'vue3-toastify';
import { useOrderStore } from '@/stores/orderStore';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';


const isExpanded = ref(false);

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const showInfo = computed(() => {
    return isExpanded.value ? 'Show less' : 'Show more'
})

const quantity = ref(1)

const increment = () => {
    return quantity.value++
}

const decrement = () => {
    if (quantity.value > 1) {
        return quantity.value--;
    }
}


const product = {
    id: 1,
    images: [
        img,
        'https://placehold.co/600x400',
        'https://placehold.co/600x600',
        'https://placehold.co/600x700',
        'https://placehold.co/600x800',
    ],
    name: "Buket Mawar Merah",
    stock : 100,
    price: 150000,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, sit modi numquam veniam doloremque quidem impedit nulla magnam aperiam, facilis quibusdam in cupiditate voluptate cumque. Optio eius corrupti saepe nisi. Ex sequi, quasi qui et ratione nisi facilis reprehenderit sed temporibus odio at atque optio saepe repellat itaque, natus exercitationem, porro ipsa assumenda quas veritatis aliquam sunt reiciendis inventore? Reprehenderit perferendis deserunt quis voluptatem maxime sint doloribus nobis fugiat modi, doloremque cum ratione cumque? Ullam saepe delectus ut fugiat nostrum quibusdam dolor voluptate consequuntur in asperiores? Iure nulla asperiores, laboriosam velit corrupti atque porro iste itaque quae laborum ipsam a."
}
const heroImage = ref(`${product.images.shift()}`)

const imgUrlDefault = 'https://placehold.co/600x400?text=Product+Image'


const products = [
    {
        id: 1,
        img: "https://placehold.co/600x400?text=Product+Image",
        name: "Buket Mawar Merah",
        price: 150000,
    },
    {
        id: 2,
        img: "https://placehold.co/600x400?text=Product+Image",
        name: "Buket Lily Elegan",
        price: 180000,
    },
    {
        id: 3,
        img: "https://placehold.co/600x400?text=Product+Image",
        name: "Buket Campuran Romantis",
        price: 200000,
    },
    {
        id: 4,
        img: "https://placehold.co/600x400?text=Product+Image",
        name: "Buket Wisuda Spesial",
        price: 170000,
    },
    {
        id: 5,
        img: "https://placehold.co/600x400?text=Product+Image",
        name: "Buket Tulip Mewah",
        price: 220000,
    }
];

const orderStore = useOrderStore();
const { cart } = storeToRefs(orderStore);

const setImage = (event) => {
    let temp = heroImage.value
    heroImage.value = event.target.src
    event.target.src = temp
    console.log(event.target.src);
}

const hasAddedToCart = (isAdded) => {

    if (isAdded) {
        const existingProduct = cart.value.find(item => item.id === product.id);
        console.log(existingProduct);

        if (existingProduct) {

            existingProduct.quantity += quantity.value;
            toast.info(`${existingProduct.name} quantity updated to ${existingProduct.quantity}`);
        } else {
            cart.value.push({ ...product, quantity : quantity.value, selected: false });
            toast.success('Successfully added to cart');
        }
    }

    quantity.value = 1
};

let prevCartState = JSON.parse(JSON.stringify(cart.value));

</script>