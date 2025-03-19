<template>
  <div class="flex items-center justify-between p-4">
    <!-- Toggle Button for Mobile -->
    <button @click="toggleSidebar" class="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

    <!-- Title -->
    <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>

    <!-- Menu Items -->
    <div class="flex items-center space-x-8">
        <button class="text-gray-600 hover:text-gray-800 indicator">
          <font-awesome-icon icon="fa-solid fa-store" size="lg"/>
          <span class="badge badge-sm indicator-item">8</span>
      </button>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-lg btn-circle avatar">
          <div class="w-20 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <RouterLink :to="{name : 'profile-admin'}" class="justify-between">
              Profile
            </RouterLink>
          </li>
          <li @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const emits = defineEmits(['toggleSidebar'])
const toggleSidebar = () => {
  return emits('toggleSidebar')
}

const authStore = useAuthStore()
const logout = ()=>{
  authStore.logout()
}
</script>