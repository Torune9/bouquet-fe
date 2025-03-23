<template>
    <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <div class="modal-action">
                <form method="dialog" class=" space-x-4">
                    <button class="btn">Close</button>
                    <button class="btn" :class="classes" @click="sendConfirm">{{ titleBtn }}</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    modalId : {
        type : String,
        default : ''
    },
    title : {
        stype : String,
        default : ''
    },
    titleBtn : {
        stype : String,
        default : 'Ok'
    },
    className : {
        type : String,
        default : ''
    }
})
const classes = computed(()=>{
    switch(props.modalId){
        case 'modal_delete':
        return 'btn-error'
        case 'modal_confirm':
        return 'btn-primary'
    }
})

const emits = defineEmits(['sendConfirmation'])

const sendConfirm = ()=>{
    emits('sendConfirmation',true)
}

</script>