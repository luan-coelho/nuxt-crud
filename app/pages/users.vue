<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-6">
      <!-- Cabeçalho da página -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Usuários</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Gerencie os usuários do sistema</p>
        </div>

        <!-- Botão de adicionar usuário -->
        <UButton color="primary" size="lg" icon="i-heroicons-plus" @click="handleAddUser">Novo Usuário</UButton>
      </div>

      <!-- Card da tabela -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Lista de Usuários</h2>
            <UBadge :label="`${users.length} usuários`" variant="subtle" />
          </div>
        </template>

        <!-- Loading state -->
        <div v-if="pending" class="flex justify-center py-8">
          <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin" />
        </div>

        <!-- Tabela de usuários -->
        <div v-else-if="users.length > 0" class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Avatar</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Nome</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Email</th>
                <th class="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Criado em</th>
                <th class="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
                class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                <td class="py-3 px-4">
                  <UAvatar :src="user.image || undefined" :alt="user.name" size="sm">
                    <template #fallback>
                      <UIcon name="i-heroicons-user" />
                    </template>
                  </UAvatar>
                </td>
                <td class="py-3 px-4 font-medium text-gray-900 dark:text-white">
                  {{ user.name }}
                </td>
                <td class="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {{ user.email }}
                </td>
                <td class="py-3 px-4 text-center">
                  <UBadge
                    :color="user.emailVerified ? 'success' : 'warning'"
                    :variant="user.emailVerified ? 'solid' : 'soft'"
                    size="xs">
                    {{ user.emailVerified ? 'Verificado' : 'Pendente' }}
                  </UBadge>
                </td>
                <td class="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {{ format(user.createdAt, 'dd/MM/yyyy HH:mm') }}
                </td>
                <td class="py-3 px-4 text-center">
                  <UDropdownMenu
                    :items="[
                      [
                        {
                          label: 'Visualizar',
                          icon: 'i-heroicons-eye',
                          click: () => handleViewUser(user),
                        },
                        {
                          label: 'Editar',
                          icon: 'i-heroicons-pencil-square',
                          click: () => handleEditUser(user),
                        },
                      ],
                      [
                        {
                          label: 'Excluir',
                          icon: 'i-heroicons-trash',
                          click: () => handleDeleteUser(user),
                        },
                      ],
                    ]">
                    <UButton color="neutral" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
                  </UDropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Estado vazio -->
        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-users" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum usuário encontrado</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">Comece criando alguns usuários de exemplo</p>
          <div class="flex justify-center gap-3">
            <UButton color="primary" @click="handleAddUser">Criar primeiro usuário</UButton>
            <UButton color="neutral" variant="outline" @click="createSampleUsers">Criar dados de exemplo</UButton>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { User } from '#server/database/schema'
import { format } from 'date-fns'

// Metadados da página
definePageMeta({
  title: 'Usuários',
})

// Buscar dados dos usuários
const {
  data: response,
  pending,
  error,
  refresh: _refreshUsers,
} = await useFetch<{
  success: boolean
  data: User[]
}>('/api/users')

// Configurar notificações
const toast = useToast()

// Dados reativas
const users = computed(() => response.value?.data || [])

// Handlers das ações
function handleAddUser() {
  toast.add({
    title: 'Funcionalidade em desenvolvimento',
    description: 'A criação de usuários será implementada em breve.',
    color: 'info',
  })
}

function handleViewUser(user: User) {
  toast.add({
    title: 'Visualizar usuário',
    description: `Visualizando dados de ${user.name}`,
    color: 'info',
  })
}

function handleEditUser(user: User) {
  toast.add({
    title: 'Funcionalidade em desenvolvimento',
    description: `Edição do usuário ${user.name} será implementada em breve.`,
    color: 'info',
  })
}

function handleDeleteUser(user: User) {
  toast.add({
    title: 'Funcionalidade em desenvolvimento',
    description: `Exclusão do usuário ${user.name} será implementada em breve.`,
    color: 'warning',
  })
}

// Função para criar usuários de exemplo
async function createSampleUsers() {
  try {
    const response = await $fetch<{
      success: boolean
      message: string
      count: number
    }>('/api/users/seed', {
      method: 'POST',
    })

    if (response?.success) {
      toast.add({
        title: 'Sucesso!',
        description: response.message,
        color: 'success',
      })

      // Recarregar a página para mostrar os novos usuários
      await navigateTo('/users', { replace: true })
    }
  } catch (error) {
    console.error('Erro ao criar usuários de exemplo:', error)
    toast.add({
      title: 'Erro!',
      description: 'Não foi possível criar os usuários de exemplo.',
      color: 'error',
    })
  }
}

// Tratamento de erros
if (error.value) {
  toast.add({
    title: 'Erro ao carregar usuários',
    description: 'Não foi possível carregar a lista de usuários.',
    color: 'error',
  })
}
</script>
