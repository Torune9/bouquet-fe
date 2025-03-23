<template>
    <Transition name="fade">
        <div class="bg-white/50 backdrop-blur-md h-dvh w-dvw fixed inset-0 flex justify-center items-center z-50" v-if="isLoading">
            <span class="loading loading-spinner loading-xl text-primary"></span>
        </div>
    </Transition>
</template>

<script setup>
defineProps({
    isLoading : {
        type : Boolean,
        default : false
    }
})
</script>

<style setup>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>