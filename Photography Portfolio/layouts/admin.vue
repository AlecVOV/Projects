<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-serif font-bold text-gray-900 dark:text-white">
                LensCraft Admin
              </h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                to="/admin"
                class="border-transparent hover:border-accent-500 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClass="!border-accent-500 !text-gray-900 dark:!text-white"
              >
                Dashboard
              </NuxtLink>
              <NuxtLink
                to="/admin/blog"
                class="border-transparent hover:border-accent-500 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClass="!border-accent-500 !text-gray-900 dark:!text-white"
              >
                Blog Posts
              </NuxtLink>
              <NuxtLink
                to="/admin/portfolio"
                class="border-transparent hover:border-accent-500 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClass="!border-accent-500 !text-gray-900 dark:!text-white"
              >
                Portfolio
              </NuxtLink>
              <NuxtLink
                to="/admin/testimonials"
                class="border-transparent hover:border-accent-500 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClass="!border-accent-500 !text-gray-900 dark:!text-white"
              >
                Testimonials
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center">
            <NuxtLink
              to="/"
              target="_blank"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white mr-4"
            >
              View Site
            </NuxtLink>
            <button
              @click="handleSignOut"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { signOut } = useAuth()

const handleSignOut = async () => {
  await signOut()
}
</script>