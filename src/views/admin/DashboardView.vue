<template>
    <div class="space-y-4">
        <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                class="bg-white p-6 rounded-lg overflow-hidden shadow relative after:content-[''] after:w-32 after:h-full after:bg-red-600 after:absolute after:top-0 after:right-0 after:glass">
                <h2 class="text-sm">Revenue</h2>
                <p class="text-gray-600 text-2xl lg:text-3xl font-bold">1,234</p>
            </div>
            <div
                class="bg-white p-6 rounded-lg overflow-hidden shadow relative after:content-[''] after:w-32 after:h-full after:bg-indigo-600 after:absolute after:top-0 after:right-0 after:glass">
                <h2 class="text-sm">Orders</h2>
                <p class="text-gray-600 text-2xl lg:text-3xl font-bold">100</p>
            </div>
            <div
                class="bg-white p-6 rounded-lg overflow-hidden shadow relative after:content-[''] after:w-32 after:h-full after:bg-neutral after:absolute after:top-0 after:right-0 after:glass">
                <h2 class="text-sm">Total sales</h2>
                <p class="text-gray-600 text-2xl lg:text-3xl font-bold">2,000</p>
            </div>
        </div>
        <div class="bg-white rounded-lg shadow p-10">
            <Line :data="chartData.chartData" :options="chartData.options" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Line } from 'vue-chartjs';

const chartData = reactive({
    chartData: {
        labels: ['January', 'February', 'March', 'April', 'Mai', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales Graph per Month',
                backgroundColor: '#F6F1DE',
                borderColor : '#3E3F5B',
                data: [40, 20, 12,17,91,100,150,49,7,10,28,72],
                borderWidth : 1,
            }
        ]
    },
    options: {
        responsive: true
    }
})
</script>