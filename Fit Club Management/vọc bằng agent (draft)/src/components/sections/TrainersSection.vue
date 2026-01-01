<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import { Instagram, Linkedin } from 'lucide-vue-next'

const trainers = [
  {
    name: 'Sarah Johnson',
    title: 'Head Strength Coach',
    specialization: 'Strength Training & Powerlifting',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
    description: 'Certified strength coach with 10+ years of experience in athletic performance.',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Mike Chen',
    title: 'HIIT Specialist',
    specialization: 'HIIT & Cardio Training',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400',
    description: 'Former professional athlete specializing in high-intensity interval training.',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Emma Williams',
    title: 'Yoga & Wellness Coach',
    specialization: 'Yoga & Mindfulness',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    description: '500-hour certified yoga instructor focused on holistic wellness.',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'David Martinez',
    title: 'Nutrition Expert',
    specialization: 'Sports Nutrition & Diet',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    description: 'Licensed nutritionist helping athletes optimize their performance through diet.',
    social: { instagram: '#', linkedin: '#' },
  },
]
</script>

<template>
  <section id="trainers" class="py-20 md:py-32 bg-muted scroll-mt-16">
    <div class="max-w-container mx-auto px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider">Our Team</span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
          Meet Your Expert Trainers
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Our certified trainers are passionate about helping you reach your fitness goals with
          personalized attention and expertise.
        </p>
      </div>

      <!-- Trainers Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          v-for="trainer in trainers"
          :key="trainer.name"
          class="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <!-- Image -->
          <div class="relative aspect-[3/4] overflow-hidden bg-gray-200">
            <img
              :src="trainer.image"
              :alt="trainer.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <!-- Social Links -->
            <div
              class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <a
                :href="trainer.social.instagram"
                class="w-9 h-9 rounded-full bg-white/90 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram class="w-4 h-4 text-gray-900" />
              </a>
              <a
                :href="trainer.social.linkedin"
                class="w-9 h-9 rounded-full bg-white/90 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Linkedin class="w-4 h-4 text-gray-900" />
              </a>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-2">
            <h3 class="text-xl font-bold">{{ trainer.name }}</h3>
            <p class="text-primary text-sm font-semibold">{{ trainer.title }}</p>
            <p class="text-xs text-muted-foreground">{{ trainer.specialization }}</p>
            <p class="text-sm text-muted-foreground leading-relaxed pt-2">
              {{ trainer.description }}
            </p>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
