<template>
    <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box space-y-3">
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <div class="flex flex-col gap-y-2" v-if="actionType !== 'isDelete'">
                <label for="category" class="text-sm">{{ labelName ?? 'Category name' }}</label>
                <input type="text" class="input focus:outline-none" placeholder="beauty" v-model="model">
                <small v-if="v$.name.$error" v-for="error in v$.name.$errors" class="text-red-700 text-xs">
                    {{ error.$message }}
                </small>
            </div>
            <div class="modal-action">
                <form method="dialog" class=" space-x-4">
                    <button class="btn">Close</button>
                    <button class="btn" :class="classes" @click="sendEmit">{{ titleBtn }}</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed } from 'vue';

const props = defineProps({
    modalId: {
        type: String,
        default: ''
    },
    actionType: {
        type: String
    },
    title: {
        stype: String,
        default: ''
    },
    titleBtn: {
        stype: String,
        default: 'Ok'
    },
    method: {
        type: String
    },
    labelName :{
        type : String
    }
})

const model = defineModel('name')

const classes = computed(() => {
    switch (props.actionType) {
        case 'isDelete':
            return 'btn-error'
        case 'isAdd':
            return 'btn-success'
        case 'isUpdate':
            return 'btn-primary'
    }
})

const v$ = useVuelidate({
    name: {
        required
    }
}, {
    name: model
})

const emits = defineEmits(['sendConfirmation'])

const sendEmit = () => {
    const validate = props.actionType == 'isAdd' || props.actionType == 'isUpdate'
    if (validate) {
        v$.value.$touch()
        const validate = v$.value.$invalid
        if (validate) return
    }

    switch (props.actionType) {
        case 'isDelete':
            return emits('sendConfirmation', { isDelete: true })
        case 'isAdd':
            return emits('sendConfirmation', { isAdd: true })
        case 'isUpdate':
            return emits('sendConfirmation', { isUpdate: true })
    }
}

</script>