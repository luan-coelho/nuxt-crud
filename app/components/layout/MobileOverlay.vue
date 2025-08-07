<template>
  <div
    v-if="isVisible"
    class="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
    @click="$emit('close')"
  />
</template>

<script setup lang="ts">
interface Props {
  isVisible: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>
