<template>
    <LoadingOverlay :is-loading="isLoading" />
    <!-- profile -->
    <div class="flex flex-row gap-x-4">
        <!-- profile image -->
        <div class="w-fit h-full">
            <div class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden relative flex justify-content-center items-center">
                <div v-if="!srcImg"
                    class="w-full h-full bg-orioles-orange text-4xl text-white flex justify-center items-center text-uppercase">
                    <h1>
                        {{ currentUser.username[0] }}
                    </h1>
                </div>
                <img :src="srcImg" alt="img-profile" class="w-full h-full object-cover" v-else>
                <div class="absolute top-8 right-4 cursor-pointer text-white/80 mix-blend-difference md:right-2">
                    <label v-if="!payload.file" for="profile-img" class="cursor-pointer">
                        <font-awesome-icon icon="fa-solid fa-camera" size="lg" />
                    </label>
                    <button @click="removeFile" v-else for="profile-img" class="cursor-pointer text-red-200">
                        <font-awesome-icon icon="fa-solid fa-xmark" size="lg" />
                    </button>
                    <input type="file" id="profile-img" name="profile-img" @change="uploadProfile" class="hidden">
                </div>
            </div>
        </div>
        <!-- profile info -->
        <div class="flex flex-col gap-y-4 justify-center text-xs sm:text-lg w-fit">
            <div>
                <p>
                    <span class="w-16 sm:w-24 inline-flex justify-between">
                        Username
                        <span>:</span>
                    </span>&nbsp;{{ currentUser.username }}
                </p>
                <p>
                    <span class="w-16 sm:w-24 inline-flex justify-between">
                        Email
                        <span>:</span>
                    </span>&nbsp;{{ currentUser.email }}
                </p>
                <p>
                    <span class="w-16 sm:w-24 inline-flex justify-between">
                        Phone
                        <span>:</span>
                    </span>&nbsp;{{ phoneNumber ? phoneNumber : '-' }}
                </p>
            </div>
            <ul class="text-xs font-light">
                <li>
                    Adress Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, cum?
                </li>
            </ul>
        </div>
    </div>
    <!-- data profile -->
    <div>
        <h1 class="text-xl mb-2 border-b py-2">Your information</h1>
        <!-- Profile -->
        <form @submit.prevent="updateOrCreate" class="flex flex-col gap-y-2">
            <div>
                <label for="uname">Username</label>
                <input type="text" class="input w-full" id="uname" name="uname" v-model="payload.username">
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" class="input w-full" id="email" name="email" v-model="payload.email">
            </div>
            <div class="inline-flex gap-x-3 w-full">
                <div class="w-full">
                    <label for="fname">First Name</label>
                    <input type="text" class="input w-full" id="fname" name="fname" v-model="payload.firstName">
                </div>
                <div class="w-full">
                    <label for="lname">Last Name</label>
                    <input type="text" class="input w-full" id="lname" name="lname" v-model="payload.lastName">
                </div>
            </div>
            <div class="w-full">
                <label for="phone">Phone Number</label>
                <input type="tel" class="input w-full" id="phone" name="phone" v-model="payload.phoneNumber"
                    @input="phoneNumberValidate" placeholder="Example: 081234567890" maxlength="12">
                <small class="text-red-700" v-if="phoneError">
                    {{ phoneError }}
                </small>
            </div>
            <button class="btn w-full btn-success">Update</button>
        </form>
    </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profileStore';
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'vue3-toastify';
import { storeToRefs } from 'pinia';


const authStore = useAuthStore()

const { currentUser } = storeToRefs(authStore)
const profileStore = useProfileStore()
const { phoneNumber } = storeToRefs(profileStore)

const srcImg = ref('')
const MAX_SIZE = 5 * 1024 * 1024;
const uploadProfile = (event) => {
    let file = event.target.files[0]
    const fr = new FileReader()

    if (file) {
        if (file.size > MAX_SIZE) {
            toast.error(`File must be low than ${MAX_SIZE * 1000}mb`)
            return file = ''
        }
        fr.onload = () => {
            srcImg.value = fr.result
            payload.file = file
        }
        fr.onerror = () => {
            toast.error(`Error occurred readings file: ${file.name}`)
        }
        fr.readAsDataURL(file)
    }
    console.log(file);
}

const removeFile = () => {
    srcImg.value = ''
    return payload.file = ''
}

const phoneError = ref('')
const isLoading = ref(false)

const payload = reactive({
    username: currentUser.value.username,
    email: currentUser.value.email,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    file: ''
})


const phoneNumberValidate = () => {
    let regex = /^[0-9]{10,13}$/;

    if (!regex.test(payload.phoneNumber)) {
        phoneError.value = 'please input only number'
        return false;
    }
    phoneError.value = ''
    return payload.phoneNumber;
}

const getProfile = async () => {
    try {
        const response = await profileStore.getProfiles(currentUser.value.id)

        Object.assign(payload, {
            firstName: response.data?.firstName,
            lastName: response.data?.lastName,
            phoneNumber: response.data?.phoneNumber
        })

        profileStore.phoneNumber = response.data?.phoneNumber
        srcImg.value = response.data?.image

        console.log(response.data);

    } catch (error) {
        console.log(error);

    }
}

const updateOrCreate = async () => {
    isLoading.value = !isLoading.value
    try {
        const formData = new FormData()
        formData.append('firstName', payload.firstName)
        formData.append('lastName', payload.lastName)
        formData.append('phoneNumber', payload.phoneNumber)

        if (payload.file) {
            formData.append('image', payload.file)
        }

        await profileStore.updateOrCreateProfile(currentUser.value.id, formData)
        toast.success('success update or create profile')
    } catch (error) {
        console.log(error);
        toast.error(error)
    } finally {
        await getProfile()
        payload.file = ''
        isLoading.value = !isLoading.value
    }
}

onMounted(async () => {
    await getProfile()
})


</script>