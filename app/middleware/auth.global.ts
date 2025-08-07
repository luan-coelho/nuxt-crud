export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Evita redirecionamento infinito se já estiver na página de login
  if (to.path === '/auth/signin') {
    return
  }

  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated.value) {
    return navigateTo('/auth/signin')
  }
})
