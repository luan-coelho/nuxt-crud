<template>
  <AppLayout
    app-name="Admin Panel"
    :user="adminUser"
    :navigation-items="adminNavigationItems"
    :show-search="false"
    copyright-text="© 2025 Admin Panel. All rights reserved."
    :footer-links="adminFooterLinks"
  >
    <!-- Slot personalizado para ações do header -->
    <template #header-actions>
      <UButton icon="i-heroicons-plus" color="primary" size="sm">
        Quick Add
      </UButton>
    </template>

    <!-- Conteúdo da página -->
    <slot />

    <!-- Slot personalizado para conteúdo adicional do footer -->
    <template #footer-content>
      <UButton variant="ghost" size="xs" icon="i-heroicons-heart">
        Made with ❤️
      </UButton>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
// Dados customizados para o layout admin
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: '/api/placeholder/32/32'
}

const adminNavigationItems = [
  [
    {
      label: 'Admin Dashboard',
      icon: 'i-heroicons-squares-2x2',
      to: '/admin'
    },
    {
      label: 'User Management',
      icon: 'i-heroicons-users',
      to: '/admin/users'
    },
    {
      label: 'System Settings',
      icon: 'i-heroicons-cog-8-tooth',
      to: '/admin/settings'
    },
    {
      label: 'Analytics',
      icon: 'i-heroicons-chart-bar',
      to: '/admin/analytics'
    }
  ],
  [
    {
      label: 'Logs',
      icon: 'i-heroicons-document-text',
      to: '/admin/logs'
    },
    {
      label: 'Backups',
      icon: 'i-heroicons-archive-box',
      to: '/admin/backups'
    }
  ]
]

const adminFooterLinks = [
  {
    label: 'API Docs',
    to: '/api/docs',
    external: true
  },
  {
    label: 'Status',
    to: '/status'
  },
  {
    label: 'Contact',
    to: '/contact'
  }
]
</script>
