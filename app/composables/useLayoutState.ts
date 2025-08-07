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
  
  // Fechar sidebar com tecla ESC
  if (import.meta.client) {
    onMounted(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && sidebarOpen.value) {
          closeSidebar()
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      onUnmounted(() => {
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
