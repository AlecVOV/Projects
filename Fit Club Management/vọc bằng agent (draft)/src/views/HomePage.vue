<script setup lang="ts">
import Navigation from '@/components/layout/Navigation.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import TrainersSection from '@/components/sections/TrainersSection.vue'
import PricingSection from '@/components/sections/PricingSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div>
    <Navigation />
    <main>
      <HeroSection />
      <AboutSection />
      <TrainersSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>
