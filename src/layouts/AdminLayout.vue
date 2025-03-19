<template>
  <div class="min-h-screen bg-gray-100 flex font-archivo">
    <!-- Sidebar (Hidden on Mobile) -->
    <aside :class="{ '-translate-x-full': !isSidebarOpen }"
      class="w-64 bg-white shadow-lg fixed h-full transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-30">
      <Sidebar />
    </aside>

    <!-- Overlay for Mobile (Hidden on Desktop) -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/50 z-20 lg:hidden" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden lg:ml-64">
      <!-- Navbar -->
      <header class="bg-white shadow-lg">
        <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      </header>

      <!-- Dynamic Content -->
      <main class="flex-1 overflow-y-auto p-2 md:p-6 bg-gray-100">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/admin/SidebarAdmin.vue'
import Navbar from '@/components/admin/NavBarAdmin.vue'
import { ref } from 'vue';
const isSidebarOpen = ref(false)
</script>