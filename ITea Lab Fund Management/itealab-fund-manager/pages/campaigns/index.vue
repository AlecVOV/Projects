<script setup lang="ts">


// Mock Data for UI visualization (will be replaced by DB data later)
const campaigns = ref([
  { id: 1, name: 'Annual Fund 2026', description: 'General fund for lab operations', target: 5000, raised: 1250, status: 'ACTIVE' },
  { id: 2, name: 'Q1 Team Building', description: 'Bowling and Pizza', target: 500, raised: 500, status: 'CLOSED' },
])
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple Navbar -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <span class="font-bold text-xl text-blue-600">ITea Lab</span>
      <div class="space-x-4 text-sm font-medium text-gray-600">
        <NuxtLink to="/dashboard" class="hover:text-blue-600">Dashboard</NuxtLink>
        <NuxtLink to="/campaigns" class="text-blue-600">Campaigns</NuxtLink>
        <NuxtLink to="/" class="hover:text-red-600">Logout</NuxtLink>
      </div>
    </nav>

    <div class="p-8 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Campaigns</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
          + New Campaign
        </button>
      </div>

      <!-- Campaign List -->
      <div class="grid gap-4">
        <div v-for="campaign in campaigns" :key="campaign.id" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h3 class="text-xl font-semibold text-gray-800">{{ campaign.name }}</h3>
              <span 
                :class="campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                class="text-xs px-2 py-1 rounded-full font-medium"
              >
                {{ campaign.status }}
              </span>
            </div>
            <p class="text-gray-500 text-sm">{{ campaign.description }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Raised / Target</p>
            <p class="font-mono font-medium text-lg">
              ${{ campaign.raised }} / <span class="text-gray-400">${{ campaign.target }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>