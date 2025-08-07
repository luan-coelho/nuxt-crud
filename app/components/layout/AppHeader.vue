<template>
  <header class="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Header left - breadcrumb or page title -->
        <div class="flex items-center space-x-4">
          <div class="lg:hidden w-10" />
          <!-- Spacer for mobile menu button -->
          <UBreadcrumb
            v-if="breadcrumbItems.length > 1"
            :items="breadcrumbItems"
            class="hidden sm:block"
          />
          <h1 class="sm:hidden text-lg font-semibold text-neutral-900 dark:text-white">
            {{ currentPageTitle }}
          </h1>
        </div>

        <!-- Header right - search and user menu -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div v-if="showSearch" class="hidden md:block">
            <UInput
              icon="i-heroicons-magnifying-glass"
              placeholder="Search..."
              class="w-64"
              @input="$emit('search', $event)"
            />
          </div>

          <!-- Notifications -->
          <UButton
            v-if="showNotifications"
            icon="i-heroicons-bell"
            color="neutral"
            variant="ghost"
            @click="$emit('notifications')"
          />

          <!-- Theme toggle -->
          <UButton
            v-if="showThemeToggle"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            color="neutral"
            variant="ghost"
            @click="toggleColorMode"
          />

          <!-- Additional actions slot -->
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  icon?: string
  to?: string
}

interface Props {
  currentPageTitle?: string
  breadcrumbItems?: BreadcrumbItem[]
  showSearch?: boolean
  showNotifications?: boolean
  showThemeToggle?: boolean
}

withDefaults(defineProps<Props>(), {
  currentPageTitle: 'Dashboard',
  breadcrumbItems: () => [],
  showSearch: true,
  showNotifications: true,
  showThemeToggle: true
})

defineEmits<{
  search: [value: string]
  notifications: []
}>()

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
