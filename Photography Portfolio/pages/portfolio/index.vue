<template>
  <div>
    <section class="pt-32 pb-12 bg-primary-50 dark:bg-primary-800">
      <div class="container-custom">
        <div 
          class="max-w-3xl mx-auto text-center"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          <h1 class="font-serif text-4xl md:text-5xl mb-6">Portfolio Gallery</h1>
          <p class="text-lg mb-8">
            A curated collection of my finest work across various photography genres, 
            showcasing my unique style and artistic vision.
          </p>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container-custom">
        <PortfolioCategoryList 
          :categories="categories" 
          :active-category="activeCategory"
          @filter-change="handleFilterChange"
        />
        
        <PortfolioGrid 
          :photos="photos" 
          :category="activeCategory"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Portfolio Gallery - LensCraft Photography',
  meta: [
    { name: 'description', content: 'Browse our photography portfolio showcasing weddings, portraits, landscapes, and commercial photography work.' }
  ]
});

const activeCategory = ref('all');

const handleFilterChange = (category) => {
  activeCategory.value = category;
};

const categories = [
  { id: 1, name: 'pspspspspsps', slug: 'pspspspspsps' },
];

const photos = [
  {
    id: 1,
    title: 'psppspspsps',
    category: 'pspspspspsps',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A pspspspspsps photo.'
  }
];
</script>