<template>
    <LoadingOverlay :is-loading="isLoadingOverlay"/>
    <div class="flex flex-col gap-y-8">
        <!-- Tombol Back -->
        <section>
            <button class="mb-4">
                <RouterLink to="/admin/bouquet" class="btn">
                    <span><font-awesome-icon icon="fa-solid fa-arrow-left" /></span>&nbsp;
                    <span>Back</span>
                </RouterLink>
            </button>
        </section>

        <!-- Upload Gambar -->
        <section>
            <div class="flex flex-col h-full w-full gap-y-4 lg:px-32 md:px-20">
                <!-- Input File -->
                <label for="imageUpload"
                    class="flex flex-col bg-white/50 border-2 border-dashed h-48 justify-center rounded-md text-slate-700 cursor-pointer gap-y-4 hover:bg-black/5 items-center md:h-72 relative transition-colors">
                    <p class="text-3xl">
                        <font-awesome-icon icon="fa-solid fa-upload" />
                    </p>
                    <p class="text-sm font-semibold">Upload Images</p>
                    <small>PNG, JPG, JPEG are Allowed</small>
                    <input type="file" class="hidden" id="imageUpload" multiple @change="uploadImage">

                    <!-- Indikator Loading -->
                    <div v-if="isLoading"
                        class="flex bg-white/80 justify-center rounded-md absolute inset-0 items-center">
                        <span class="loading loading-spinner loading-xs"></span>
                        <p class="text-blue-600 text-sm">Processing images...</p>
                    </div>

                    <!-- Preview Gambar Utama -->
                    <div class="bg-white h-full rounded-md shadow-md w-full absolute inset-0 md:w-full"
                        v-if="mainImage">
                        <img :src="mainImage" alt="upload image" class="h-full w-full object-contain">
                        <button class="btn btn-circle btn-error btn-xs -right-2 -top-2 absolute" type="button"
                            @click="removeImage(0)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>

                </label>


                <!-- Preview Thumbnail -->
                <div class="justify-between w-full gap-2 inline-flex" v-if="thumbnails.length">
                    <div class="bg-white h-20 rounded-md shadow-md w-20 md:h-32 md:w-32 relative sm:h-28 sm:w-28"
                        v-for="(img, index) in thumbnails" :key="index">
                        <img :src="img" alt="image-product" class="h-full rounded-md w-full object-cover">
                        <button class="btn btn-circle btn-error btn-xs -right-2 -top-2 absolute" type="button"
                            @click="removeImage(index + 1)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <form @submit.prevent="addBouquet" class="flex flex-col gap-y-3 lg:px-32 md:px-20">
                <div>
                    <label for="name">Bouquet name</label>
                    <input type="text" id="name" name="name" class="input w-full" v-model="payload.name">
                    <small class="text-red-600" v-if="v$.name.$error"
                        v-for="error in v$.name.$errors">{{ error.$message }}</small>
                </div>
                <div class="flex flex-row gap-x-2">
                    <div class="w-full">
                        <label for="price">Bouquet price</label>
                        <input type="number" class="input w-full" id="price" name="price" v-model="payload.price">
                        <small class="text-red-600" v-if="v$.price.$error"
                            v-for="error in v$.price.$errors">{{ error.$message }}</small>
                    </div>
                    <div class="w-full">
                        <label for="stock">Bouquet stock</label>
                        <input type="number" class="input w-full" id="stock" name="stock" v-model="payload.stock">
                        <small class="text-red-600" v-if="v$.stock.$error"
                            v-for="error in v$.stock.$errors">{{ error.$message }}</small>
                    </div>
                </div>
                <div>
                    <label for="category">Category</label>
                    <select class="w-full select" id="category" v-model="payload.category">
                        <option disabled value="">Please select one</option>
                        <option v-for="category in categories" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <small class="text-red-600" v-if="v$.category.$error"
                        v-for="error in v$.category.$errors">{{ error.$message }}</small>
                </div>
                <div>
                    <label for="description" class="block">Description</label>
                    <textarea class="h-48 w-full textarea" placeholder="Bio" id="description"
                        name="description"></textarea>
                </div>
                <button class="btn btn-success">Add</button>
            </form>
        </section>
        
    </div>
</template>

<script setup>
import { useBouquetStore } from '@/stores/bouquetStore';
import { ref, computed, reactive} from 'vue';
import { toast } from 'vue3-toastify';
import { required, integer } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useCategoryStore } from '@/stores/categoryStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const bouquetStore = useBouquetStore()
const categoryStore = useCategoryStore()

const router = useRouter()

const sources = ref([]);
const isLoading = ref(false)
const isLoadingOverlay = ref(false)
const category = ref('')
const {categories} = storeToRefs(categoryStore)


const payload = reactive({
    name: '',
    price: 0,
    stock: 0,
    images: [],
    description: '',
    category: category.value
})

const rules = computed(() => ({
    name: {
        required,
    },
    price: {
        required,
        integer
    },
    stock: {
        required
    },
    category: {
        required
    }
}))

const v$ = useVuelidate(rules.value, payload)


const mainImage = computed(() => sources.value.length > 0 ? sources.value[0] : null);
const thumbnails = computed(() => sources.value.slice(1));

const uploadImage = (event) => {
    let files = Array.from(event.target.files);

    if (files.length === 0) return;

    if (sources.value.length + files.length > 5) {
        return toast.info('Total images must be less than or equal to 5');
    }

    isLoading.value = true; // Mulai loading

    const readFiles = files.map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    Promise.all(readFiles)
        .then(images => {
            sources.value = [...sources.value, ...images].slice(0, 5);
        })
        .finally(() => {
            isLoading.value = false; // Selesai loading
        });

    payload.images = files
};


const removeImage = (index) => {
    sources.value.splice(index, 1);
};

const addBouquet = async () => {
    isLoadingOverlay.value = !isLoadingOverlay.value
    const payloads = new FormData()
    try {
        payloads.append('name', payload.name)
        payloads.append('price', payload.price)
        payloads.append('stock', payload.stock)
        payloads.append('description', payload.description)
        payloads.append('categoryId', payload.category)
        if (payload.images) {
            payload.images.forEach(file => {
                payloads.append('image', file)
            })
        }
        const isValidate = await v$.value.$validate()

        if (!isValidate) return

        const response = await bouquetStore.addBouquet(payloads)
    
        if (response) {
            return router.replace({
                path: '/admin/bouquet',
                state: {
                    isSuccess: true
                }
            })
        }
    } catch (error) {
        console.log(error);
        return toast.error(error)
    } finally {
        Object.assign(payload, {
            name: '',
            price: 0,
            stock: 0,
            images: [],
            description: '',
            category: category.value
        });

        sources.value = [];
        isLoadingOverlay.value = !isLoadingOverlay.value
    }

}
</script>
