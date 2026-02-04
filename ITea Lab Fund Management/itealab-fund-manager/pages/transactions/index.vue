<script setup lang="ts">


const filterStatus = ref('ALL')
const filterType = ref('ALL')

const transactions = ref([
  { id: 1, user: 'Nguyen Van A', campaign: 'Annual Fund 2026', amount: 500, type: 'INCOME', status: 'VERIFIED', date: '2026-01-15', description: 'Annual membership fee', image: 'https://via.placeholder.com/400' },
  { id: 2, user: 'Tran Thi B', campaign: 'Q1 Team Building', amount: 350, type: 'EXPENSE', status: 'PENDING', date: '2026-01-14', description: 'Bowling night expenses', image: 'https://via.placeholder.com/400' },
  { id: 3, user: 'Le Van C', campaign: 'Annual Fund 2026', amount: 500, type: 'INCOME', status: 'VERIFIED', date: '2026-01-13', description: 'Annual membership fee', image: 'https://via.placeholder.com/400' },
  { id: 4, user: 'Pham Thi D', campaign: 'Year End Party', amount: 800, type: 'EXPENSE', status: 'REIMBURSED', date: '2026-01-12', description: 'Party decorations and food', image: 'https://via.placeholder.com/400' },
  { id: 5, user: 'Hoang Van E', campaign: 'Q1 Team Building', amount: 200, type: 'EXPENSE', status: 'REJECTED', date: '2026-01-11', description: 'Invalid receipt', image: 'https://via.placeholder.com/400' },
])

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    VERIFIED: 'bg-blue-100 text-blue-700 border-blue-200',
    REIMBURSED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-700 border-red-200'
  }
  return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
}

const getTypeIcon = (type: string) => {
  return type === 'INCOME' ? '↑' : '↓'
}

const getTypeColor = (type: string) => {
  return type === 'INCOME' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
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
          <NuxtLink to="/campaigns" class="hover:text-blue-600 transition">Campaigns</NuxtLink>
          <NuxtLink to="/transactions" class="text-blue-600 border-b-2 border-blue-600 pb-1">Transactions</NuxtLink>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
          <span class="text-sm font-medium text-gray-700">Admin</span>
        </div>
        <NuxtLink to="/" class="text-sm text-red-600 hover:text-red-700 font-medium">Logout</NuxtLink>
      </div>
    </nav>

    <div class="p-8 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">All Transactions</h1>
          <p class="text-gray-500">Track all income and expenses</p>
        </div>
        <NuxtLink to="/transactions/create" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm font-medium flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Transaction
        </NuxtLink>
      </div>

      <!-- Filters -->
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-600 mb-2">Filter by Status</label>
          <select v-model="filterStatus" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="REIMBURSED">Reimbursed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-600 mb-2">Filter by Type</label>
          <select v-model="filterType" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="ALL">All Types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-600 mb-2">Search</label>
          <input type="text" placeholder="Search by user or campaign..." class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>

      <!-- Transaction Cards -->
      <div class="grid gap-4">
        <div v-for="transaction in transactions" :key="transaction.id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                    {{ transaction.user.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ transaction.user }}</h3>
                    <p class="text-sm text-gray-500">{{ transaction.campaign }}</p>
                  </div>
                </div>
                <p class="text-sm text-gray-600 ml-13">{{ transaction.description }}</p>
              </div>
              <div class="text-right">
                <div class="flex items-center gap-2 justify-end mb-2">
                  <span :class="getTypeColor(transaction.type)" class="px-2 py-1 rounded text-sm font-bold">
                    {{ getTypeIcon(transaction.type) }} ${{ transaction.amount }}
                  </span>
                </div>
                <span :class="getStatusColor(transaction.status)" class="inline-block px-3 py-1 text-xs font-medium rounded-full border">
                  {{ transaction.status }}
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-500">{{ transaction.date }}</span>
              <div class="flex gap-2">
                <NuxtLink :to="`/transactions/${transaction.id}`" class="text-sm text-blue-600 hover:text-blue-700 font-medium">View Details</NuxtLink>
                <button v-if="transaction.status === 'PENDING'" class="text-sm text-green-600 hover:text-green-700 font-medium">Approve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>