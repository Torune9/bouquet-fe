<template>
    <Transition name="fade-top">
        <div v-if="isOpen"
            class="w-full h-screen overflow-hidden bg-black/50 fixed inset-0 z-50 flex justify-center items-center"
            @click="closeModal">
            <figure class="w-52 sm:w-64 md:w-72">
                <img :src="src" alt="image-bouquet">
            </figure>
        </div>
    </Transition>
</template>

<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    src: {
        type: String
    }
})

const emits = defineEmits(['close'])

const closeModal = () => {
    return emits('close', false)
}
</script>