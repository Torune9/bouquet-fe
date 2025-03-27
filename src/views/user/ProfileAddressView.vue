<template>
    <LoadingOverlay :is-loading="isLoading" />
    <!-- Address -->
    <form @submit.prevent="addAddres" class="flex flex-col items-center mt-8 w-full gap-y-4">
        <div class="inline-flex gap-x-4 w-full">
            <div class="w-full">
                <select class="select w-full" v-model="address.province">
                    <option disabled selected :value="''">Province</option>
                    <option v-for="province in provinces" :value="province">
                        {{ province.name }}
                    </option>
                </select>
                <small class="text-red-700 text-xs" v-if="v$.province.$error" v-for="error in v$.province.$errors">
                    {{ error.$message }}
                </small>
            </div>
            <div class="w-full">
                <select class="select w-full" v-model="address.city">
                    <option disabled selected :value="''">City</option>
                    <option v-for="city in city" :value="city">{{ city.name }}</option>
                </select>

                <small class="text-red-700 text-xs" v-if="v$.city.$error" v-for="error in v$.city.$errors">
                    {{ error.$message }}
                </small>
            </div>
        </div>
        <div class="inline-flex gap-x-4 w-full">
            <div class="w-full">
                <select class="select w-full" v-model="address.regency">
                    <option disabled selected :value="''">Regency</option>
                    <option v-for="regency in regency" :value="regency">{{ regency.name }}</option>
                </select>
                <small class="text-red-700 text-xs" v-if="v$.regency.$error" v-for="error in v$.regency.$errors">
                    {{ error.$message }}
                </small>
            </div>
            <div class="w-full">
                <select class="select w-full" v-model="address.district">
                    <option disabled selected :value="''">District</option>
                    <option v-for="district in district" :value="district">{{ district.name }}</option>
                </select>
                <small class="text-red-700 text-xs" v-if="v$.district.$error" v-for="error in v$.district.$errors">
                    {{ error.$message }}
                </small>
            </div>
        </div>
        <div class="w-full">
            <label for="street">Street</label>
            <input type="text" class="input w-full" v-model="address.street" name="street" id="street">
            <small class="text-red-700 text-xs" v-if="v$.street.$error" v-for="error in v$.street.$errors">
                {{ error.$message }}
            </small>
        </div>
        <div class="w-full">
            <label for="post">Postal Code</label>
            <input type="text" class="input w-full" v-model="address.postCode" name="post" id="post">
            <small class="text-red-700 text-xs" v-if="v$.postCode.$error" v-for="error in v$.postCode.$errors">
                {{ error.$message }}
            </small>
        </div>
        <button class="btn w-full btn-primary">add</button>
    </form>
    <h1 class="mt-2 p-2 text-lg border-b">Your address</h1>
    <!-- <ul> sekarang akan mengisi sisa ruang -->
    <ul class="overflow-y-auto flex-grow min-h-0">
        <li class="border-b py-2 inline-flex justify-between items-center w-full" v-for="address in addresses">
           <div class="flex flex-col">
            <p>
                <span class="capitalize">{{ address.street }}</span>,
                <span>{{ address.district }}</span>
                <span>{{ address.regency }}</span>,
            </p>
            <p class="text-sm">
                <span>{{ address.city }}</span>,
                <span>{{ address.province }}</span>.
            </p>
            <p class="text-xs">
                {{ address.postalCode }} 
            </p>
           </div>
            <button class="btn btn-ghost btn-circle" type="button" @click="deleteAddress(address.id)">
                <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
        </li>
    </ul>
</template>

<script setup>
import { getCity, getDistrict, getProvince, getRegency } from '@/services/emsifaApi';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import useVuelidate from '@vuelidate/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { required } from '@vuelidate/validators';
import { toast } from 'vue3-toastify';

const profileStore = useProfileStore()
const userStore = useAuthStore()
const { currentUser } = storeToRefs(userStore)

const address = reactive({
    province: '',
    city: '',
    regency: '',
    district: '',
    street: '',
    postCode: '',
    userId: currentUser.value.id
})

const rules = computed(() => ({
    province: { required },
    city: { required },
    regency: { required },
    district: { required },
    street: { required },
    postCode: { required }
}))

const v$ = useVuelidate(rules, address)
const isLoading = ref(false)

const provinces = ref([])
const city = ref([])
const regency = ref([])
const district = ref([])

const addAddres = async () => {
    const invalid = await v$.value.$validate()
    if (!invalid) {
        return
    }
    isLoading.value = !isLoading.value
    try {
        const newAddress = {
            province: address.province.name,
            city: address.city.name,
            regency: address.regency.name,
            district: address.district.name,
            street: address.street,
            userId: address.userId,
            postalCode: address.postCode
        }

        await profileStore.addAddress(newAddress)
        toast.success('Success adding new address')

        Object.assign(address, {
            province: '',
            city: '',
            regency: '',
            district: '',
            street: '',
            postCode: '',
        })

    } catch (error) {
        console.log(error);
        toast.error('Failed to add address')

    } finally {
        isLoading.value = !isLoading.value
        getAddress()
    }
}

const addresses = ref([])

const getAddress = async () => {
    isLoading.value = !isLoading.value
    try {
        const response = await profileStore.getAddress(currentUser.value.id)
        addresses.value = response.data

    } catch (error) {
        console.log(error);
        toast.error(error)
    } finally {
        isLoading.value = !isLoading.value
    }
}

const deleteAddress = async (id)=>{
    try {
        await profileStore.deleteAddress(id)
        toast.success('address has successfully delete')
    } catch (error) {
        console.log(error);
        toast.error(error)
        
    }finally{
        await getAddress()
    }
}


onMounted(async () => {
    Promise.all([
        await getAddress(),
        provinces.value = await getProvince(),
    ])
})

watch(() => address.province, async (newProvince) => {
    if (newProvince) {
        city.value = await getCity(newProvince.id);
    } else {
        city.value = [];
    }
});

watch(() => address.city, async (newCity) => {
    if (newCity) {
        regency.value = await getRegency(newCity.id);
    } else {
        regency.value = [];
    }
});

watch(() => address.regency, async (newRegency) => {
    if (newRegency) {
        district.value = await getDistrict(newRegency.id);
    } else {
        district.value = [];
    }
});

</script>