<script setup lang="ts">


const pendingTransactions = ref([
  { id: 2, user: 'Tran Thi B', campaign: 'Q1 Team Building', amount: 350, type: 'EXPENSE', date: '2026-01-14', description: 'Bowling night expenses', image: 'https://via.placeholder.com/800x600?text=Bowling+Receipt' },
  { id: 6, user: 'Nguyen Van F', campaign: 'Annual Fund 2026', amount: 500, type: 'INCOME', date: '2026-01-13', description: 'Annual membership payment', image: 'https://via.placeholder.com/800x600?text=Bank+Transfer' },
  { id: 7, user: 'Le Thi G', campaign: 'Year End Party', amount: 1200, type: 'EXPENSE', date: '2026-01-12', description: 'Venue rental and catering', image: 'https://via.placeholder.com/800x600?text=Invoice' },
])

const selectedTransaction = ref<any>(null)
const rejectionReason = ref('')

const openModal = (transaction: any) => {
  selectedTransaction.value = transaction
}

const closeModal = () => {
  selectedTransaction.value = null
  rejectionReason.value = ''
}

const handleApprove = (id: number) => {
  // TODO: Connect to API
  alert(`Transaction #${id} approved!`)
  pendingTransactions.value = pendingTransactions.value.filter(t => t.id !== id)
  closeModal()
}

const handleReject = (id: number) => {
  if (!rejectionReason.value.trim()) {
    alert('Please provide a rejection reason')
    return
  }
  // TODO: Connect to API
  alert(`Transaction #${id} rejected: ${rejectionReason.value}`)
  pendingTransactions.value = pendingTransactions.value.filter(t => t.id !== id)
  closeModal()
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

    <div class="p-8 max-w-6xl mx-auto">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <h1 class="text-3xl font-bold text-gray-800">Pending Approvals</h1>
          <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
            {{ pendingTransactions.length }} waiting
          </span>
        </div>
        <p class="text-gray-500">Review and approve transactions</p>
      </div>

      <!-- Empty State -->
      <div v-if="pendingTransactions.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">All caught up!</h3>
        <p class="text-gray-500">No pending transactions to review</p>
      </div>

      <!-- Transaction Cards -->
      <div v-else class="grid gap-6">
        <div v-for="transaction in pendingTransactions" :key="transaction.id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start gap-6">
              <!-- Image Preview -->
              <div class="flex-shrink-0">
                <img :src="transaction.image" alt="Receipt" class="w-48 h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition" @click="openModal(transaction)" />
                <button @click="openModal(transaction)" class="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2">
                  View Full Image →
                </button>
              </div>

              <!-- Transaction Details -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                        {{ transaction.user.charAt(0) }}
                      </div>
                      <div>
                        <h3 class="font-semibold text-gray-800">{{ transaction.user }}</h3>
                        <p class="text-sm text-gray-500">{{ transaction.date }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <span :class="transaction.type === 'INCOME' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="inline-block px-3 py-1 rounded font-bold text-lg">
                      {{ transaction.type === 'INCOME' ? '↑' : '↓' }} ${{ transaction.amount }}
                    </span>
                  </div>
                </div>

                <div class="mb-4">
                  <p class="text-sm font-medium text-gray-700 mb-1">Campaign:</p>
                  <p class="text-gray-600">{{ transaction.campaign }}</p>
                </div>

                <div class="mb-4">
                  <p class="text-sm font-medium text-gray-700 mb-1">Description:</p>
                  <p class="text-gray-600">{{ transaction.description }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 pt-4 border-t border-gray-100">
                  <button @click="handleApprove(transaction.id)" class="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button @click="openModal(transaction)" class="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Full Image & Rejection -->
    <div v-if="selectedTransaction" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 class="text-xl font-semibold text-gray-800">Transaction #{{ selectedTransaction.id }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <img :src="selectedTransaction.image" alt="Full Receipt" class="w-full rounded-lg mb-6" />
          
          <!-- Rejection Form -->
          <div class="border-t border-gray-200 pt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Rejection Reason (if rejecting)</label>
            <textarea v-model="rejectionReason" rows="3" placeholder="Explain why this transaction is being rejected..." class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4"></textarea>
            
            <div class="flex gap-3">
              <button @click="handleApprove(selectedTransaction.id)" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                ✓ Approve
              </button>
              <button @click="handleReject(selectedTransaction.id)" class="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                ✕ Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>