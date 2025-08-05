<script setup lang="ts">
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'

// Definir página como guest-only
definePageMeta({
  layout: false,
})

const session = authClient.useSession()

// Schema de validação com Zod
const loginSchema = z.object({
  email: z.email('Email é obrigatório').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

// Estado do formulário
const state = reactive<LoginForm>({
  email: '',
  password: '',
})

// Estado de loading
const isLoading = ref(false)
const isGoogleLoading = ref(false)

// Toast para notificações
const toast = useToast()

// Função de login com email/senha
async function onSubmit(event: { data: LoginForm }) {
  try {
    isLoading.value = true

    const result = await authClient.signIn.email({
      email: event.data.email,
      password: event.data.password,
    })

    if (result.error) {
      toast.add({
        title: 'Erro no login',
        description: result.error.message || 'Credenciais inválidas',
        color: 'error',
        icon: 'i-heroicons-x-circle',
      })
    } else {
      toast.add({
        title: 'Login realizado!',
        description: 'Redirecionando...',
        color: 'success',
        icon: 'i-heroicons-check-circle',
      })

      await navigateTo('/dashboard')
    }
  } catch {
    toast.add({
      title: 'Erro no login',
      description: 'Algo deu errado. Tente novamente.',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
  } finally {
    isLoading.value = false
  }
}

// Função de login com Google
const signInWithGoogle = async () => {
  try {
    isGoogleLoading.value = true

    await authClient.signIn.social({
      provider: 'google',
    })
  } catch {
    toast.add({
      title: 'Erro no login',
      description: 'Falha ao fazer login com Google',
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
  } finally {
    isGoogleLoading.value = false
  }
}

// Redirecionar se já estiver logado
watch(
  session,
  newSession => {
    if (newSession?.data) {
      navigateTo('/dashboard')
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo/Header -->
      <div class="text-center">
        <div
          class="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
          <UIcon name="i-heroicons-lock-closed" class="h-8 w-8 text-white" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Faça seu login</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Acesse sua conta para continuar</p>
      </div>

      <!-- Card do formulário -->
      <UCard class="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <template #header>
          <div class="text-center py-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Entre com sua conta</h3>
          </div>
        </template>

        <div class="space-y-6">
          <!-- Botão Google -->
          <UButton
            variant="outline"
            size="lg"
            block
            :loading="isGoogleLoading"
            :disabled="isLoading"
            class="relative border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
            @click="signInWithGoogle">
            <template #leading>
              <GoogleIcon />
            </template>
            <span class="font-medium">Continuar com Google</span>
          </UButton>

          <!-- Divisor -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">ou</span>
            </div>
          </div>

          <!-- Formulário de login -->
          <UForm :schema="loginSchema" :state="state" class="space-y-4" :validate-on="[]" @submit="onSubmit">
            <UFormField label="Email" name="email">
              <UInput v-model="state.email" size="lg" class="w-full" />
            </UFormField>

            <UFormField label="Password" name="password">
              <UInput v-model="state.password" type="password" size="lg" class="w-full" />
            </UFormField>

            <div class="flex items-center justify-between">
              <UCheckbox label="Lembrar de mim" :disabled="isLoading || isGoogleLoading" />
              <ULink
                to="/auth/forgot-password"
                class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Esqueceu a senha?
              </ULink>
            </div>

            <UButton
              type="submit"
              :loading="isLoading"
              :disabled="isGoogleLoading"
              size="lg"
              block
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              <template #leading>
                <UIcon name="i-heroicons-arrow-right-on-rectangle" />
              </template>
              Entrar
            </UButton>
          </UForm>
        </div>

        <template #footer>
          <div class="text-center text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?
            <ULink
              to="/auth/signup"
              class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Cadastre-se aqui
            </ULink>
          </div>
        </template>
      </UCard>

      <!-- Footer -->
      <div class="text-center text-xs text-gray-500 dark:text-gray-400">
        <p>
          Ao fazer login, você concorda com nossos
          <ULink class="text-blue-600 hover:text-blue-500 dark:text-blue-400" to="/terms">Termos de Uso</ULink>
          e
          <ULink class="text-blue-600 hover:text-blue-500 dark:text-blue-400" to="/privacy">
            Política de Privacidade
          </ULink>
        </p>
      </div>
    </div>
  </div>
</template>
