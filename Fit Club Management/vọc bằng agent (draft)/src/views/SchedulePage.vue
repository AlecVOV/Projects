<script setup lang="ts">
import { ref } from 'vue'
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import Card from '@/components/ui/Card.vue'
import { Clock, Users, Dumbbell } from 'lucide-vue-next'

interface ClassSchedule {
  time: string
  class: string
  trainer: string
  duration: string
  intensity: 'Beginner' | 'Intermediate' | 'Advanced'
  spots: number
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const selectedDay = ref('Monday')

const schedule: Record<string, ClassSchedule[]> = {
  Monday: [
    {
      time: '6:00 AM',
      class: 'Morning Yoga',
      trainer: 'Emma Williams',
      duration: '60 min',
      intensity: 'Beginner',
      spots: 8,
    },
    {
      time: '8:00 AM',
      class: 'HIIT Training',
      trainer: 'Mike Chen',
      duration: '45 min',
      intensity: 'Advanced',
      spots: 3,
    },
    {
      time: '10:00 AM',
      class: 'Strength & Conditioning',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Intermediate',
      spots: 5,
    },
    {
      time: '5:00 PM',
      class: 'Spin Class',
      trainer: 'David Martinez',
      duration: '45 min',
      intensity: 'Intermediate',
      spots: 12,
    },
    {
      time: '6:30 PM',
      class: 'CrossFit',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Advanced',
      spots: 4,
    },
    {
      time: '7:30 PM',
      class: 'Evening Yoga',
      trainer: 'Emma Williams',
      duration: '60 min',
      intensity: 'Beginner',
      spots: 10,
    },
  ],
  Tuesday: [
    {
      time: '6:00 AM',
      class: 'Bootcamp',
      trainer: 'Mike Chen',
      duration: '60 min',
      intensity: 'Advanced',
      spots: 6,
    },
    {
      time: '9:00 AM',
      class: 'Pilates',
      trainer: 'Emma Williams',
      duration: '50 min',
      intensity: 'Beginner',
      spots: 15,
    },
    {
      time: '12:00 PM',
      class: 'Boxing',
      trainer: 'David Martinez',
      duration: '45 min',
      intensity: 'Intermediate',
      spots: 7,
    },
    {
      time: '5:00 PM',
      class: 'HIIT Training',
      trainer: 'Mike Chen',
      duration: '45 min',
      intensity: 'Advanced',
      spots: 2,
    },
    {
      time: '6:00 PM',
      class: 'Strength Training',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Intermediate',
      spots: 8,
    },
  ],
  Wednesday: [
    {
      time: '6:00 AM',
      class: 'Morning Yoga',
      trainer: 'Emma Williams',
      duration: '60 min',
      intensity: 'Beginner',
      spots: 9,
    },
    {
      time: '8:00 AM',
      class: 'Cardio Blast',
      trainer: 'Mike Chen',
      duration: '45 min',
      intensity: 'Intermediate',
      spots: 11,
    },
    {
      time: '10:00 AM',
      class: 'Functional Training',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Intermediate',
      spots: 6,
    },
    {
      time: '5:00 PM',
      class: 'Spin Class',
      trainer: 'David Martinez',
      duration: '45 min',
      intensity: 'Intermediate',
      spots: 14,
    },
    {
      time: '6:30 PM',
      class: 'CrossFit',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Advanced',
      spots: 5,
    },
  ],
  Thursday: [
    {
      time: '6:00 AM',
      class: 'Bootcamp',
      trainer: 'Mike Chen',
      duration: '60 min',
      intensity: 'Advanced',
      spots: 4,
    },
    {
      time: '9:00 AM',
      class: 'Pilates',
      trainer: 'Emma Williams',
      duration: '50 min',
      intensity: 'Beginner',
      spots: 13,
    },
    {
      time: '12:00 PM',
      class: 'Boxing',
      trainer: 'David Martinez',
      duration: '45 min',
      intensity: 'Intermediate',
      spots: 9,
    },
    {
      time: '5:00 PM',
      class: 'HIIT Training',
      trainer: 'Mike Chen',
      duration: '45 min',
      intensity: 'Advanced',
      spots: 1,
    },
    {
      time: '6:00 PM',
      class: 'Strength Training',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Intermediate',
      spots: 7,
    },
    {
      time: '7:30 PM',
      class: 'Restorative Yoga',
      trainer: 'Emma Williams',
      duration: '60 min',
      intensity: 'Beginner',
      spots: 12,
    },
  ],
  Friday: [
    {
      time: '6:00 AM',
      class: 'Morning Yoga',
      trainer: 'Emma Williams',
      duration: '60 min',
      intensity: 'Beginner',
      spots: 10,
    },
    {
      time: '8:00 AM',
      class: 'HIIT Training',
      trainer: 'Mike Chen',
      duration: '45 min',
      intensity: 'Advanced',
      spots: 6,
    },
    {
      time: '10:00 AM',
      class: 'Zumba',
      trainer: 'David Martinez',
      duration: '50 min',
      intensity: 'Beginner',
      spots: 18,
    },
    {
      time: '5:00 PM',
      class: 'Spin Class',
      trainer: 'David Martinez',
      duration: '45 min',
      intensity: 'Intermediate',
      spots: 15,
    },
    {
      time: '6:30 PM',
      class: 'CrossFit',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Advanced',
      spots: 3,
    },
  ],
  Saturday: [
    {
      time: '8:00 AM',
      class: 'Power Yoga',
      trainer: 'Emma Williams',
      duration: '75 min',
      intensity: 'Intermediate',
      spots: 12,
    },
    {
      time: '9:30 AM',
      class: 'Bootcamp',
      trainer: 'Mike Chen',
      duration: '60 min',
      intensity: 'Advanced',
      spots: 8,
    },
    {
      time: '11:00 AM',
      class: 'Family Fitness',
      trainer: 'David Martinez',
      duration: '45 min',
      intensity: 'Beginner',
      spots: 20,
    },
    {
      time: '2:00 PM',
      class: 'Olympic Lifting',
      trainer: 'Sarah Johnson',
      duration: '90 min',
      intensity: 'Advanced',
      spots: 5,
    },
  ],
  Sunday: [
    {
      time: '8:00 AM',
      class: 'Sunrise Yoga',
      trainer: 'Emma Williams',
      duration: '60 min',
      intensity: 'Beginner',
      spots: 16,
    },
    {
      time: '10:00 AM',
      class: 'Strength & Mobility',
      trainer: 'Sarah Johnson',
      duration: '60 min',
      intensity: 'Intermediate',
      spots: 10,
    },
    {
      time: '11:30 AM',
      class: 'Dance Fitness',
      trainer: 'David Martinez',
      duration: '50 min',
      intensity: 'Beginner',
      spots: 22,
    },
    {
      time: '4:00 PM',
      class: 'Recovery Stretch',
      trainer: 'Emma Williams',
      duration: '45 min',
      intensity: 'Beginner',
      spots: 14,
    },
  ],
}

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case 'Beginner':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Advanced':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getSpotsColor = (spots: number) => {
  if (spots <= 3) return 'text-red-600'
  if (spots <= 8) return 'text-yellow-600'
  return 'text-green-600'
}
</script>

<template>
  <div>
    <Navigation />
    <main class="pt-16">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div class="max-w-container mx-auto px-8 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Class Schedule</h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Browse our weekly class schedule and find the perfect workout for your fitness goals.
          </p>
        </div>
      </section>

      <!-- Schedule Section -->
      <section class="py-20 bg-background">
        <div class="max-w-container mx-auto px-8">
          <!-- Day Selector -->
          <div class="mb-12">
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="day in days"
                :key="day"
                @click="selectedDay = day"
                :class="[
                  'px-6 py-3 rounded-lg font-medium transition-all',
                  selectedDay === day
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10',
                ]"
              >
                {{ day }}
              </button>
            </div>
          </div>

          <!-- Classes List -->
          <div class="space-y-4">
            <Card
              v-for="(classItem, index) in schedule[selectedDay]"
              :key="index"
              class="p-6 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex flex-col md:flex-row md:items-center gap-6">
                <!-- Time -->
                <div class="flex items-center space-x-3 md:w-32 flex-shrink-0">
                  <Clock class="w-5 h-5 text-primary" />
                  <span class="font-semibold text-lg">{{ classItem.time }}</span>
                </div>

                <!-- Class Info -->
                <div class="flex-1 space-y-2">
                  <div class="flex flex-wrap items-center gap-3">
                    <h3 class="text-xl font-bold">{{ classItem.class }}</h3>
                    <span
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-semibold border',
                        getIntensityColor(classItem.intensity),
                      ]"
                    >
                      {{ classItem.intensity }}
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div class="flex items-center space-x-2">
                      <Users class="w-4 h-4" />
                      <span>{{ classItem.trainer }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <Dumbbell class="w-4 h-4" />
                      <span>{{ classItem.duration }}</span>
                    </div>
                  </div>
                </div>

                <!-- Spots Available -->
                <div class="flex items-center space-x-2 md:w-40 flex-shrink-0">
                  <div :class="['text-right flex-1', getSpotsColor(classItem.spots)]">
                    <div class="font-bold text-2xl">{{ classItem.spots }}</div>
                    <div class="text-xs text-muted-foreground">spots left</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <!-- Info Box -->
          <Card class="mt-12 p-6 bg-primary/5 border-primary/20">
            <h3 class="font-semibold mb-4 text-lg">Important Information</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start space-x-2">
                <span class="text-primary mt-1">•</span>
                <span>Classes must be booked in advance through our mobile app or website.</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary mt-1">•</span>
                <span>Please arrive 10 minutes early for check-in and equipment setup.</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary mt-1">•</span>
                <span
                  >Cancellations must be made at least 2 hours before class to avoid a late
                  cancellation fee.</span
                >
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-primary mt-1">•</span>
                <span
                  >Bring your own towel and water bottle. Mats are provided for yoga classes.</span
                >
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
