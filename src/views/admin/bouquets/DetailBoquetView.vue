<template>
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Are you sure you want to delete it?</h3>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-warning" @click="isDelete.isDel = true">Delete</button>
                </form>
            </div>
        </div>
    </dialog>
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
                <label for="imageUpload"
                    class="flex flex-col bg-white/50 border-2 border-dashed h-48 justify-center rounded-md text-slate-700 cursor-pointer gap-y-4 hover:bg-black/5 items-center md:h-72 relative transition-colors">
                    <p class="text-3xl"><font-awesome-icon icon="fa-solid fa-upload" /></p>
                    <p class="text-sm font-semibold">Upload Images</p>
                    <small>PNG, JPG, JPEG are Allowed</small>
                    <input type="file" class="hidden" id="imageUpload" multiple accept="image/png, image/jpeg"
                        @change="uploadImage">
                    <div v-if="isUploading" class="flex bg-gray-100/50 justify-center absolute inset-0 items-center">
                        <span class="text-primary loading loading-spinner"></span>
                    </div>
                </label>
                <!-- Preview Gambar -->
                <div class="flex flex-wrap justify-evenly gap-2 max-sm:justify-normal mt-4">
                    <div v-for="img in sources" :key="img.id || img.file?.name" class="indicator relative">
                        <span class="badge badge-ghost indicator-center indicator-item indicator-middle" v-if="img.isNew">New</span>
                        <label :for="img.id"
                            class="bg-white h-20 rounded-md shadow-md w-20 block cursor-pointer overflow-hidden relative sm:h-28 sm:w-28">
                            <img :src="img.path" alt="image-product" class="h-full rounded-md w-full object-cover">
                            <input type="checkbox" :id="img.id" class="hidden peer"
                                @change="pushIdImage(img.id, $event)">
                            <div
                                class="bg-black/50 h-full justify-center text-3xl text-green-500 w-full absolute hidden inset-0 items-center peer-checked:flex">
                                <font-awesome-icon icon="fa-solid fa-check" />
                            </div>
                        </label>
                        <button class="btn btn-circle btn-error btn-xs -right-2 -top-2 absolute" type="button"
                            @click="removeImage(img)" >
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <!-- Form Update -->
        <section>
            <form @submit.prevent="updateBouquet" class="flex flex-col gap-y-3 lg:px-32 md:px-20">
                <div>
                    <label for="name">Bouquet name</label>
                    <input type="text" id="name" name="name" class="input w-full" v-model="payload.name" required>
                </div>
                <div class="flex flex-row gap-x-2">
                    <div class="w-full">
                        <label for="price">Bouquet price</label>
                        <input type="number" class="input w-full" id="price" name="price" v-model="payload.price"
                            min="0" required>
                    </div>
                    <div class="w-full">
                        <label for="stock">Bouquet stock</label>
                        <input type="number" class="input w-full" id="stock" name="stock" v-model="payload.stock"
                            min="0" required>
                    </div>
                </div>
                <div>
                    <label for="category">Category</label>
                    <select class="w-full select" id="category" v-model="payload.categoryId" required>
                        <option disabled value="">Select a category</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}</option>
                    </select>
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea class="h-48 w-full textarea" id="description" name="description"
                        v-model="payload.description"></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Update</button>
            </form>
        </section>
    </div>
</template>

<script setup>
import { useBouquetStore } from '@/stores/bouquetStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const bouquetStore = useBouquetStore();
const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();

const payload = reactive({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    categoryId: '',
    imageId: []
});
const {categories} = storeToRefs(categoryStore);
const sources = ref([]);
const isUploading = ref(false);
const isDelete = ref({
    isDel :false,
    id : null
})

const getDetailBouquet = async () => {
    try {
        const { id } = route.params;
        const response = await bouquetStore.getDetailBouquet(id);
        Object.assign(payload, response.data);
        sources.value = response.data.ImageBouquets.map(img => ({ id: img.id, path: img.path, isNew: false }));
    } catch (error) {
        console.error(error);
    }
};


const filesUpload = ref([])

const uploadImage = (event) => {
    let files = Array.from(event.target.files);
    filesUpload.value.push(...files)

    if (sources.value.length + files.length > 5) {
        filesUpload.value = []
        return toast.info("Max 5 images allowed.");
    }
    isUploading.value = true;

    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newImagePath = e.target.result;

            if (payload.imageId.length > 0) {
                // Loop untuk mengecek apakah imageId ada di sources
                sources.value.forEach(img => {
                    if (payload.imageId.includes(img.id)) {
                        img.path = newImagePath; // Update path jika ID cocok
                        img.file = file;
                        img.isNew = true;
                    }
                });
            } else {
                // Jika tidak ada imageId, tambahkan sebagai gambar baru
                sources.value.push({ path: newImagePath, file, isNew: true });
            }
            isUploading.value = false;
        };
        reader.readAsDataURL(file);
    });
};

const removeImage =  async (image) => {
    if (!image.isNew) {
        my_modal_5.showModal();
        isDelete.value.id = image.id
    } else {
        // Jika gambar baru, hapus dari filesUpload juga
        filesUpload.value = filesUpload.value.filter(file => file !== image.file);
        // Hapus gambar dari sources
        sources.value = sources.value.filter(img => img !== image);
    }
};


const pushIdImage = (id, event) => {
    if (event.target.checked) {
        if (id == event.target.id) {
            payload.imageId.push(id)
        }
    } else {
        let idx = payload.imageId.findIndex(val => val == id)
        payload.imageId.splice(idx, 1)
    }
}

const updateBouquet = async () => {

    try {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("price", payload.price);
        formData.append("stock", payload.stock);
        formData.append("description", payload.description);
        formData.append("categoryId", payload.categoryId);
        formData.append("imageId", payload.imageId);

        if (filesUpload.value.length > 0) {
            filesUpload.value.forEach(file => {
                formData.append("image", file)
            });

        }

        await bouquetStore.updateBouquet(payload.id,false,formData);
        toast.success("Bouquet updated successfully!");
    } catch (error) {
        console.error(error);
        toast.error("Failed to update bouquet.");
    } finally {
        filesUpload.value = []
        await getDetailBouquet()
    }
};

const deleteImageBouquet = async (id) => {
    try {
        const response = await bouquetStore.deleteImageBouquet(id)
        console.log(response);
        return toast.success('delete image success')
    } catch (error) {
        console.log(error);

    } finally {
        isDelete.value.isDel= false
        await getDetailBouquet()
    }
}

watch(()=>isDelete.value.isDel,async ()=>{
    if (isDelete.value.isDel) {
        await deleteImageBouquet(isDelete.value.id)
    }
})

onMounted(async () => {
    await Promise.all([getDetailBouquet()]);
});
</script>
