<template>
  <UApp>
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <!-- Mobile menu button -->
      <MobileMenuButton @toggle="sidebarOpen = !sidebarOpen" />

      <!-- Mobile overlay -->
      <MobileOverlay :is-visible="sidebarOpen" @close="sidebarOpen = false" />

      <!-- Sidebar -->
      <AppSidebar
        :is-open="sidebarOpen"
        :app-name="appName"
        :user="user"
        :navigation-items="navigationItems"
        :user-dropdown-items="userDropdownItems"
        @close="sidebarOpen = false" />

      <!-- Main content area -->
      <div class="lg:pl-64">
        <!-- Header -->
        <AppHeader
          :current-page-title="currentPageTitle"
          :breadcrumb-items="breadcrumbItems"
          :show-search="showSearch"
          :show-notifications="showNotifications"
          :show-theme-toggle="showThemeToggle"
          @search="handleSearch"
          @notifications="handleNotifications">
          <template #actions>
            <slot name="header-actions" />
          </template>
        </AppHeader>

        <!-- Main content -->
        <main class="flex-1">
          <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <slot />
          </div>
        </main>

        <!-- Footer -->
        <AppFooter :copyright-text="copyrightText" :footer-links="footerLinks">
          <slot name="footer-content" />
        </AppFooter>
      </div>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface User {
  name: string
  email: string
  avatar?: string
}

interface BreadcrumbItem {
  label: string
  icon?: string
  to?: string
}

interface FooterLink {
  label: string
  to: string
  external?: boolean
}

interface DropdownItem {
  label: string
  icon?: string
  to?: string
  click?: () => void
}

interface Props {
  appName?: string
  user?: User
  navigationItems?: NavigationMenuItem[][]
  userDropdownItems?: DropdownItem[][]
  showSearch?: boolean
  showNotifications?: boolean
  showThemeToggle?: boolean
  copyrightText?: string
  footerLinks?: FooterLink[]
}

withDefaults(defineProps<Props>(), {
  appName: 'My App',
  user: () => ({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/32/32',
  }),
  navigationItems: () => [
    [
      {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/',
      },
      {
        label: 'Users',
        icon: 'i-heroicons-users',
        to: '/users',
      },
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        children: [
          {
            label: 'Profile',
            description: 'Manage your profile settings',
            icon: 'i-heroicons-user-circle',
            to: '/settings/profile',
          },
          {
            label: 'Account',
            description: 'Account preferences and security',
            icon: 'i-heroicons-shield-check',
            to: '/settings/account',
          },
          {
            label: 'Notifications',
            description: 'Configure your notifications',
            icon: 'i-heroicons-bell',
            to: '/settings/notifications',
          },
        ],
      },
    ],
    [
      {
        label: 'Help & Support',
        icon: 'i-heroicons-question-mark-circle',
        to: '/help',
      },
      {
        label: 'Documentation',
        icon: 'i-heroicons-document-text',
        to: '/docs',
        target: '_blank',
      },
    ],
  ],
  userDropdownItems: () => [
    [
      {
        label: 'Profile',
        icon: 'i-heroicons-user-circle',
        to: '/profile',
      },
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-6-tooth',
        to: '/settings',
      },
    ],
    [
      {
        label: 'Sign out',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        click: () => {
          console.log('Logging out...')
        },
      },
    ],
  ],
  showSearch: true,
  showNotifications: true,
  showThemeToggle: true,
  copyrightText: '© 2025 My App. All rights reserved.',
  footerLinks: () => [
    {
      label: 'Privacy',
      to: '/privacy',
    },
    {
      label: 'Terms',
      to: '/terms',
    },
    {
      label: 'Support',
      to: '/support',
    },
  ],
})

defineEmits<{
  search: [value: string]
  notifications: []
}>()

// Reactive state
const sidebarOpen = ref(false)
const route = useRoute()

// Computed properties
const currentPageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})

// Breadcrumb items
const breadcrumbItems = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
    },
  ]

  let currentPath = ''
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    items.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: 'i-heroicons-folder',
      to: currentPath,
    })
  }

  return items
})

// Event handlers
function handleSearch(value: string) {
  console.log('Search:', value)
}

function handleNotifications() {
  console.log('Notifications clicked')
}

// Close sidebar when route changes (mobile)
watch(
  () => route.path,
  () => {
    sidebarOpen.value = false
  },
)

// Close sidebar on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && sidebarOpen.value) {
      sidebarOpen.value = false
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>
