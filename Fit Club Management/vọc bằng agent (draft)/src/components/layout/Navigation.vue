<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { name: 'Home', href: '/', hash: '' },
  { name: 'Class Schedule', href: '/schedule', hash: '' },
  { name: 'Get In Touch', href: '/contact', hash: '' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const scrollToSection = (hash: string) => {
  isMenuOpen.value = false
  if (hash && route.path === '/') {
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const isActive = (item: (typeof navItems)[0]) => {
  if (item.href !== '/') {
    return route.path === item.href
  }
  if (item.hash) {
    return route.path === '/' && route.hash === item.hash
  }
  return route.path === '/' && !route.hash
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-background/95 backdrop-blur-md shadow-sm',
      isScrolled ? 'border-border' : 'border-white/10',
    ]"
  >
    <div class="max-w-container mx-auto px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">FC</span>
          </div>
          <span class="text-xl font-bold text-foreground">FitClub</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <template v-for="item in navItems" :key="item.name">
            <RouterLink
              v-if="!item.hash"
              :to="item.href"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              :class="
                isActive(item)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              "
            >
              {{ item.name }}
            </RouterLink>
            <a
              v-else
              :href="item.hash"
              @click.prevent="scrollToSection(item.hash)"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              :class="
                isActive(item)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              "
            >
              {{ item.name }}
            </a>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-background border-b border-border shadow-lg">
        <div class="px-4 py-4 space-y-2">
          <template v-for="item in navItems" :key="item.name">
            <RouterLink
              v-if="!item.hash"
              :to="item.href"
              @click="isMenuOpen = false"
              class="block px-4 py-3 rounded-md text-base font-medium transition-colors"
              :class="
                isActive(item)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              "
            >
              {{ item.name }}
            </RouterLink>
            <a
              v-else
              :href="item.hash"
              @click.prevent="scrollToSection(item.hash)"
              class="block px-4 py-3 rounded-md text-base font-medium transition-colors cursor-pointer"
              :class="
                isActive(item)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              "
            >
              {{ item.name }}
            </a>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>
