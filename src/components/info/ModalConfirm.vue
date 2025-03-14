<template>
    <dialog :id="modalId" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Are you sure?</h3>
            <p>Add {{ bouquet.name }} to chart?</p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
                <form method="dialog" @click="addToCart">
                    <button class="btn btn-success">Add</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
const props = defineProps({
    modalId : {
        type : String
    },
    bouquet : {
        type : Object
    }
})

const emits = defineEmits(['addToCart'])

const addToCart = ()=>{
    emits('addToCart',true)
}
</script>