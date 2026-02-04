<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const campaignId = route.params.id

// Mock data
const campaign = ref({
  id: campaignId,
  name: 'Annual Fund 2026',
  description: 'General fund for lab operations throughout the year',
  type: 'ANNUAL_FUND',
  target: 5000,
  raised: 1250,
  status: 'ACTIVE',
  start_date: '2026-01-01',
  end_date: '2026-12-31',
  transactions: [
    { id: 1, user: 'Nguyen Van A', amount: 500, type: 'INCOME', status: 'VERIFIED', date: '2026-01-15' },
    { id: 3, user: 'Le Van C', amount: 500, type: 'INCOME', status: 'VERIFIED', date: '2026-01-13' },
    { id: 9, user: 'Tran Van D', amount: 250, type: 'INCOME', status: 'PENDING', date: '2026-01-10' },
  ]
})

const progress = computed(() => {
  return (campaign.value.raised / campaign.value.target) * 100
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    VERIFIED: 'bg-blue-100 text-blue-700',
    REIMBURSED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div class="flex items-center gap-8">
        <span class="font-bold text-xl text-blue-600">ITea Lab Fund</span>
        <div class="space-x-6 text-sm font-medium text-gray-600">
          <NuxtLink to="/dashboard" class="hover:text-blue-600 transition">Dashboard</NuxtLink>
          <NuxtLink to="/campaigns" class="text-blue-600">Campaigns</NuxtLink>
          <NuxtLink to="/transactions" class="hover:text-blue-600 transition">Transactions</NuxtLink>
        </div>
      </div>
      <NuxtLink to="/campaigns" class="text-sm text-gray-600 hover:text-gray-800 font-medium">← Back to Campaigns</NuxtLink>
    </nav>

    <div class="p-8 max-w-6xl mx-auto">
      <!-- Campaign Header -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div class="flex justify-between items-start mb-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-3xl font-bold text-gray-800">{{ campaign.name }}</h1>
              <span :class="campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'" class="px-3 py-1 text-sm font-medium rounded-full">
                {{ campaign.status }}
              </span>
            </div>
            <p class="text-gray-600">{{ campaign.description }}</p>
          </div>
          <button v-if="campaign.status === 'ACTIVE'" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium">
            Close Campaign
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-600">Campaign Progress</span>
            <span class="text-sm font-semibold text-gray-800">{{ progress.toFixed(1) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div :style="{ width: progress + '%' }" class="bg-blue-600 h-3 rounded-full transition-all"></div>
          </div>
          <div class="flex justify-between mt-2">
            <span class="text-lg font-bold text-gray-800">${{ campaign.raised.toLocaleString() }}</span>
            <span class="text-lg text-gray-400">/ ${{ campaign.target.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Campaign Dates -->
        <div class="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p class="text-sm text-gray-500 mb-1">Start Date</p>
            <p class="font-medium text-gray-800">{{ campaign.start_date }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">End Date</p>
            <p class="font-medium text-gray-800">{{ campaign.end_date }}</p>
          </div>
        </div>
      </div>

      <!-- Transactions List -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Transactions ({{ campaign.transactions.length }})</h2>
          <NuxtLink to="/transactions/create" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            + Add Transaction
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="transaction in campaign.transactions" :key="transaction.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm mr-3">
                      {{ transaction.user.charAt(0) }}
                    </div>
                    <span class="text-sm font-medium text-gray-900">{{ transaction.user }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="transaction.type === 'INCOME' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="px-2 py-1 text-xs font-medium rounded">
                    {{ transaction.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-mono font-medium">${{ transaction.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusColor(transaction.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <NuxtLink :to="`/transactions/${transaction.id}`" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View →
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>