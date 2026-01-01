<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import ChatWidget from '@/components/ui/ChatWidget.vue'
</script>

<template>
  <div>
    <RouterView />
    <ToastContainer />
    <ChatWidget />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
