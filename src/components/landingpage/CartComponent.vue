<template>
    <LoadingOverlay :isLoading="isLoading"/>
    <Transition name="slide-fade">
        <div v-if="isShowCart"
            class="fixed bg-black/30 w-full h-[90dvh] max-sm:h-[90vh] flex-col flex z-30 box-border items-end overflow-y-auto font-archivo hide-scrollbar" @click="closeCart" id="wrapper">
            <h1 class="sticky top-0 w-full lg:w-2/5 sm:w-2/4 bg-orioles-orange p-4 text-xl text-orioles-linen">Your Cart
            </h1>
            <div class="bg-white shadow-xl w-full flex flex-col gap-2 p-2 lg:w-2/5 sm:w-2/4 h-full overflow-y-auto hide-scrollbar"
                v-if="cart.length > 0">
                <div v-for="(product, i) in cart" :key="product.id"
                    class="flex flex-row w-full border-b p-2 hover:bg-lavender/20 gap-x-2 relative z-0">
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
                        <img :src="product.ImageBouquets.length > 0 ? product.ImageBouquets[product.ImageBouquets.length - 1].path : 'https://placehold.co/600x400?text=Bouquet Image'"
                            class="w-full h-full object-cover" />
                    </div>
                    <div class="flex flex-col item h-full w-full pl-4">
                        <h1 class="text-lg hover:underline">
                            <RouterLink :to="{
                                name: 'detail-bouquet',
                                params: {
                                    id: product.id
                                }
                            }">
                                {{ sliceName(product.name) }}
                            </RouterLink>
                        </h1>
                        <h2>{{ formatToIdr(product.price) }}</h2>
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
                    Total Price : {{ formatToIdr(totalSelectedPrice) }}
                </p>
                <button class="btn btn-md btn-neutral w-full" @click="checkout">Checkout</button>
            </div>
            <div class="bg-white shadow-xl w-full h-full flex flex-col overflow-y-auto scroll-smooth gap-2 p-2 hide-scrollbar lg:w-2/5 sm:w-2/4 items-center justify-center"
                v-else>
                <p>Opps don't have any products in your cart yet</p>
                <p>Come explore the interesting bouquet</p>
                <RouterLink to="/bouquet">
                    <button class="btn btn-neutral" id="btnBuy">Buy Now</button>
                </RouterLink>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { formatToIdr } from '@/services/formatter';
import { useOrderStore } from '@/stores/orderStore';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { ref,reactive,computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'vue3-toastify';
import { openSnap } from '@/services/snap';


const props = defineProps({
    isShowCart: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['close'])

const closeCart = (event)=>{
    switch (event.target.id) {
        case 'wrapper':
            return emits('close',false)
        case 'btnBuy' : 
            return emits('close',false)
        default:
            break;
    }  
}

const profileStore = useProfileStore()
const orderStore = useOrderStore()
const userStore = useAuthStore()

const router = useRouter()

const {currentUser} = storeToRefs(userStore)
const {activeAddress,profile,address} = storeToRefs(profileStore)
const { cart, selectedItems, totalPrice } = storeToRefs(orderStore)

const isLoading = ref(false)

const increment = (product) => {
    return product.quantity++
}

const decrement = (product) => {
    if (product.quantity > 1) {
        product.quantity--;
    }
}

const removeFromCart = (index) => {
    return [
        cart.value.splice(index, 1),
        selectedItems.value.splice(index, 1),
        orderStore.resetPrice()
    ]
}

const sliceName = (name) => name.length > 15 ? `${name.slice(0, 15)}....` : name

const selectedItem = (product) => {
    if (product.selected) {
        console.log(selectedItems.value);
        
        selectedItems.value.push(product)
    } else {
        selectedItems.value = selectedItems.value.filter(item => item.id !== product.id);

    }
}

const totalSelectedPrice = computed(() => {
    totalPrice.value = selectedItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    return totalPrice.value
})


const payload = reactive({
    userId: currentUser.value?.id,
    email: currentUser.value?.email,
    addressId: activeAddress.value?.id,
    phone: profile.value?.phoneNumber || '',
    firstName: profile.value?.firstName,
    lastName: profile.value?.lastName,
    items: computed(()=>selectedItems.value.map(val => ({
        id : val.id,
        quantity : val.quantity,
        name : val.name,
        price : val.price
    }))),
    totalPrice: computed(()=>totalSelectedPrice.value)
})

const checkout = async()=>{ 

    if (!currentUser.value?.token) {
        return toast.info('please login first')
    }
    
    if (!profile.value || address.value.length == 0) {
        return toast.warning("Please complete your profile first")
    } 
    if (!activeAddress.value) {
        return toast.warning("Please select one active address")
    }
    if (selectedItems.value.length == 0) {
        return toast.info("Please select one items before checkout")
    }
    isLoading.value = !isLoading.value
    try { 
        const response = await orderStore.createOrder(payload)
        openSnap(response.data.snapToken,router)
        selectedItems.value = []
        cart.value = cart.value.filter(val => !val.selected)
    } catch (error) {
        console.log(error);
    }finally{
        isLoading.value = !isLoading.value
    }
}
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