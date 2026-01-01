<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import Button from '@/components/ui/Button.vue'
import { Home, Search } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1 flex items-center justify-center pt-16 bg-muted">
      <div class="max-w-2xl mx-auto px-8 py-20 text-center">
        <!-- 404 Number -->
        <div class="mb-8">
          <h1 class="text-[150px] md:text-[200px] font-bold text-primary leading-none opacity-20">
            404
          </h1>
        </div>

        <!-- Error Message -->
        <div class="mb-12 space-y-4">
          <div class="flex items-center justify-center mb-4">
            <Search class="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Oops! Page Not Found</h2>
          <p class="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on
            track!
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink to="/">
            <Button size="lg" class="w-full sm:w-auto">
              <Home class="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </RouterLink>
          <RouterLink to="/contact">
            <Button size="lg" variant="outline" class="w-full sm:w-auto"> Contact Support </Button>
          </RouterLink>
        </div>

        <!-- Popular Pages -->
        <div class="mt-16 pt-8 border-t border-border">
          <h3 class="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Popular Pages
          </h3>
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink to="/#about" class="text-primary hover:underline text-sm">
              About Us
            </RouterLink>
            <RouterLink to="/#trainers" class="text-primary hover:underline text-sm">
              Our Trainers
            </RouterLink>
            <RouterLink to="/schedule" class="text-primary hover:underline text-sm">
              Class Schedule
            </RouterLink>
            <RouterLink to="/#packages" class="text-primary hover:underline text-sm">
              Membership Packages
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
