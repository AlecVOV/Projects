<script setup lang="ts">


// Mock data for visualization
const stats = ref({
  totalFund: 12500,
  totalExpenses: 8300,
  pendingApprovals: 3,
  activeMembers: 12
})

const recentTransactions = ref([
  { id: 1, user: 'Nguyen Van A', campaign: 'Annual Fund 2026', amount: 500, type: 'INCOME', status: 'VERIFIED', date: '2026-01-15' },
  { id: 2, user: 'Tran Thi B', campaign: 'Q1 Team Building', amount: 350, type: 'EXPENSE', status: 'PENDING', date: '2026-01-14' },
  { id: 3, user: 'Le Van C', campaign: 'Annual Fund 2026', amount: 500, type: 'INCOME', status: 'VERIFIED', date: '2026-01-13' },
  { id: 4, user: 'Pham Thi D', campaign: 'Year End Party', amount: 800, type: 'EXPENSE', status: 'REIMBURSED', date: '2026-01-12' },
])

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    VERIFIED: 'bg-blue-100 text-blue-700',
    REIMBURSED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const getTypeColor = (type: string) => {
  return type === 'INCOME' ? 'text-green-600' : 'text-red-600'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div class="flex items-center gap-8">
        <span class="font-bold text-xl text-blue-600">ITea Lab Fund</span>
        <div class="space-x-6 text-sm font-medium text-gray-600">
          <NuxtLink to="/dashboard" class="text-blue-600 border-b-2 border-blue-600 pb-1">Dashboard</NuxtLink>
          <NuxtLink to="/campaigns" class="hover:text-blue-600 transition">Campaigns</NuxtLink>
          <NuxtLink to="/transactions" class="hover:text-blue-600 transition">Transactions</NuxtLink>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="relative">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </button>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
          <span class="text-sm font-medium text-gray-700">Admin</span>
        </div>
        <NuxtLink to="/" class="text-sm text-red-600 hover:text-red-700 font-medium">Logout</NuxtLink>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="p-8 max-w-7xl mx-auto">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Admin!</h1>
        <p class="text-gray-500">Here's what's happening with ITea Lab Fund today.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p class="text-gray-500 text-sm mb-1">Total Fund Balance</p>
          <p class="text-2xl font-bold text-gray-800">${{ stats.totalFund.toLocaleString() }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">-8.3%</span>
          </div>
          <p class="text-gray-500 text-sm mb-1">Total Expenses</p>
          <p class="text-2xl font-bold text-gray-800">${{ stats.totalExpenses.toLocaleString() }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Action Required</span>
          </div>
          <p class="text-gray-500 text-sm mb-1">Pending Approvals</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.pendingApprovals }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p class="text-gray-500 text-sm mb-1">Active Members</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.activeMembers }}</p>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <NuxtLink to="/transactions" class="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="transaction in recentTransactions" :key="transaction.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm mr-3">
                      {{ transaction.user.charAt(0) }}
                    </div>
                    <span class="text-sm font-medium text-gray-900">{{ transaction.user }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ transaction.campaign }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getTypeColor(transaction.type)" class="text-sm font-medium">
                    {{ transaction.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">
                  ${{ transaction.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusColor(transaction.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink to="/transactions/create" class="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl shadow-sm transition flex items-center justify-between group">
          <div>
            <h3 class="font-semibold text-lg mb-1">Create Transaction</h3>
            <p class="text-blue-100 text-sm">Upload a new bill or income</p>
          </div>
          <svg class="w-8 h-8 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </NuxtLink>

        <NuxtLink to="/admin/approvals" class="bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-xl shadow-sm transition flex items-center justify-between group">
          <div>
            <h3 class="font-semibold text-lg mb-1">Pending Approvals</h3>
            <p class="text-yellow-100 text-sm">Review {{ stats.pendingApprovals }} transactions</p>
          </div>
          <svg class="w-8 h-8 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </NuxtLink>

        <NuxtLink to="/campaigns" class="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow-sm transition flex items-center justify-between group">
          <div>
            <h3 class="font-semibold text-lg mb-1">Manage Campaigns</h3>
            <p class="text-green-100 text-sm">View all funds & events</p>
          </div>
          <svg class="w-8 h-8 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>