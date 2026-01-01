<script setup lang="ts">
import { ref, computed } from 'vue'
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Card from '@/components/ui/Card.vue'
import { MapPin, Phone, Mail, Clock } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

// Form state
const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const touched = ref({
  name: false,
  email: false,
  phone: false,
  subject: false,
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

  if (touched.value.subject && formData.value.subject.length < 3) {
    errs.subject = 'Subject must be at least 3 characters'
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
    formData.value.subject.length >= 3 &&
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

    success("Thank you for your message! We'll get back to you within 24 hours.")

    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    }
    touched.value = {
      name: false,
      email: false,
      phone: false,
      subject: false,
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
    title: 'Our Location',
    content: '123 Fitness Street, Gym City, ST 12345',
    subContent: 'Visit us for a free tour!',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    content: '(555) 123-4567',
    subContent: 'Mon-Fri: 6am - 10pm, Sat-Sun: 7am - 8pm',
  },
  {
    icon: Mail,
    title: 'Email Address',
    content: 'info@fitclub.com',
    subContent: 'We reply within 24 hours',
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    content: 'Monday - Friday: 6:00 AM - 10:00 PM',
    subContent: 'Saturday - Sunday: 7:00 AM - 8:00 PM',
  },
]
</script>

<template>
  <div>
    <Navigation />
    <main class="pt-16">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div class="max-w-container mx-auto px-8 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Get In Touch</h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about our membership, classes, or facilities? We're here to help!
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-20 bg-background">
        <div class="max-w-container mx-auto px-8">
          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div>
              <h2 class="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Card class="p-8">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium mb-2"
                      >Full Name <span class="text-destructive">*</span></label
                    >
                    <Input
                      id="name"
                      v-model="formData.name"
                      placeholder="John Doe"
                      :error="errors.name"
                      @blur="handleBlur('name')"
                      required
                    />
                    <p v-if="errors.name" class="text-sm text-destructive mt-1">
                      {{ errors.name }}
                    </p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium mb-2"
                      >Email Address <span class="text-destructive">*</span></label
                    >
                    <Input
                      id="email"
                      v-model="formData.email"
                      type="email"
                      placeholder="john.doe@example.com"
                      :error="errors.email"
                      @blur="handleBlur('email')"
                      required
                    />
                    <p v-if="errors.email" class="text-sm text-destructive mt-1">
                      {{ errors.email }}
                    </p>
                  </div>

                  <!-- Phone -->
                  <div>
                    <label for="phone" class="block text-sm font-medium mb-2"
                      >Phone Number (optional)</label
                    >
                    <Input
                      id="phone"
                      v-model="formData.phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      :error="errors.phone"
                      @blur="handleBlur('phone')"
                    />
                    <p v-if="errors.phone" class="text-sm text-destructive mt-1">
                      {{ errors.phone }}
                    </p>
                  </div>

                  <!-- Subject -->
                  <div>
                    <label for="subject" class="block text-sm font-medium mb-2"
                      >Subject <span class="text-destructive">*</span></label
                    >
                    <Input
                      id="subject"
                      v-model="formData.subject"
                      placeholder="Membership inquiry"
                      :error="errors.subject"
                      @blur="handleBlur('subject')"
                      required
                    />
                    <p v-if="errors.subject" class="text-sm text-destructive mt-1">
                      {{ errors.subject }}
                    </p>
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
                      :rows="6"
                      :maxlength="1000"
                      :error="errors.message"
                      @blur="handleBlur('message')"
                      required
                    />
                    <div class="flex justify-between mt-1">
                      <p v-if="errors.message" class="text-sm text-destructive">
                        {{ errors.message }}
                      </p>
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
            </div>

            <!-- Contact Information -->
            <div>
              <h2 class="text-3xl font-bold mb-6">Contact Information</h2>
              <div class="space-y-6">
                <Card
                  v-for="info in contactInfo"
                  :key="info.title"
                  class="p-6 hover:shadow-lg transition-shadow"
                >
                  <div class="flex items-start space-x-4">
                    <div
                      class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                    >
                      <component :is="info.icon" class="w-7 h-7 text-primary" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg mb-1">{{ info.title }}</h3>
                      <p class="text-muted-foreground mb-1">{{ info.content }}</p>
                      <p class="text-sm text-muted-foreground">{{ info.subContent }}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <!-- Map Placeholder -->
              <Card class="p-0 overflow-hidden mt-6">
                <div class="aspect-video bg-muted flex items-center justify-center">
                  <div class="text-center">
                    <MapPin class="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                    <p class="text-muted-foreground">Interactive Map</p>
                    <p class="text-sm text-muted-foreground mt-1">Visit us at 123 Fitness Street</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
