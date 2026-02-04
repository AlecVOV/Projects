<script setup lang="ts">


const verifiedTransactions = ref([
  { id: 4, user: 'Pham Thi D', campaign: 'Year End Party', amount: 800, date: '2026-01-12', description: 'Party decorations and food', bankInfo: 'TPBank - 0123456789', verified_at: '2026-01-13 10:30 AM' },
  { id: 8, user: 'Hoang Van H', campaign: 'Q1 Team Building', amount: 450, date: '2026-01-10', description: 'Transportation costs', bankInfo: 'Vietcombank - 9876543210', verified_at: '2026-01-11 02:15 PM' },
])

const handleReimburse = (id: number) => {
  const confirmed = confirm('Have you transferred the money? This action will mark the transaction as REIMBURSED.')
  if (confirmed) {
    // TODO: Connect to API
    alert(`Transaction #${id} marked as reimbursed!`)
    verifiedTransactions.value = verifiedTransactions.value.filter(t => t.id !== id)
  }
}

const copyBankInfo = (bankInfo: string) => {
  navigator.clipboard.writeText(bankInfo)
  alert('Bank info copied to clipboard!')
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
          <NuxtLink to="/transactions" class="hover:text-blue-600 transition">Transactions</NuxtLink>
        </div>
      </div>
      <NuxtLink to="/dashboard" class="text-sm text-gray-600 hover:text-gray-800 font-medium">← Back</NuxtLink>
    </nav>

    <div class="p-8 max-w-5xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <h1 class="text-3xl font-bold text-gray-800">Reimbursement Queue</h1>
          <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            {{ verifiedTransactions.length }} to reimburse
          </span>
        </div>
        <p class="text-gray-500">Transfer money back to members and mark as settled</p>
      </div>

      <!-- Empty State -->
      <div v-if="verifiedTransactions.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">All settled!</h3>
        <p class="text-gray-500">No reimbursements pending</p>
      </div>

      <!-- Reimbursement Cards -->
      <div v-else class="grid gap-6">
        <div v-for="transaction in verifiedTransactions" :key="transaction.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                {{ transaction.user.charAt(0) }}
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 text-lg">{{ transaction.user }}</h3>
                <p class="text-sm text-gray-500">{{ transaction.campaign }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-red-600">${{ transaction.amount }}</p>
              <p class="text-xs text-gray-500">Verified: {{ transaction.verified_at }}</p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500 mb-1">Description:</p>
                <p class="font-medium text-gray-800">{{ transaction.description }}</p>
              </div>
              <div>
                <p class="text-gray-500 mb-1">Transaction Date:</p>
                <p class="font-medium text-gray-800">{{ transaction.date }}</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-blue-600 font-medium mb-1">💳 Bank Account</p>
                <p class="font-mono font-semibold text-gray-800">{{ transaction.bankInfo }}</p>
              </div>
              <button @click="copyBankInfo(transaction.bankInfo)" class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
          </div>

          <button @click="handleReimburse(transaction.id)" class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Mark as Reimbursed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>