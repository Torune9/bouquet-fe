<template>
    <ModalCategory modal-id="category_modal" @send-confirmation="getConfirmation" :title-btn="optModal.btnTitle"
        :title="optModal.title" :action-type="optModal.selectAction" v-model:name="payload.name"
        label-name="Role name" />
    <Loading :is-loading="isLoading" />
    <div class="flex flex-col gap-y-2">
        <section>
            <div class="inline-flex w-full justify-between">
                <div class="sm:w-full">
                    <label class="input sm:min-w-3/4">
                        <span><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
                        <input type="search" class="grow" placeholder="Search" v-model="search"/>
                    </label>
                </div>

                <button class="btn btn-primary w-24" id="btnAdd" @click="showModal(null, $event)">
                    Add
                </button>
            </div>
        </section>

        <section>
            <EasyDataTable :headers="headers" :items="roleFilter" :rows-items="[8, 12]" :rows-per-page="8"
                table-class-name="customize-table" :loading="loading">
                <template #loading>
                    <span class="loading loading-bars loading-lg"></span>
                </template>
                <template #item-name="{ name }">
                    <span class="capitalize">{{ name }}</span>
                </template>
                <template #item-action="items">
                    <div class="gap-x-2 inline-flex">
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
import { api } from '@/services/api';
import { computed, onMounted, ref, shallowReactive } from 'vue';
import { toast } from 'vue3-toastify';

const loading = ref(false)
const isLoading = ref(false)

const headers = [
    {
        text: 'Name',
        value: 'name'
    },
    {
        text: 'ID',
        value: 'id'
    },
    {
        text: 'Action',
        value: 'action'
    },
];

const search = ref('')

const items = ref([])
const roleFilter = computed(()=>{
    return items.value.filter(val => val.name.toLowerCase().includes(search.value.toLowerCase()))
})

const optModal = shallowReactive({
    selectAction: '',
    title: '',
    btnTitle: ''
})

const payload = shallowReactive({
    name: '',
    id: ''
})

const showModal = (items, event) => {
    const id = event.currentTarget.id;
    switch (id) {
        case 'btnAdd':
            payload.name = ''
            Object.assign(optModal, {
                selectAction: 'isAdd',
                title: 'Add role',
                btnTitle: 'add'
            });
            break;
        case 'btnUpdate':
            payload.id = items.id
            payload.name = items.name
            Object.assign(optModal, {
                selectAction: 'isUpdate',
                title: 'Update role',
                btnTitle: 'update'
            });
            break;
        case 'btnDelete':
            payload.id = items.id
            Object.assign(optModal, {
                selectAction: 'isDelete',
                title: 'Delete role',
                btnTitle: 'delete'
            });
            break;
        default:
            break;
    }

    category_modal.showModal();
}

const getRole = async () => {
    loading.value = !loading.value
    try {
        const response = await api.get('/role')
        const { data } = response.data
        items.value = data
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = !loading.value

    }
}

const addRole = async () => {
    isLoading.value = !isLoading.value
    try {
        await api.post('/role', {
            name: payload.name
        })
        toast.success('Role has been added')
    } catch (error) {
        toast.error(error)
        console.log(error);
    } finally {
        isLoading.value = !isLoading.value

    }
}

const deleteRole = async () => {
    isLoading.value = !isLoading.value
    try {
        await api.delete(`/role/${payload.id}`)
        toast.success('Successfully delete role')
    } catch (error) {
        toast.error(error)
        console.log(error);
    } finally {
        isLoading.value = !isLoading.value
    }
}

const getConfirmation = async (data) => {
    switch (true) {
        case data.isAdd:
            await addRole();
            break;
        case data.isDelete:
            await deleteRole()
            break;
        default:
            break
    }

    await getRole()
};

onMounted(() => { getRole() })

</script>