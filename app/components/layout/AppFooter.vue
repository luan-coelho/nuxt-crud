<template>
  <footer class="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="flex items-center space-x-4">
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ copyrightText }}
          </p>
        </div>
        
        <div class="flex items-center space-x-6">
          <ULink
            v-for="link in footerLinks"
            :key="link.label"
            :to="link.to"
            :target="link.external ? '_blank' : undefined"
            class="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            {{ link.label }}
          </ULink>
          
          <!-- Additional footer content slot -->
          <slot />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  label: string
  to: string
  external?: boolean
}

interface Props {
  copyrightText?: string
  footerLinks?: FooterLink[]
}

withDefaults(defineProps<Props>(), {
  copyrightText: '© 2025 My App. All rights reserved.',
  footerLinks: () => [
    {
      label: 'Privacy',
      to: '/privacy'
    },
    {
      label: 'Terms',
      to: '/terms'
    },
    {
      label: 'Support',
      to: '/support'
    }
  ]
})
</script>
