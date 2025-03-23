<template>
  <div class="flex bg-gray-100 font-archivo min-h-screen">
    <!-- Sidebar (Hidden on Mobile) -->
    <aside :class="{'-translate-x-full': !isSidebarOpen }"
      class="bg-white h-full shadow-lg w-64 duration-300 ease-in-out fixed lg:translate-x-0 transform transition-transform z-30">
      <Sidebar />
    </aside>

    <!-- Overlay for Mobile (Hidden on Desktop) -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="bg-black/50 fixed inset-0 lg:hidden z-20" />

    <!-- Main Content -->
    <div class="flex flex-1 flex-col lg:ml-64 overflow-hidden">
      <!-- Navbar -->
      <header class="bg-white shadow-lg">
        <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      </header>

      <!-- Dynamic Content -->
      <main class="flex-1 bg-gray-100 p-2 overflow-y-auto sm:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/admin/SidebarAdmin.vue'
import Navbar from '@/components/admin/NavBarAdmin.vue'
import { onMounted, ref } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
const isSidebarOpen = ref(false)
const categoryStore = useCategoryStore()
const getCategories = async ()=>{
  try {
    await categoryStore.getCategories()
  } catch (error) {
    console.log(error);
  }
}
onMounted(async()=>{
  await getCategories()
})
</script>