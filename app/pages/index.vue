<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
  layout: 'default',
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
      <p class="mt-2 text-neutral-600 dark:text-neutral-400">Welcome to your application dashboard</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard>
        <template #default>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Users</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">1,234</p>
            </div>
            <UIcon name="i-heroicons-users" class="w-8 h-8 text-blue-500" />
          </div>
        </template>
      </UCard>

      <UCard>
        <template #default>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Revenue</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">$45,678</p>
            </div>
            <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 text-green-500" />
          </div>
        </template>
      </UCard>

      <UCard>
        <template #default>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Orders</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">890</p>
            </div>
            <UIcon name="i-heroicons-shopping-cart" class="w-8 h-8 text-purple-500" />
          </div>
        </template>
      </UCard>

      <UCard>
        <template #default>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-neutral-600 dark:text-neutral-400">Growth</p>
              <p class="text-2xl font-bold text-neutral-900 dark:text-white">+12.5%</p>
            </div>
            <UIcon name="i-heroicons-arrow-trending-up" class="w-8 h-8 text-orange-500" />
          </div>
        </template>
      </UCard>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chart Section -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Analytics Overview</h3>
              <UButton variant="outline" size="sm">View Details</UButton>
            </div>
          </template>
          <template #default>
            <div class="h-64 flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <p class="text-neutral-500 dark:text-neutral-400">
                Chart placeholder - integrate with your preferred chart library
              </p>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Recent Activity -->
      <div>
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Recent Activity</h3>
          </template>
          <template #default>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <UAvatar size="sm" icon="i-heroicons-user" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">New user registered</p>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">2 minutes ago</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <UAvatar size="sm" icon="i-heroicons-shopping-cart" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">Order #1234 completed</p>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">5 minutes ago</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <UAvatar size="sm" icon="i-heroicons-currency-dollar" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-neutral-900 dark:text-white">Payment received</p>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400">10 minutes ago</p>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <UButton variant="ghost" size="sm" class="w-full">View All Activities</UButton>
          </template>
        </UCard>
      </div>
    </div>

    <!-- Quick Actions -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">Quick Actions</h3>
      </template>
      <template #default>
        <div class="flex flex-wrap gap-4">
          <UButton icon="i-heroicons-plus" color="primary">Add User</UButton>
          <UButton icon="i-heroicons-document-plus" color="success" variant="outline">Create Report</UButton>
          <UButton icon="i-heroicons-cog-6-tooth" color="neutral" variant="outline">Settings</UButton>
          <UButton icon="i-heroicons-arrow-down-tray" color="secondary" variant="outline">Export Data</UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
