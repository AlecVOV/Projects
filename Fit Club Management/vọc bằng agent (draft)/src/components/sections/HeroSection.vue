<script setup lang="ts">
import { ArrowRight, Play } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const scrollToSection = (id: string) => {
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
  >
    <!-- Background Image Overlay -->
    <div
      class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920')] bg-cover bg-center opacity-20"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-container mx-auto px-8 py-32 text-center">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Badge -->
        <div
          class="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm"
        >
          <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span class="text-primary-100">Transform Your Life Today</span>
        </div>

        <!-- Headline -->
        <h1
          class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
        >
          Build Your Dream
          <span class="text-primary block mt-2">Body & Mind</span>
        </h1>

        <!-- Subheading -->
        <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Join our community of fitness enthusiasts and achieve your goals with expert guidance,
          state-of-the-art equipment, and personalized training programs.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" @click="scrollToSection('#packages')" class="group">
            Get Started
            <ArrowRight class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            @click="scrollToSection('#about')"
            class="border-white text-white hover:bg-white/10"
          >
            <Play class="mr-2 w-5 h-5" />
            Learn More
          </Button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div class="text-sm text-gray-400">Active Members</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-primary">25+</div>
            <div class="text-sm text-gray-400">Expert Trainers</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-primary">50+</div>
            <div class="text-sm text-gray-400">Classes Weekly</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl md:text-4xl font-bold text-primary">10k+</div>
            <div class="text-sm text-gray-400">Success Stories</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div
        class="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
      >
        <div class="w-1 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  </section>
</template>
