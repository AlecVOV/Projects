<script setup lang="ts">
import { ref, computed } from 'vue'
import { MapPin, Phone, Mail } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Card from '@/components/ui/Card.vue'
import { useToast } from '@/composables/useToast'

// Form state
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const touched = ref({
  name: false,
  email: false,
  phone: false,
  message: false,
})

const isSubmitting = ref(false)

const { success, error: showError } = useToast()

// Validation
const errors = computed(() => {
  const errs: Record<string, string> = {}

  if (touched.value.name && formData.value.name.length < 2) {
    errs.name = 'Name must be at least 2 characters'
  }

  if (touched.value.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      errs.email = 'Please enter a valid email address'
    }
  }

  if (touched.value.phone && formData.value.phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(formData.value.phone)) {
      errs.phone = 'Please enter a valid phone number'
    }
  }

  if (touched.value.message) {
    if (formData.value.message.length < 10) {
      errs.message = 'Message must be at least 10 characters'
    } else if (formData.value.message.length > 1000) {
      errs.message = 'Message must not exceed 1000 characters'
    }
  }

  return errs
})

const isFormValid = computed(() => {
  return (
    formData.value.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email) &&
    formData.value.message.length >= 10 &&
    formData.value.message.length <= 1000 &&
    (!formData.value.phone || /^[\d\s\-\+\(\)]+$/.test(formData.value.phone))
  )
})

const handleBlur = (field: keyof typeof touched.value) => {
  touched.value[field] = true
}

const handleSubmit = async () => {
  // Mark all fields as touched
  Object.keys(touched.value).forEach((key) => {
    touched.value[key as keyof typeof touched.value] = true
  })

  if (!isFormValid.value) {
    showError('Please fix all errors before submitting')
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    success("Thank you for your message! We'll get back to you soon.")

    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      message: '',
    }
    touched.value = {
      name: false,
      email: false,
      phone: false,
      message: false,
    }
  } catch (err) {
    showError('Something went wrong. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Fitness Street, Gym City, ST 12345',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '(555) 123-4567',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@fitclub.com',
  },
]
</script>

<template>
  <section id="contact" class="py-20 md:py-32 bg-background scroll-mt-16">
    <div class="max-w-container mx-auto px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider"
          >Get In Touch</span
        >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">Contact Us</h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as
          possible.
        </p>
      </div>

      <!-- Content -->
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <Card class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium mb-2"
                >Name <span class="text-destructive">*</span></label
              >
              <Input
                id="name"
                v-model="formData.name"
                placeholder="Your full name"
                :error="errors.name"
                @blur="handleBlur('name')"
                required
              />
              <p v-if="errors.name" class="text-sm text-destructive mt-1">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium mb-2"
                >Email <span class="text-destructive">*</span></label
              >
              <Input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="your.email@example.com"
                :error="errors.email"
                @blur="handleBlur('email')"
                required
              />
              <p v-if="errors.email" class="text-sm text-destructive mt-1">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium mb-2">Phone (optional)</label>
              <Input
                id="phone"
                v-model="formData.phone"
                type="tel"
                placeholder="(555) 123-4567"
                :error="errors.phone"
                @blur="handleBlur('phone')"
              />
              <p v-if="errors.phone" class="text-sm text-destructive mt-1">{{ errors.phone }}</p>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium mb-2"
                >Message <span class="text-destructive">*</span></label
              >
              <Textarea
                id="message"
                v-model="formData.message"
                placeholder="Tell us how we can help you..."
                :rows="5"
                :maxlength="1000"
                :error="errors.message"
                @blur="handleBlur('message')"
                required
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.message" class="text-sm text-destructive">{{ errors.message }}</p>
                <p class="text-sm text-muted-foreground ml-auto">
                  {{ formData.message.length }}/1000
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <Button
              type="submit"
              size="lg"
              class="w-full"
              :disabled="!isFormValid || isSubmitting"
              :loading="isSubmitting"
            >
              Send Message
            </Button>
          </form>
        </Card>

        <!-- Contact Info -->
        <div class="space-y-6">
          <Card
            v-for="info in contactInfo"
            :key="info.title"
            class="p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start space-x-4">
              <div
                class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
              >
                <component :is="info.icon" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ info.title }}</h3>
                <p class="text-muted-foreground">{{ info.content }}</p>
              </div>
            </div>
          </Card>

          <!-- Map Placeholder -->
          <Card class="p-0 overflow-hidden">
            <div class="aspect-video bg-muted flex items-center justify-center">
              <div class="text-center">
                <MapPin class="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p class="text-sm text-muted-foreground">Map Location</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
