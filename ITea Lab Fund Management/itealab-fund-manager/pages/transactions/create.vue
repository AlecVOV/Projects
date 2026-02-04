<script setup lang="ts">
const router = useRouter()

// Form data
const formData = ref({
  campaign_id: '',
  amount: '',
  type: 'EXPENSE',
  description: '',
  proof_image_url: ''
})

// Mock campaigns list - will be replaced with API call
const campaigns = ref([
  { id: 1, name: 'Annual Fund 2026' },
  { id: 2, name: 'Q1 Team Building' },
  { id: 3, name: 'Year End Party' }
])

const selectedFile = ref<File | null>(null)
const imagePreview = ref('')
const isUploading = ref(false)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    selectedFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  // Validation
  if (!formData.value.campaign_id || !formData.value.amount || !formData.value.description) {
    alert('Please fill in all required fields')
    return
  }

  if (!selectedFile.value) {
    alert('Please upload a proof image')
    return
  }

  isUploading.value = true

  try {
    // TODO: Upload image to Cloudinary/Storage
    // const imageUrl = await uploadImage(selectedFile.value)
    // formData.value.proof_image_url = imageUrl

    // TODO: Submit transaction to API
    // await $fetch('/api/transactions', {
    //   method: 'POST',
    //   body: formData.value
    // })

    // For now, just simulate success
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Transaction created successfully! Waiting for admin approval.')
    router.push('/transactions')
  } catch (error) {
    alert('Failed to create transaction. Please try again.')
    console.error(error)
  } finally {
    isUploading.value = false
  }
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

    <div class="p-8 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Create New Transaction</h1>
        <p class="text-gray-500">Upload a bill or record income</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        
        <!-- Transaction Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Transaction Type *</label>
          <div class="grid grid-cols-2 gap-4">
            <button 
              type="button"
              @click="formData.type = 'INCOME'"
              :class="formData.type === 'INCOME' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-300 text-gray-700'"
              class="border-2 rounded-lg p-4 flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Income
            </button>
            <button 
              type="button"
              @click="formData.type = 'EXPENSE'"
              :class="formData.type === 'EXPENSE' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-300 text-gray-700'"
              class="border-2 rounded-lg p-4 flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              Expense
            </button>
          </div>
        </div>

        <!-- Campaign Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Campaign *</label>
          <select 
            v-model="formData.campaign_id" 
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="" disabled>Select a campaign</option>
            <option v-for="campaign in campaigns" :key="campaign.id" :value="campaign.id">
              {{ campaign.name }}
            </option>
          </select>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Amount (USD) *</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
            <input 
              v-model="formData.amount" 
              type="number" 
              step="0.01"
              min="0"
              class="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea 
            v-model="formData.description" 
            rows="4"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="What is this transaction for?"
            required
          ></textarea>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Proof Image *</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
            <input 
              type="file" 
              accept="image/*"
              @change="handleFileSelect"
              class="hidden"
              id="file-upload"
              required
            />
            <label for="file-upload" class="cursor-pointer">
              <div v-if="!imagePreview" class="space-y-2">
                <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-sm font-medium text-gray-700">Click to upload receipt/proof</p>
                <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
              <div v-else class="space-y-3">
                <img :src="imagePreview" alt="Preview" class="max-h-64 mx-auto rounded-lg border border-gray-200" />
                <p class="text-sm text-blue-600 font-medium">Click to change image</p>
              </div>
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-2">{{ formData.type === 'INCOME' ? 'Upload bank transfer screenshot or payment confirmation' : 'Upload the receipt or invoice' }}</p>
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4 pt-4">
          <button 
            type="submit"
            :disabled="isUploading"
            class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="isUploading" class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ isUploading ? 'Creating...' : 'Create Transaction' }}
          </button>
          <NuxtLink 
            to="/transactions"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </NuxtLink>
        </div>

        <!-- Info Note -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-medium mb-1">What happens next?</p>
            <p class="text-blue-700">Your transaction will be marked as <strong>PENDING</strong> and sent to admin for approval. You'll be notified once it's reviewed.</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>