<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const footerLinks = {
  company: [
    { name: 'About Us', href: '/#about' },
    { name: 'Our Trainers', href: '/#trainers' },
    { name: 'Class Schedule', href: '/schedule' },
    { name: 'Contact Us', href: '/contact' },
  ],
  services: [
    { name: 'Personal Training', href: '/#packages' },
    { name: 'Group Classes', href: '/#packages' },
    { name: 'Nutrition Plans', href: '/#packages' },
    { name: 'Online Coaching', href: '/#packages' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Membership Terms', href: '#' },
    { name: 'Cancellation Policy', href: '#' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 border-t border-gray-800">
    <div class="max-w-container mx-auto px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">FC</span>
            </div>
            <span class="text-xl font-bold text-white">FitClub</span>
          </div>
          <p class="text-sm leading-relaxed">
            Transform your body and mind with our expert trainers and state-of-the-art facilities.
            Your fitness journey starts here.
          </p>
          <div class="flex space-x-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="w-9 h-9 rounded-md bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Company</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link.name">
              <a
                :href="link.href"
                class="text-sm hover:text-primary transition-colors inline-block"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Services</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.services" :key="link.name">
              <a
                :href="link.href"
                class="text-sm hover:text-primary transition-colors inline-block"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-semibold mb-4">Contact Info</h3>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3">
              <MapPin class="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span class="text-sm">123 Fitness Street, Gym City, ST 12345</span>
            </li>
            <li class="flex items-center space-x-3">
              <Phone class="w-5 h-5 text-primary shrink-0" />
              <span class="text-sm">(555) 123-4567</span>
            </li>
            <li class="flex items-center space-x-3">
              <Mail class="w-5 h-5 text-primary shrink-0" />
              <span class="text-sm">info@fitclub.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <p class="text-sm text-gray-400">&copy; {{ currentYear }} FitClub. All rights reserved.</p>
        <div class="flex space-x-6">
          <a
            v-for="link in footerLinks.legal"
            :key="link.name"
            :href="link.href"
            class="text-sm text-gray-400 hover:text-primary transition-colors"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
