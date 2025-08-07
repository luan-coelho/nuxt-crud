<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

// Função para obter informações específicas do erro
const getErrorInfo = (statusCode: number) => {
  switch (statusCode) {
    case 404:
      return {
        title: 'Página não encontrada',
        message: 'A página que você está procurando não existe ou foi movida.',
        icon: '🔍',
        suggestion: 'Verifique se o endereço está correto ou volte para a página inicial.',
      }
    case 500:
      return {
        title: 'Erro interno do servidor',
        message: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
        icon: '⚠️',
        suggestion: 'Se o problema persistir, entre em contato com o suporte.',
      }
    case 403:
      return {
        title: 'Acesso negado',
        message: 'Você não tem permissão para acessar esta página.',
        icon: '🚫',
        suggestion: 'Faça login com uma conta que tenha as permissões necessárias.',
      }
    case 401:
      return {
        title: 'Não autorizado',
        message: 'Você precisa estar logado para acessar esta página.',
        icon: '🔐',
        suggestion: 'Faça login para continuar.',
      }
    default:
      return {
        title: 'Erro inesperado',
        message: 'Ocorreu um erro inesperado.',
        icon: '❌',
        suggestion: 'Tente atualizar a página ou volte para a página inicial.',
      }
  }
}

const errorInfo = computed(() => getErrorInfo(props.error?.statusCode || 500))
</script>

<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">{{ errorInfo.icon }}</div>

      <h1 class="error-code">{{ error?.statusCode || 500 }}</h1>

      <h2 class="error-title">{{ errorInfo.title }}</h2>

      <p class="error-message">{{ errorInfo.message }}</p>

      <p class="error-suggestion">{{ errorInfo.suggestion }}</p>

      <div class="error-actions">
        <button class="btn-primary" @click="handleError">Voltar ao início</button>

        <button class="btn-secondary" @click="$router.go(-1)">Voltar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.error-content {
  max-width: 500px;
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-code {
  font-size: 4rem;
  font-weight: bold;
  color: #e53e3e;
  margin: 0 0 1rem 0;
  line-height: 1;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
}

.error-message {
  color: #4a5568;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.error-suggestion {
  color: #718096;
  font-size: 0.9rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

.error-debug {
  margin-top: 2rem;
  text-align: left;
}

.error-debug summary {
  cursor: pointer;
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.error-debug pre {
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  overflow-x: auto;
  color: #2d3748;
}

@media (max-width: 640px) {
  .error-content {
    padding: 2rem 1.5rem;
  }

  .error-code {
    font-size: 3rem;
  }

  .error-actions {
    flex-direction: column;
  }
}
</style>
