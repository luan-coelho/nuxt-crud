import { authClient } from '@/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Evita redirecionamento infinito se já estiver na página de login
  if (to.path === '/auth/signin') {
    return
  }

  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    return navigateTo('/auth/signin')
  }
})
