<script setup lang="ts">


const route = useRoute()
const transactionId = route.params.id

// Mock data - will be replaced with API call
const transaction = ref({
  id: transactionId,
  user: 'Nguyen Van A',
  campaign: 'Annual Fund 2026',
  amount: 500,
  type: 'INCOME',
  status: 'VERIFIED',
  date: '2026-01-15',
  description: 'Annual membership fee payment',
  proof_image_url: 'https://via.placeholder.com/800x600?text=Receipt',
  created_at: '2026-01-15 09:30 AM',
  verified_by: 'Admin Huy',
  verified_at: '2026-01-15 10:45 AM'
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    VERIFIED: 'bg-blue-100 text-blue-700 border-blue-200',
    REIMBURSED: 'bg-green-100 text-green-700 border-green-200',
    REJECTED: 'bg-red-100 text-red-700 border-red-200'
  }
  return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
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
          <NuxtLink to="/transactions" class="text-blue-600">Transactions</NuxtLink>
        </div>
      </div>
      <NuxtLink to="/transactions" class="text-sm text-gray-600 hover:text-gray-800 font-medium">← Back to Transactions</NuxtLink>
    </nav>

    <div class="p-8 max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Transaction #{{ transactionId }}</h1>
            <p class="text-gray-500">Detailed information</p>
          </div>
          <span :class="getStatusColor(transaction.status)" class="px-4 py-2 text-sm font-semibold rounded-full border">
            {{ transaction.status }}
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Image -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 class="font-semibold text-gray-800 mb-4">Proof Image</h3>
            <img :src="transaction.proof_image_url" alt="Receipt" class="w-full rounded-lg border border-gray-200 mb-4" />
            <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm">
              Download Image
            </button>
          </div>
        </div>

        <!-- Right Column - Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Transaction Info -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-800 mb-4 text-lg">Transaction Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 mb-1">User</p>
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                    {{ transaction.user.charAt(0) }}
                  </div>
                  <p class="font-medium text-gray-800">{{ transaction.user }}</p>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Campaign</p>
                <p class="font-medium text-gray-800">{{ transaction.campaign }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Type</p>
                <span :class="transaction.type === 'INCOME' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="inline-block px-3 py-1 rounded font-semibold text-sm">
                  {{ transaction.type }}
                </span>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Amount</p>
                <p class="font-mono font-bold text-gray-800 text-xl">${{ transaction.amount }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Created At</p>
                <p class="font-medium text-gray-800">{{ transaction.created_at }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Transaction Date</p>
                <p class="font-medium text-gray-800">{{ transaction.date }}</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-800 mb-3">Description</h3>
            <p class="text-gray-600">{{ transaction.description }}</p>
          </div>

          <!-- Verification Info (if verified) -->
          <div v-if="transaction.status !== 'PENDING'" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-800 mb-4">Verification Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Verified By:</span>
                <span class="font-medium text-gray-800">{{ transaction.verified_by }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">Verified At:</span>
                <span class="font-medium text-gray-800">{{ transaction.verified_at }}</span>
              </div>
            </div>
          </div>

          <!-- Actions (Admin only) -->
          <div v-if="transaction.status === 'PENDING'" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-800 mb-4">Admin Actions</h3>
            <div class="flex gap-3">
              <button class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                ✓ Approve
              </button>
              <button class="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                ✕ Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>