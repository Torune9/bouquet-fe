<template>
    <section>
        <h1 class="p-8 text-2xl font-bold">List Order</h1>
        <div class="text-end px-8 mb-2">
            <RouterLink to="/bouquet">
                <button class="btn btn-neutral">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" /> Back
                </button>
            </RouterLink>
        </div>
        <div class="w-full relative px-8 mb-4">
            <label for="search" class="absolute top-1/2 z-10 -translate-y-1/2 md:left-10 left-10">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
            </label>
            <input type="text" class="input w-full pl-8" id="search" name="search" placeholder="search order..." v-model="searchValue">
        </div>
        <div class="overflow-x-auto  capitalize px-8">
          <EasyDataTable :headers="headers" :items="items" table-class-name="customize-table"  :search-field="searchField"
          :search-value="searchValue" :rows-items="[10,20]" :rows-per-page="10">
            <template #item-action={action,token,orderId}>
                <button class="btn btn-sm btn-success" @click="payOut(token,orderId)" v-if="action == 'pay'">
                    {{ action }}
                </button>
            </template>
            <template #item-status={status}>
                <p :class="[status == 'pending' ? 'text-white text-center rounded-md  bg-orange-500' : '',status == 'paid' ? 'text-white text-center rounded-md  bg-primary' : '']">
                    {{ status }}
                </p>
            </template>
            <template #expand={id,product}>
               <ul class="list-decimal p-2">
                <li v-for="p in product">
                    <p class="font-semibold">{{ p.Bouquet.name }}</p> 
                    <span>quantity :  {{ p.quantity }}</span> 
                    <br>
                    <span class="text-red-600">{{ formatToIdr(p.Bouquet.price * p.quantity) }}</span>
                </li>
               </ul>
            </template>
          </EasyDataTable>
        </div>
    </section>
</template>

<script setup>
import { formatToIdr } from '@/services/formatter';
import { openSnap } from '@/services/snap';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';

const orderStore = useOrderStore()
const userStore = useAuthStore()

const searchField = ref('productNames');
const searchValue = ref('')

const router = useRouter()

const headers = [
    {
        text : "Order ID",
        value : "orderId"
    },
    {
        text : "Quantity",
        value : "quantity"
    },{
        text  : "Total Price",
        value : 'totalPrice'
    },
    {
        text : 'Status',
        value : 'status'
    },
    {
        text : "Order Date",
        value : 'createdAt'
    },
    {
        text : "Action",
        value : 'action'
    }
]

const items = computed(() => {
    return orders.value.map(val => {
        const totalQuantity = val.OrderItems.reduce((sum, item) => sum + item.quantity, 0);
        
        const productNames = val.OrderItems.map(item => item.Bouquet?.name).join(', ');

        return {
            orderId: val.midtransOrderId,
            product: val.OrderItems,
            productNames,
            quantity: totalQuantity,
            totalPrice: formatToIdr(val.totalPrice),
            status: val.status,
            token : val.token,
            createdAt: new Date(val.createdAt).toLocaleString(),
            action: val.status !== 'paid' ? 'pay' : 'done',
        };
    });
});



const {currentUser} = storeToRefs(userStore)

const orders = ref([])

const getOrderList = async ()=>{
    try {
        const response = await orderStore.getOrder(currentUser.value.id)
        console.log(response);

        orders.value = response.data
        
    } catch (error) {
        console.error(error);
    }
}

const {orderId} = storeToRefs(orderStore)


const payOut = async (token,id) => {  
    orderId.value = id

    if (orderId.value) {
        openSnap(token,router)
    }
}
onMounted(()=>{
    getOrderList()
})
</script>