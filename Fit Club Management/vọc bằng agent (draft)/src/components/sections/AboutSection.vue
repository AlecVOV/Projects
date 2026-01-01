<script setup lang="ts">
import { Target, Users, Award, TrendingUp } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const features = [
  {
    icon: Target,
    title: 'Goal-Oriented Training',
    description:
      'Personalized workout plans tailored to your specific fitness goals and lifestyle.',
  },
  {
    icon: Users,
    title: 'Expert Trainers',
    description:
      'Certified professionals with years of experience to guide you every step of the way.',
  },
  {
    icon: Award,
    title: 'Premium Equipment',
    description: 'State-of-the-art facilities with the latest fitness equipment and technology.',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description:
      'Advanced tracking tools to monitor your fitness journey and celebrate achievements.',
  },
]
</script>

<template>
  <section id="about" class="py-20 md:py-32 bg-background scroll-mt-16">
    <div class="max-w-container mx-auto px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider"
          >About FitClub</span
        >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
          Why Choose Our Fitness Club?
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          We're more than just a gym. We're a community dedicated to helping you achieve your
          fitness goals through expert guidance, cutting-edge facilities, and unwavering support.
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
        <!-- Image -->
        <div class="relative">
          <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800"
              alt="Fitness training"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-xl">
            <div class="text-4xl font-bold">8+</div>
            <div class="text-sm">Years Experience</div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <h3 class="text-2xl md:text-3xl font-bold">Transform Your Body, Transform Your Life</h3>
          <p class="text-muted-foreground leading-relaxed">
            At FitClub, we believe that fitness is not just about physical transformation—it's about
            building confidence, discipline, and a healthy lifestyle that lasts a lifetime.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            Our experienced trainers work closely with each member to create customized workout
            plans that align with their individual goals, whether it's weight loss, muscle gain,
            athletic performance, or overall wellness.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3">
              <svg
                class="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-muted-foreground"
                >Personalized training programs for all fitness levels</span
              >
            </li>
            <li class="flex items-start space-x-3">
              <svg
                class="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-muted-foreground"
                >Nutritional guidance and meal planning support</span
              >
            </li>
            <li class="flex items-start space-x-3">
              <svg
                class="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-muted-foreground"
                >Flexible membership options to fit your schedule</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="feature in features"
          :key="feature.title"
          class="p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <component :is="feature.icon" class="w-12 h-12 text-primary mb-4" />
          <h4 class="text-lg font-semibold mb-2">{{ feature.title }}</h4>
          <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>
