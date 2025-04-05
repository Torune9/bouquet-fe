<template>
    <ModalConfirm modal-id="my_modal" :bouquet="product" @add-to-cart="hasAddedToCart" />
    <ModalImage :isOpen="isOpen" :src="srcImageModal" @close="closeModal" />
    <MainLayout>
        <template #content>
            <ModalOrder :is-order-modal="isOpenOrderModal" :bouquet="orderBouquetDetail" @close="closeModalorder"
                @confirmOrder="confirmOrder" v-model:firstName="payload.firstName" v-model:lastName="payload.lastName"
                v-model:address="payload.addressId" v-model:phoneNumber="payload.phone" />
            <!-- navigation -->
            <div class="breadcrumbs text-sm p-2">
                <ul>
                    <li>
                        <RouterLink to="/bouquet">
                            Bouquet
                        </RouterLink>
                    </li>
                    <li class="capitalize">{{ product.name }}</li>
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
                            <img :src="heroImage ? heroImage.path : imgUrlDefault" alt="bouquet-image"
                                class="h-full w-full object-contain">
                        </div>
                        <!-- image child -->
                        <div class="flex flex-row justify-between sm:flex-col sm:gap-2" ref="childImage">
                            <div class="h-18 lg:h-20 cursor-pointer w-20" v-for="image of product.ImageBouquets"
                                @click="setImage">
                                <img :src="image.path" class=" h-full w-full object-cover">
                            </div>
                        </div>
                    </div>
                    <!-- info product -->
                    <div class="flex flow-row justify-between items-center font-semibold">
                        <h1 class="text-xl">{{ product.name }}</h1>
                        <h2 class="text-lg">{{ formatToIdr(product.price) }}</h2>
                    </div>
                    <h1>
                        Stock : {{ product.stock }}
                    </h1>
                    <!-- description -->
                    <div class="flex flex-col gap-y-4">
                        <div>
                            <p>
                                {{ !isExpanded && product.description ? `${product.description.slice(0, 100)}...` : product.description }}
                            </p>
                            <button @click="toggleExpand" class="text-blue-500 underline cursor-pointer text-sm">
                                {{ showInfo }}
                            </button>
                        </div>

                        <div class="flex gap-x-2">
                            <button @click="() => quantity++" class="btn btn-xs">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                            <input type="text" v-model="quantity" class=" field-sizing-content text-center min-w-10">
                            <button @click="() => quantity == 0 ? 0 : quantity--" class="btn btn-xs">
                                <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                        </div>
                        <div class="flex flex-row justify-between items-center">
                            <span>
                                <span class="border w-20 text-center rounded-md text-info inline-block mr-2">New</span>
                                <span
                                    class="border w-20 text-center rounded-md text-orioles-orange inline-block">Hot</span>
                            </span>
                        </div>
                    </div>
                    <!-- order btn -->
                    <div class="flex flex-row  justify-between gap-x-2 lg:justify-evenly">
                        <button class="btn btn-lg w-1/2 btn-success sm:w-52" @click="createOrder">
                            Order
                        </button>
                        <button class="btn btn-lg btn-warning w-40 sm:w-52" onclick="my_modal.showModal()">
                            add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex mt-4 flex-wrap gap-x-1 gap-y-4 justify-center sm:gap-x-4">
                <ProductCard v-for="bouquet in productsFilter" :bouquet="bouquet" />
            </div>
        </template>
    </MainLayout>
</template>

<script setup>
import ModalConfirm from '@/components/info/ModalConfirm.vue';
import ProductCard from '@/components/card/ProductCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';

import { toast } from 'vue3-toastify';
import { useOrderStore } from '@/stores/orderStore';
import { ref, computed, onMounted, watch, onUpdated, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useBouquetStore } from '@/stores/bouquetStore';
import { useRoute, useRouter } from 'vue-router';
import ModalImage from '@/components/modal/ModalImage.vue';
import { formatToIdr } from '@/services/formatter';
import { useAuthStore } from '@/stores/authStore';
import ModalOrder from '@/components/modal/ModalOrder.vue';
import { openSnap } from '@/services/snap';

const bouquetStore = useBouquetStore()

const isExpanded = ref(false);
const isOpenOrderModal = ref(false)

const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const showInfo = computed(() => {
    return isExpanded.value ? 'Show less' : 'Show more'
})

const quantity = ref(1)

const product = ref({})
const heroImage = computed(() => {
    return product.value.ImageBouquets?.shift()
})

const imgUrlDefault = 'https://placehold.co/600x400?text=Product+Image'

const products = ref([])
const productsFilter = computed(() => {
    return products.value.filter(val => val.id !== route.params.id)
})

const orderStore = useOrderStore();
const { cart } = storeToRefs(orderStore);
const route = useRoute()
const router = useRouter()

const isOpen = ref(false)
const srcImageModal = ref('')

const setImage = (event) => {
    isOpen.value = !isOpen.value
    srcImageModal.value = event.target.src
}

const closeModal = (data) => {
    return isOpen.value = data
}

const closeModalorder = (data) => isOpenOrderModal.value = data

const hasAddedToCart = (isAdded) => {

    if (isAdded) {
        const existingProduct = cart.value.find(item => item.id === product.value.id);

        if (existingProduct) {

            existingProduct.quantity += quantity.value;
            toast.info(`${existingProduct.name} quantity updated to ${existingProduct.quantity}`);
        } else {
            cart.value.push({ ...product.value, quantity: quantity.value, selected: false });
            toast.success('Successfully added to cart');
        }
    }
    quantity.value = 1
}

const getDetailBouquet = async () => {
    try {
        const response = await bouquetStore.getDetailBouquet(route.params.id)
        Object.assign(product.value, response.data)
    } catch (error) {
        console.log(error);

    }
}

const getBouquet = async (id) => {
    try {
        const response = await bouquetStore.getBouquets({ category: id })
        products.value = response.data
    } catch (error) {
        console.log(error);
    }
}
const userStore = useAuthStore()
const { currentUser } = storeToRefs(userStore)
const payload = reactive({
    userId: currentUser.value?.id,
    email: currentUser.value?.email,
    addressId: '',
    phone: '',
    firstName: '',
    lastName: '',
    items: computed(() => [{
        id: product.value.id,
        quantity: quantity.value,
        price: product.value.price,
        name: product.value.name
    }]),
    totalPrice: computed(() => quantity.value * (product.value.price || 0))

})
const orderBouquetDetail = ref({})

const createOrder = () => {
    if (!currentUser.value?.token) {
        return toast.info('please login first')
    }

    isOpenOrderModal.value = !isOpenOrderModal.value

    if (isOpenOrderModal) {
        orderBouquetDetail.value = {
            ...Object.assign(product.value, {
                heroImage: heroImage.value
            }),
            quantity: quantity.value
        }
    } else {
        orderBouquetDetail.value = ''
    }
}

const confirmOrder = async () => {
    try {
        const response = await orderStore.createOrder(payload)
        openSnap(response.data.snapToken,router)
    } catch (error) {
        console.log(error);

    } finally {
        closeModalorder(false)
    }
}

watch(product, (newVal, oldVal) => {
    if (newVal) {
        getBouquet(newVal.categoryId)
    }
}, {
    deep: true
})

watch(route, () => {
    getBouquet(route.params.id)
}, {
    deep: true
})

onUpdated(() => getDetailBouquet())

onMounted(() => getDetailBouquet())

</script>