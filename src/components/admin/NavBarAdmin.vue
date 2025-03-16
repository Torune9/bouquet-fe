<template>
   <div class="flex items-center justify-between p-4">
    <!-- Toggle Button for Mobile -->
    <button 
      @click="toggleSidebar"
      class="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

    <!-- Title -->
    <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>

    <!-- Menu Items -->
    <div class="flex items-center space-x-4">
      <button class="text-gray-600 hover:text-gray-800">
        Notifications
      </button>
      <button class="text-gray-600 hover:text-gray-800">
        Profile
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['toggleSidebar'])
const toggleSidebar = ()=>{
    return emits('toggleSidebar')
}

</script>