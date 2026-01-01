<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const packages = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Access to gym facilities',
      'Basic equipment usage',
      '2 group classes per week',
      'Locker room access',
      'Mobile app access',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    price: 59,
    period: 'month',
    description: 'Most popular choice for dedicated fitness enthusiasts',
    features: [
      'All Starter features',
      'Unlimited group classes',
      '2 personal training sessions/month',
      'Nutrition consultation',
      'Free guest passes (2/month)',
      'Access to premium equipment',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 99,
    period: 'month',
    description: 'Complete package for serious athletes and professionals',
    features: [
      'All Standard features',
      '8 personal training sessions/month',
      'Customized meal plans',
      'Priority class booking',
      'Free supplements',
      'Massage therapy (2 sessions/month)',
      'Unlimited guest passes',
    ],
    highlighted: false,
  },
]

const handleGetStarted = (packageName: string) => {
  router.push('/contact')
}
</script>

<template>
  <section id="packages" class="py-20 md:py-32 bg-background scroll-mt-16">
    <div class="max-w-container mx-auto px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider"
          >Pricing Plans</span
        >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
          Choose Your Perfect Package
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Flexible membership options designed to fit your goals and budget. All plans include
          access to our world-class facilities.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card
          v-for="pkg in packages"
          :key="pkg.name"
          :class="
            pkg.highlighted
              ? 'relative p-8 flex flex-col border-primary border-2 shadow-2xl scale-105'
              : 'relative p-8 flex flex-col hover:shadow-lg transition-shadow'
          "
        >
          <!-- Popular Badge -->
          <div
            v-if="pkg.highlighted"
            class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold"
          >
            Most Popular
          </div>

          <!-- Package Header -->
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold mb-2">{{ pkg.name }}</h3>
            <p class="text-sm text-muted-foreground mb-4">{{ pkg.description }}</p>
            <div class="flex items-baseline justify-center">
              <span class="text-5xl font-bold">${{ pkg.price }}</span>
              <span class="text-muted-foreground ml-2">/ {{ pkg.period }}</span>
            </div>
          </div>

          <!-- Features List -->
          <ul class="space-y-4 mb-8 grow">
            <li v-for="feature in pkg.features" :key="feature" class="flex items-start space-x-3">
              <div
                class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"
              >
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <Button
            :variant="pkg.highlighted ? 'default' : 'outline'"
            size="lg"
            class="w-full"
            @click="handleGetStarted(pkg.name)"
          >
            Get Started
          </Button>
        </Card>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 text-center">
        <p class="text-sm text-muted-foreground">
          All memberships include a 7-day money-back guarantee. No long-term contracts required.
        </p>
      </div>
    </div>
  </section>
</template>
