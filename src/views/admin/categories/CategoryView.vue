<template>
    <ModalCategory modal-id="category_modal" :title-btn="optModal.btnTitle" :title="optModal.title"
        :action-type="optModal.selectAction" v-model:name="categoryName" @send-confirmation="getConfirmation" />
    <Loading :is-loading="loading" />
    <div class="flex flex-col gap-y-2">
        <section>
            <div class="inline-flex w-full justify-between">
                <div class="sm:w-full">
                    <label class="input sm:min-w-3/4">
                        <span><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
                        <input type="search" class="grow" placeholder="Search" v-model="search"/>
                    </label>
                </div>

                <button type="button" id="btnAdd" class="btn btn-primary w-24" @click="showModal(null, $event)">
                    Add
                </button>
            </div>
        </section>
        <section>
            <EasyDataTable :headers="headers" :items="categoryData" :rows-items="[8, 12]" :rows-per-page="8"
                table-class-name="customize-table" :loading="isLoading">
                <template #loading>
                    <span class="loading loading-bars loading-lg"></span>
                </template>
                <template #item-name="{ name }">
                    <span class="capitalize">{{ name }}</span>
                </template>
                <template #item-action="items">
                    <div class="gap-x-2 inline-flex">
                        <button type="button" id="btnUpdate" class="btn btn-circle btn-info btn-sm"
                            @click="showModal(items, $event)">
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </button>
                        <button type="button" id="btnDelete" class="btn btn-circle btn-error btn-sm"
                            @click="showModal(items, $event)">
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                </template>
            </EasyDataTable>
        </section>
    </div>
</template>

<script setup>
import Loading from '@/components/info/Loading.vue';
import ModalCategory from '@/components/modal/ModalConfirm.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { storeToRefs } from 'pinia';
import { computed, ref, shallowReactive } from 'vue';
import { toast } from 'vue3-toastify';

const categoryStore = useCategoryStore()

const headers = [
    {
        text: 'Name',
        value: 'name',
    },
    {
        text: 'ID',
        value: 'id'
    },
    {
        text: 'Action',
        value: 'action'
    }
];

const categoryName = ref('')

const { categories } = storeToRefs(categoryStore)
const search = ref('')
const categoryData = computed(()=>{
    return categories.value.filter(val => val.name.toLowerCase().includes(search.value.toLowerCase()))
})

const isLoading = ref(false)
const loading = ref(false)

const optModal = shallowReactive({
    selectAction: '',
    title: '',
    btnTitle: ''
})

const idCategory = ref(null)

const showModal = (items, event) => {
    const id = event.currentTarget.id;

    switch (id) {
        case 'btnAdd':
            categoryName.value = ''
            Object.assign(optModal, {
                selectAction: 'isAdd',
                title: 'Add Category',
                btnTitle: 'add'
            });
            break;
        case 'btnUpdate':
            idCategory.value = items.id
            categoryName.value = items.name
            Object.assign(optModal, {
                selectAction: 'isUpdate',
                title: 'Update Category',
                btnTitle: 'update'
            });
            break;
        case 'btnDelete':
            idCategory.value = items.id
            Object.assign(optModal, {
                selectAction: 'isDelete',
                title: 'Delete Category',
                btnTitle: 'delete'
            });
            break;
        default:
            break;
    }
    category_modal.showModal();
};

const addCategory = async () => {
    loading.value = !loading.value
    try {
        await categoryStore.addCategory({
            name: categoryName.value
        })
        toast.success('Category successfully added')
    } catch (error) {
        console.log(error);
        toast.error('Failed to add category')
    } finally {
        loading.value = !loading.value
    }
}

const updateCategory = async () => {
    loading.value = !loading.value
    try {
        await categoryStore.updateCategory(idCategory.value,{
            name : categoryName.value
        })
        toast.success('Category successfully updated')
    } catch (error) {
        toast.error('Failed to update category')
        console.log(error);
    } finally {
        loading.value = !loading.value

    }
}
const deleteCategory = async () => {
    loading.value = !loading.value
    try {
        await categoryStore.deleteCategory(idCategory.value)
        toast.success('Category successfully deleted')
    } catch (error) {
        toast.error('Failed to delete category')
        console.log(error);
    } finally {
        loading.value = !loading.value
    }
}

const getConfirmation = async (data) => {
    switch (true) {
        case data.isAdd:
            await addCategory();
            break;
        case data.isUpdate:
            await updateCategory()
            break;
        case data.isDelete:
            await deleteCategory()
            break;
        default:
            break
    }

    await categoryStore.getCategories()
};


</script>