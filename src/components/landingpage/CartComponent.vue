<template>
    <Transition name="slide-fade">
        <div v-if="isShowCart"
        class="fixed bg-black/30 w-full h-[90dvh] max-sm:h-[90vh] flex-col flex z-30 box-border items-end overflow-y-auto font-archivo hide-scrollbar">
        <h1 class="sticky top-0 w-full lg:w-2/5 sm:w-2/4 bg-orioles-orange p-4 text-xl text-orioles-linen">Your Cart</h1>
            <div class="bg-white shadow-xl w-full flex flex-col gap-2 p-2 lg:w-2/5 sm:w-2/4 h-full overflow-y-auto hide-scrollbar"
                v-if="cart.length > 0">
                <div v-for="(product, i) in cart" :key="product.id"
                    class="flex flex-row w-full border-b p-2 hover:bg-lavender/20 cursor-pointer gap-x-2 relative z-0">
                    <!-- btn select product -->
                    <div class="flex items-center absolute bottom-2 right-4 z-10">
                        <input type="checkbox" class="checkbox checked:bg-success" v-model="product.selected"
                            @change="selectedItem(product)" />
                    </div>
                    <!-- btn delete -->
                    <button class="cursor-pointer btn btn-ghost btn-circle absolute right-2 top-2 z-10" type="button"
                        @click="removeFromCart(i)">
                        <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
                    </button>
                    <div class="h-28 w-3/4 rounded-lg overflow-hidden">
                        <img src="https://placehold.co/600x400?text=Product+Image" alt="product-image"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col item h-full w-full pl-4">
                        <h1 class="text-lg">{{ sliceName(product.name) }}</h1>
                        <h2>Rp {{ product.price }}</h2>
                        <p>Quantity : {{ product.quantity }}</p>
                        <div class="flex gap-x-2">
                            <button @click="increment(product)" class="btn btn-xs">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                            </button>
                            <button @click="decrement(product)" class="btn btn-xs">
                                <font-awesome-icon icon="fa-solid fa-minus" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="cart.length !== 0" class="sticky bottom-0 w-full lg:w-2/5 sm:w-2/4 bg-white p-4">
                <p class="text-lg mb-2">
                    Total Price : {{ totalSelectedPrice }}
                </p>
                <button class="btn btn-md btn-neutral w-full">Checkout</button>
            </div>
            <div class="bg-white shadow-xl w-full h-full flex flex-col overflow-y-auto scroll-smooth gap-2 p-2 hide-scrollbar lg:w-2/5 sm:w-2/4 items-center justify-center"
                v-else>
                <p>Opps don't have any products in your cart yet</p>
                <p>Come explore the interesting bouquet</p>
                <RouterLink to="/bouquet">
                    <button class="btn btn-neutral">Buy Now</button>
                </RouterLink>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { useOrderStore } from '@/stores/orderStore';
import { storeToRefs } from 'pinia';
import { ref, computed} from 'vue';

const props = defineProps({
    isShowCart: {
        type: Boolean,
        default: false
    }
})

const orderStore = useOrderStore()

const { cart } = storeToRefs(orderStore)

const increment = (product) => {
    return product.quantity++
}

const decrement = (product) => {
    if (product.quantity > 1) {
        product.quantity--;
    }
}

const removeFromCart = (index) => {
    return cart.value.splice(index, 1)
}

const checkoutItems = ref([])


const sliceName = (name) => name.length > 15 ? `${name.slice(0, 15)}....` : name

const selectedItem = (product) => {
    if (product.selected) {
        checkoutItems.value.push(product)
    } else {
        checkoutItems.value = checkoutItems.value.filter(item => item.id !== product.id);

    }
}

const totalSelectedPrice = computed(() => {
    return checkoutItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .8s ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>