<script setup lang="ts">
import { ref } from 'vue'
import { MessageCircle, X } from 'lucide-vue-next'

const isOpen = ref(false)

const toggleChat = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-40">
    <!-- Chat Button -->
    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Open chat"
    >
      <MessageCircle class="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>

    <!-- Chat Widget -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="bg-background rounded-lg shadow-2xl border border-border w-80 md:w-96 overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-primary text-white p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-semibold">Chat with Us</h3>
              <p class="text-xs text-primary-100">We're online now</p>
            </div>
          </div>
          <button
            @click="toggleChat"
            class="hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Chat Content -->
        <div class="p-6 space-y-4 max-h-96 overflow-y-auto bg-muted/30">
          <!-- Bot Message -->
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span class="text-white text-xs font-bold">FC</span>
            </div>
            <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
              <p class="text-sm">Hi there! 👋 Welcome to FitClub. How can we help you today?</p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-2 pt-2">
            <p class="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Quick Actions
            </p>
            <button
              class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-primary/5 border border-border transition-colors text-sm"
            >
              💪 View Membership Plans
            </button>
            <button
              class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-primary/5 border border-border transition-colors text-sm"
            >
              📅 Book a Class
            </button>
            <button
              class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-primary/5 border border-border transition-colors text-sm"
            >
              🏋️ Meet Our Trainers
            </button>
            <button
              class="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-primary/5 border border-border transition-colors text-sm"
            >
              📞 Contact Support
            </button>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 border-t border-border bg-background">
          <div class="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
