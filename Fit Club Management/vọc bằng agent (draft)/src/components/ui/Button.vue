<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  loading?: boolean
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  as: 'button',
})

const buttonClass = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:bg-primary-600 active:bg-primary-700':
        props.variant === 'default',
      'border border-border bg-background hover:bg-muted hover:text-foreground':
        props.variant === 'outline',
      'hover:bg-muted hover:text-foreground': props.variant === 'ghost',
      'h-10 px-4 py-2': props.size === 'default',
      'h-9 px-3 text-sm': props.size === 'sm',
      'h-11 px-8 text-lg': props.size === 'lg',
    },
  ),
)
</script>

<template>
  <component :is="as" :class="buttonClass" :disabled="disabled || loading">
    <svg
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </component>
</template>
