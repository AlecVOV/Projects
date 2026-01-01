import { ref } from 'vue'

export interface Toast {
  id: string
  title?: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

const toasts = ref<Toast[]>([])

let idCounter = 0

export function useToast() {
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++idCounter}`
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast
    }
    toasts.value.push(newToast)

    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, title?: string) => {
    return addToast({ message, title, type: 'success' })
  }

  const error = (message: string, title?: string) => {
    return addToast({ message, title, type: 'error' })
  }

  const info = (message: string, title?: string) => {
    return addToast({ message, title, type: 'info' })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info
  }
}
