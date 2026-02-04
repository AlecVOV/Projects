<script setup lang="ts">


const user = ref({
  full_name: 'Admin User',
  email: 'admin@itealab.com',
  role: 'ADMIN',
  bank_info: 'TPBank - 0123456789',
  avatar_url: '',
  created_at: '2025-01-01'
})

const handleUpdateProfile = () => {
  // TODO: Connect to API
  alert('Profile updated successfully!')
}

const handleChangePassword = () => {
  // TODO: Connect to Supabase Auth
  alert('Password change email sent!')
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

    <div class="p-8 max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
        <p class="text-gray-500">Manage your account information</p>
      </div>

      <div class="grid gap-6">
        <!-- Profile Information -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
          
          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
            <!-- Avatar -->
            <div class="flex items-center gap-6">
              <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {{ user.full_name.charAt(0) }}
              </div>
              <div>
                <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  Change Avatar
                </button>
                <p class="text-xs text-gray-500 mt-2">JPG, PNG or GIF (Max. 2MB)</p>
              </div>
            </div>

            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input v-model="user.full_name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <!-- Email (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="user.email" type="email" disabled class="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed" />
              <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <!-- Bank Info -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bank Information (For Reimbursement)</label>
              <input v-model="user.bank_info" type="text" placeholder="Bank Name - Account Number - Account Name" class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              <p class="text-xs text-gray-500 mt-1">This info will be used when admin reimburses you</p>
            </div>

            <!-- Role Badge -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <span :class="user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'" class="inline-block px-3 py-1 rounded-full text-sm font-medium">
                {{ user.role }}
              </span>
            </div>

            <!-- Submit -->
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Security -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Security</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center py-4 border-b border-gray-200">
              <div>
                <p class="font-medium text-gray-800">Password</p>
                <p class="text-sm text-gray-500">Last changed 30 days ago</p>
              </div>
              <button @click="handleChangePassword" class="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Change Password
              </button>
            </div>

            <div class="flex justify-between items-center py-4">
              <div>
                <p class="font-medium text-gray-800">Member Since</p>
                <p class="text-sm text-gray-500">{{ user.created_at }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>