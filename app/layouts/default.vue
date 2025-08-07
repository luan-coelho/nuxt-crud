<template>
  <UApp>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Layout Grid - Responsivo -->
      <div class="lg:grid lg:grid-cols-[280px_1fr] min-h-screen">
        <!-- Sidebar -->
        <aside
          :class="[
            'fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          ]"
          class="w-[280px] lg:w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div class="flex flex-col h-full">
            <!-- Sidebar Header -->
            <div class="flex items-center justify-between p-3 sm:p-4 border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-cube" class="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                <span class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Nuxt CRUD</span>
              </div>
              <UButton
                icon="i-heroicons-x-mark"
                variant="ghost"
                color="neutral"
                size="sm"
                class="lg:hidden"
                @click="closeSidebar" />
            </div>

            <!-- Sidebar Navigation -->
            <nav class="flex-1 p-3 sm:p-4 overflow-y-auto">
              <UNavigationMenu :items="navigationItems" orientation="vertical" class="w-full" />
            </nav>

            <!-- Sidebar Footer -->
            <div class="p-5 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-2 sm:gap-3 p-0">
                <UAvatar :src="user?.image ?? undefined" :alt="user?.name" size="sm">
                  <template #fallback>
                    <UIcon name="i-heroicons-user" />
                  </template>
                </UAvatar>
                <div class="flex-1 min-w-0">
                  <p class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ user?.name || 'Usuário' }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ user?.email || 'usuario@exemplo.com' }}
                  </p>
                </div>
                <UDropdownMenu :items="userMenuItems">
                  <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" color="neutral" size="xs" />
                </UDropdownMenu>
              </div>
            </div>
          </div>
        </aside>

        <!-- Overlay for mobile -->
        <!-- Overlay for mobile -->
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 z-40 bg-black/50 lg:hidden sidebar-overlay"
          @click="closeSidebar"
          @touchstart="closeSidebar" />

        <!-- Main Content Area -->
        <div class="flex flex-col min-h-screen lg:min-h-0">
          <!-- Header -->
          <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 sticky top-0">
            <div class="px-3 sm:px-4 lg:px-6 xl:px-8">
              <div class="flex items-center justify-between h-14 sm:h-16">
                <!-- Left side -->
                <div class="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  <UButton
                    icon="i-heroicons-bars-3"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    class="lg:hidden flex-shrink-0"
                    @click="toggleSidebar" />
                  <div class="min-w-0 flex-1">
                    <h1 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">
                      {{ headerTitle }}
                    </h1>
                  </div>
                </div>

                <!-- Right side -->
                <div class="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
                  <!-- Theme Toggle - Hidden on very small screens -->
                  <UButton
                    :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    class="hidden sm:flex"
                    @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'" />

                  <!-- Notifications -->
                  <UButton
                    icon="i-heroicons-bell"
                    variant="ghost"
                    color="neutral"
                    size="sm"
                    :badge="notificationCount > 0 ? notificationCount : undefined" />

                  <!-- User Menu -->
                  <UDropdownMenu :items="userMenuItems">
                    <UAvatar
                      :src="user?.image ?? undefined"
                      :alt="user?.name"
                      size="sm"
                      class="cursor-pointer flex-shrink-0">
                      <template #fallback>
                        <UIcon name="i-heroicons-user" />
                      </template>
                    </UAvatar>
                  </UDropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <!-- Main Content -->
          <main class="flex-1 overflow-auto">
            <div class="px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
              <slot />
            </div>
          </main>

          <!-- Footer -->
          <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div class="px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div class="flex items-center gap-4 order-2 sm:order-1">
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    © {{ currentYear }} Nuxt CRUD. Todos os direitos reservados.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </UApp>
</template>

<script lang="ts" setup>
const { user, signOut } = useAuth()

const { sidebarOpen: isSidebarOpen, headerTitle, toggleSidebar, closeSidebar } = useLayoutState()

const route = useRoute()
const colorMode = useColorMode()

// Ano atual para o footer
const currentYear = new Date().getFullYear()

// Contador de notificações (mock)
const notificationCount = ref(3)

// Itens de navegação
const navigationItems = computed(() => [
  [
    {
      label: 'Navegação',
      type: 'label' as const,
    },
    {
      label: 'Dashboard',
      icon: 'i-heroicons-home',
      to: '/dashboard',
      active: route.path === '/dashboard',
    },
    {
      label: 'Usuários',
      icon: 'i-heroicons-users',
      to: '/users',
      active: route.path === '/users',
    },
  ],
  [
    {
      label: 'Sistema',
      type: 'label' as const,
    },
    {
      label: 'Configurações',
      icon: 'i-heroicons-cog-6-tooth',
      disabled: false,
      children: [
        {
          label: 'Geral',
          icon: 'i-heroicons-adjustments-horizontal',
          to: '/settings/general',
        },
        {
          label: 'Usuários',
          icon: 'i-heroicons-user-group',
          to: '/settings/users',
        },
        {
          label: 'Segurança',
          icon: 'i-heroicons-shield-check',
          to: '/settings/security',
        },
      ],
    },
  ],
])

// Menu do usuário
const userMenuItems = computed(() => [
  [
    {
      label: 'Perfil',
      icon: 'i-heroicons-user',
      to: '/profile',
    },
    {
      label: 'Configurações',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/settings',
    },
  ],
  [
    // Adicionar toggle de tema para dispositivos móveis
    {
      label: colorMode.value === 'dark' ? 'Modo Claro' : 'Modo Escuro',
      icon: colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon',
      click: () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      },
      class: 'sm:hidden',
    },
    {
      label: 'Sair',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      click: signOut,
    },
  ],
])
</script>
