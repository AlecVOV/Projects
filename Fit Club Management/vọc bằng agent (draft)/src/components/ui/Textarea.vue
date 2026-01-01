<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  id?: string
  required?: boolean
  rows?: number
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  rows: 4,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const textareaClass = computed(() =>
  cn(
    'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
      'border-destructive focus-visible:ring-destructive': props.error,
    },
  ),
)
</script>

<template>
  <textarea
    :id="id"
    :class="textareaClass"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rows="rows"
    :maxlength="maxlength"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    @blur="emit('blur')"
  />
</template>
