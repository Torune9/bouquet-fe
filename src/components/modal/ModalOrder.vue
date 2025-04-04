<template>
    <div class="w-full h-lvh fixed z-50 bg-black/50 glass text-black flex justify-center items-center inset-0"
        v-if="isOrderModal">
        <div class="flex flex-col w-full gap-y-4 sm:w-96 h-full overflow-y-auto bg-white p-4">
            <h1 class="text-2xl">Order Detail</h1>
            <div class="w-full space-y-4">
                <!-- image product -->
                <div class="h-40 w-full sm:h-52">
                    <img :src="srcImage" alt="image-bouquet" class="w-full h-full object-cover">
                </div>
                <!-- info product -->
                <div class="space-y-1">
                    <h1 class="capitalize text-lg">
                        Name : {{ detailOrderBouquet.name }}</h1>
                    <h3>
                        Price : {{ formatToIdr(detailOrderBouquet.price) }}
                    </h3>
                    <h3 class="text-sm">
                        Quantity : {{ detailOrderBouquet.quantity }}
                    </h3>
                    <h4 class="font-semibold text-end">
                        Total price : {{ formatToIdr(totalPrice) }}
                    </h4>
                    <h4 class="text-end text-sm">
                        Email : {{ currentUser.email }}
                    </h4>
                </div>
                <!-- input -->
                <div class="space-y-2">
                    <h1 class="border-b py-2">Your Information</h1>
                    <div class="space-y-1">
                        <label class="inline-block text-xs" for="fname">First Name</label>
                        <input type="text" id="fname" name="fname" class="input w-full input-sm" v-model="firstNameModel">
                    </div>
                    <div class="space-y-1">
                        <label class="inline-block text-xs" for="lname">Last Name</label>
                        <input type="text" id="lname" name="lname" class="input w-full input-sm" v-model="lastNameModel">
                    </div>
                    <div class="space-y-1">
                        <label class="inline-block text-xs" for="pnumber">Phone Number</label>
                        <input type="text" id="pnumber" name="pnumber" class="input w-full input-sm"
                            v-model="phoneNumberModel">
                    </div>
                    <div>
                        <label class="text-xs" for="address">Address</label>
                        <select name="address" id="address" v-model="address" class="select w-full select-sm">
                            <option value="" disabled>select Address</option>
                            <option :value="address.id" v-for="address in addresses">
                                {{ `${address.street},${address.regency},${address.district},${address.city},${address.province}` }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- btn order -->
                <div class="text-end space-x-2">
                    <button class="btn btn-warning w-24" @click="closeModal">
                        Close
                    </button>
                    <button class="btn btn-success w-32" @click="confirmOrder">
                        Order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatToIdr } from '@/services/formatter'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const firstNameModel = defineModel('firstName')
const lastNameModel = defineModel('lastName')
const phoneNumberModel = defineModel('phoneNumber')
const address = defineModel('address',{ default: "" })
const router = useRouter()

const props = defineProps({
    isOrderModal: {
        type: Boolean,
        default: false
    },
    bouquet: {
        type: Object
    }
})

const totalPrice = computed(() => props.bouquet.price * props.bouquet.quantity)

const emits = defineEmits(['confirmOrder', 'close'])

const detailOrderBouquet = computed(() => props.bouquet)
const srcImage = computed(() => props.bouquet.heroImage ? props.bouquet.heroImage.path : 'https://placehold.co/600x400?text=IMAGE BOUQUET')

const confirmOrder = () => {
    const infoAddress = computed(()=>addresses.value.length == 0)

    if (!address.value) {
        toast.warning("Please fill the address field")
        return 
    }

    if (infoAddress.value || (!firstNameModel.value && !lastNameModel.value)) {
        return toast.warning("Please fill in the address and profile first on the profile page",{
            autoClose : 500,
            onClose : ()=>{
                router.replace('/profile')
            }
        },)

    }else{
        return emits('confirmOrder')
    }
}
const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)
const profileStore = useProfileStore()

const addresses = ref([])

const getAddress = async () => {
    try {
        const response = await profileStore.getAddress(currentUser.value.id)
        addresses.value = response.data
    } catch (error) {
        console.log(error);
    }
}

const getProfile = async () => {
    try {
        const response = await profileStore.getProfiles(currentUser.value.id)

        const {firstName,lastName,phoneNumber}  = response.data

        firstNameModel.value = firstName
        lastNameModel.value = lastName
        phoneNumberModel.value = phoneNumber

    } catch (error) {
        console.log(error);
    }
}

const closeModal = () => emits('close', !props.isOrderModal)

onMounted(() => {
    Promise.all([
        getAddress(),
        getProfile()
    ])
})
</script>