<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Painel de controle do sistema</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card de Usuários -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-users" class="w-6 h-6 text-primary-500" />
              <h2 class="text-lg font-semibold">Usuários</h2>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-gray-600 dark:text-gray-400">Gerencie os usuários do sistema</p>
            <UButton to="/users" color="primary" variant="outline" block>Ver Usuários</UButton>
          </div>
        </UCard>

        <!-- Card de Configurações (placeholder) -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-cog-6-tooth" class="w-6 h-6 text-gray-500" />
              <h2 class="text-lg font-semibold">Configurações</h2>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-gray-600 dark:text-gray-400">Configure o sistema</p>
            <UButton color="neutral" variant="outline" block disabled>Em breve</UButton>
          </div>
        </UCard>

        <!-- Card de Relatórios (placeholder) -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-gray-500" />
              <h2 class="text-lg font-semibold">Relatórios</h2>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-gray-600 dark:text-gray-400">Visualize relatórios</p>
            <UButton color="neutral" variant="outline" block disabled>Em breve</UButton>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Dashboard',
})
</script>
