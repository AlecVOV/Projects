<script setup lang="ts">
import { Quote, Star } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const testimonials = [
  {
    name: 'Jessica Taylor',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    quote:
      "FitClub has completely transformed my life. The trainers are incredibly supportive, and the community atmosphere makes every workout enjoyable. I've lost 30 pounds and gained so much confidence!",
    rating: 5,
  },
  {
    name: 'Robert Anderson',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    quote:
      "As someone who works long hours, I needed a gym that fits my schedule. FitClub's flexible hours and personalized training programs have been perfect for me. Best investment I've made in myself.",
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Entrepreneur',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    quote:
      'The nutrition guidance combined with the workout plans helped me reach my goals faster than I ever imagined. The staff genuinely cares about your success. Highly recommend!',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Teacher',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    quote:
      "I've been a member for 2 years now, and the variety of classes keeps things interesting. Whether it's yoga, HIIT, or strength training, there's always something new to try.",
    rating: 5,
  },
  {
    name: 'Linda Brown',
    role: 'Retired Nurse',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    quote:
      'Even at my age, the trainers created a safe and effective program for me. I feel stronger and more energetic than I have in years. FitClub truly welcomes everyone.',
    rating: 5,
  },
  {
    name: 'Tom Mitchell',
    role: 'Sales Executive',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    quote:
      'The state-of-the-art equipment and clean facilities are impressive, but what really sets FitClub apart is the supportive community. It feels like a second home.',
    rating: 5,
  },
]
</script>

<template>
  <section id="testimonials" class="py-20 md:py-32 bg-muted scroll-mt-16">
    <div class="max-w-container mx-auto px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider"
          >Testimonials</span
        >
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">What Our Members Say</h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Don't just take our word for it. Here's what our members have to say about their
          experience at FitClub.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
          <!-- Quote Icon -->
          <div class="mb-4">
            <Quote class="w-10 h-10 text-primary/20" />
          </div>

          <!-- Rating -->
          <div class="flex space-x-1 mb-4">
            <Star
              v-for="i in testimonial.rating"
              :key="i"
              class="w-5 h-5 fill-yellow-400 text-yellow-400"
            />
          </div>

          <!-- Quote -->
          <p class="text-muted-foreground italic leading-relaxed mb-6 grow">
            "{{ testimonial.quote }}"
          </p>

          <!-- Author -->
          <div class="flex items-center space-x-4 pt-4 border-t border-border">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div class="font-semibold">{{ testimonial.name }}</div>
              <div class="text-sm text-muted-foreground">{{ testimonial.role }}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
