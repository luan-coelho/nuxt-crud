import { authClient } from '@/lib/auth-client'

export const useAuth = () => {
  const session = authClient.useSession()

  const signOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigateTo('/auth/signin')
          },
        },
      })
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const signIn = {
    email: authClient.signIn.email,
    social: authClient.signIn.social,
  }

  const signUp = {
    email: authClient.signUp.email,
  }

  return {
    session,
    signOut,
    signIn,
    signUp,
    user: computed(() => session.value.data?.user),
    isAuthenticated: computed(() => !!session.value.data?.user),
    isLoading: computed(() => session.value.isPending),
  }
}