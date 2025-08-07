<template>
  <div class="lg:hidden fixed top-4 left-4 z-50">
    <UButton
      icon="i-heroicons-bars-3"
      color="neutral"
      variant="outline"
      aria-label="Toggle sidebar"
      @click="$emit('toggle')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  toggle: []
}>()
</script>
