<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out',
      'lg:translate-x-0 lg:static lg:inset-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="flex h-full flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
      <!-- Sidebar Header -->
      <div class="flex h-16 shrink-0 items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center space-x-2">
          <UIcon name="i-heroicons-cube" class="w-8 h-8 text-primary-500" />
          <span class="text-xl font-semibold text-neutral-900 dark:text-white">
            {{ appName }}
          </span>
        </div>
        <!-- Close button for mobile -->
        <UButton
          icon="i-heroicons-x-mark"
          color="neutral"
          variant="ghost"
          class="lg:hidden"
          aria-label="Close sidebar"
          @click="$emit('close')"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <UNavigationMenu
          orientation="vertical"
          :items="navigationItems"
          class="w-full"
        />
      </nav>

      <!-- Sidebar Footer -->
      <div class="px-4 py-4 border-t border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center space-x-3 px-2">
          <UAvatar
            :src="user.avatar"
            :alt="user.name"
            size="sm"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-neutral-900 dark:text-white truncate">
              {{ user.name }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {{ user.email }}
            </p>
          </div>
          <UDropdown :items="userDropdownItems" :popper="{ placement: 'top' }">
            <UButton
              icon="i-heroicons-ellipsis-vertical"
              color="neutral"
              variant="ghost"
              size="sm"
            />
          </UDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface User {
  name: string
  email: string
  avatar?: string
}

interface DropdownItem {
  label: string
  icon?: string
  to?: string
  click?: () => void
}

interface Props {
  isOpen: boolean
  appName?: string
  user?: User
  navigationItems?: NavigationMenuItem[][]
  userDropdownItems?: DropdownItem[][]
}

withDefaults(defineProps<Props>(), {
  appName: 'My App',
  user: () => ({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/32/32'
  }),
  navigationItems: () => [
    [
      {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/dashboard'
      },
      {
        label: 'Users',
        icon: 'i-heroicons-users',
        to: '/users'
      },
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        children: [
          {
            label: 'Profile',
            description: 'Manage your profile settings',
            icon: 'i-heroicons-user-circle',
            to: '/settings/profile'
          },
          {
            label: 'Account',
            description: 'Account preferences and security',
            icon: 'i-heroicons-shield-check',
            to: '/settings/account'
          },
          {
            label: 'Notifications',
            description: 'Configure your notifications',
            icon: 'i-heroicons-bell',
            to: '/settings/notifications'
          }
        ]
      }
    ],
    [
      {
        label: 'Help & Support',
        icon: 'i-heroicons-question-mark-circle',
        to: '/help'
      },
      {
        label: 'Documentation',
        icon: 'i-heroicons-document-text',
        to: '/docs',
        target: '_blank'
      }
    ]
  ],
  userDropdownItems: () => [
    [
      {
        label: 'Profile',
        icon: 'i-heroicons-user-circle',
        to: '/profile'
      },
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/settings'
      }
    ],
    [
      {
        label: 'Sign out',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        click: () => {
          console.log('Logging out...')
        }
      }
    ]
  ]
})

defineEmits<{
  close: []
}>()
</script>
