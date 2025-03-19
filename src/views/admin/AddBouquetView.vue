<template>
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
            <div class="w-full h-full flex flex-col gap-y-4 md:px-20 lg:px-32">
                <!-- Input File -->
                <label for="imageUpload"
                    class="cursor-pointer border-2 flex flex-col justify-center items-center h-48 md:h-72 gap-y-4 text-slate-700 border-dashed rounded-md bg-white/50 hover:bg-black/5 transition-colors relative">
                    <p class="text-3xl">
                        <font-awesome-icon icon="fa-solid fa-upload" />
                    </p>
                    <p class="text-sm font-semibold">Upload Images</p>
                    <small>PNG, JPG, JPEG are Allowed</small>
                    <input type="file" class="hidden" id="imageUpload" multiple @change="uploadImage">

                    <!-- Indikator Loading -->
                    <div v-if="isLoading"
                        class="absolute inset-0 flex justify-center items-center bg-white/80 rounded-md">
                        <span class="loading loading-spinner loading-xs"></span>
                        <p class="text-blue-600 text-sm">Processing images...</p>
                    </div>

                    <!-- Preview Gambar Utama -->
                    <div class="w-full h-full md:w-full bg-white absolute inset-0 rounded-md shadow-md"
                        v-if="mainImage">
                        <img :src="mainImage" alt="upload image" class="w-full h-full object-contain">
                        <button class="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error" type="button"
                            @click="removeImage(0)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>

                </label>


                <!-- Preview Thumbnail -->
                <div class="inline-flex w-full gap-2 justify-between" v-if="thumbnails.length">
                    <div class="w-20 h-20 sm:h-28 sm:w-28  md:h-32 md:w-32 bg-white rounded-md shadow-md relative"
                        v-for="(img, index) in thumbnails" :key="index">
                        <img :src="img" alt="image-product" class="w-full h-full object-cover rounded-md">
                        <button class="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error" type="button"
                            @click="removeImage(index + 1)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <form @submit.prevent="addBouquet" class="flex flex-col gap-y-3 md:px-20 lg:px-32">
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
                    <select class="select w-full" id="category" v-model="payload.category">
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
                    <textarea class="textarea w-full h-48" placeholder="Bio" id="description"
                        name="description"></textarea>
                </div>
                <button class="btn btn-success">Add</button>
            </form>
        </section>
    </div>
</template>

<script setup>
import { useBouquetStore } from '@/stores/bouquetStore';
import { ref, computed, reactive, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { required, integer } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useCategoryStore } from '@/stores/categoryStore';
import { useRouter } from 'vue-router';

const bouquetStore = useBouquetStore()
const categoryStore = useCategoryStore()

const router = useRouter()

const sources = ref([]);
const isLoading = ref(false)
const category = ref('')
const categories = ref([])

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
    console.log(payload.category);

    const payloads = new FormData()
    try {
        payloads.append('name', payload.name)
        payloads.append('price', payload.price)
        payloads.append('stock', payload.stock)
        payloads.append('description', payload.description)
        payloads.append('categoryId', payload.category)
        if (payload.images) {
            payloads.append('image', payload.images)
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
    }

}

const getCategory = async () => {
    try {
        const response = await categoryStore.getCategories()
        categories.value = response.data
        console.log(response);
    } catch (error) {
        console.log(error);

    }
}

onMounted(async () => {
    await getCategory()
})
</script>
