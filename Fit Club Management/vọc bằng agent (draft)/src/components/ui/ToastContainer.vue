<script setup lang="ts">
import { X, CheckCircle, XCircle, Info } from 'lucide-vue-next'
import { useToast, type Toast } from '@/composables/useToast'
import { computed } from 'vue'

const { toasts, removeToast } = useToast()

const getIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'info':
      return Info
    default:
      return Info
  }
}

const getColorClass = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-900'
    case 'error':
      return 'bg-red-50 border-red-200 text-red-900'
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-900'
    default:
      return 'bg-blue-50 border-blue-200 text-blue-900'
  }
}

const getIconColor = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-blue-600'
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-in',
          getColorClass(toast.type),
        ]"
      >
        <component
          :is="getIcon(toast.type)"
          :class="['w-5 h-5 mt-0.5', getIconColor(toast.type)]"
        />
        <div class="flex-1 min-w-0">
          <h3 v-if="toast.title" class="font-semibold text-sm">{{ toast.title }}</h3>
          <p class="text-sm" :class="{ 'mt-1': toast.title }">{{ toast.message }}</p>
        </div>
        <button
          @click="removeToast(toast.id)"
          class="text-current opacity-50 hover:opacity-100 transition-opacity shrink-0"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
