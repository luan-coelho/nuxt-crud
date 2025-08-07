/**
 * Composable para gerenciar o estado do layout da aplicação
 */
export const useLayoutState = () => {
  // Estado reativo global
  const sidebarOpen = useState('layout.sidebarOpen', () => false)
  const headerTitle = useState('layout.headerTitle', () => 'Dashboard')
  
  // Métodos para controlar o sidebar
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const openSidebar = () => {
    sidebarOpen.value = true
  }
  
  const closeSidebar = () => {
    sidebarOpen.value = false
  }
  
  // Método para definir o título da página
  const setHeaderTitle = (title: string) => {
    headerTitle.value = title
  }
  
  // Fechar sidebar quando a rota mudar (mobile)
  const route = useRoute()
  watch(() => route.path, () => {
    if (import.meta.client && window.innerWidth < 1024) {
      closeSidebar()
    }
  })
  
  // Detectar mudanças de tamanho da tela
  if (import.meta.client) {
    onMounted(() => {
      const handleResize = () => {
        // Fechar sidebar automaticamente em telas pequenas
        if (window.innerWidth < 1024 && sidebarOpen.value) {
          closeSidebar()
        }
      }
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && sidebarOpen.value) {
          closeSidebar()
        }
      }
      
      // Listeners
      window.addEventListener('resize', handleResize)
      document.addEventListener('keydown', handleEscape)
      
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('keydown', handleEscape)
      })
    })
  }
  
  return {
    // Estado
    sidebarOpen: readonly(sidebarOpen),
    headerTitle: readonly(headerTitle),
    
    // Métodos
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setHeaderTitle
  }
}
