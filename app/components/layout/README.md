# Componentes de Layout

Este diretório contém todos os componentes relacionados ao layout da aplicação, criados com NuxtUI.

## Estrutura

```
components/layout/
├── AppLayout.vue          # Componente principal que combina todos os outros
├── AppSidebar.vue         # Sidebar com navegação
├── AppHeader.vue          # Header com breadcrumb e ações
├── AppFooter.vue          # Footer com links
├── MobileMenuButton.vue   # Botão do menu mobile
└── MobileOverlay.vue      # Overlay para mobile
```

## Uso Básico

### Layout Padrão

O layout padrão usa o componente `AppLayout` com configurações básicas:

```vue
<!-- layouts/default.vue -->
<template>
  <AppLayout>
    <slot />
  </AppLayout>
</template>
```

### Layout Customizado

Você pode criar layouts personalizados passando props para o `AppLayout`:

```vue
<!-- layouts/admin.vue -->
<template>
  <AppLayout
    app-name="Admin Panel"
    :user="adminUser"
    :navigation-items="adminNavigationItems"
    :show-search="false"
  >
    <template #header-actions>
      <UButton icon="i-heroicons-plus" color="primary">
        Add New
      </UButton>
    </template>
    
    <slot />
  </AppLayout>
</template>
```

## Componentes

### AppLayout

Componente principal que combina todos os outros componentes de layout.

**Props:**
- `appName` (string): Nome da aplicação
- `user` (User): Dados do usuário
- `navigationItems` (NavigationMenuItem[][]): Items de navegação
- `userDropdownItems` (DropdownItem[][]): Items do menu do usuário
- `showSearch` (boolean): Mostrar campo de busca
- `showNotifications` (boolean): Mostrar botão de notificações
- `showThemeToggle` (boolean): Mostrar botão de tema
- `copyrightText` (string): Texto de copyright
- `footerLinks` (FooterLink[]): Links do footer

**Slots:**
- `default`: Conteúdo principal
- `header-actions`: Ações extras no header
- `footer-content`: Conteúdo extra no footer

### AppSidebar

Sidebar com navegação vertical e informações do usuário.

**Props:**
- `isOpen` (boolean): Estado de abertura do sidebar
- `appName` (string): Nome da aplicação
- `user` (User): Dados do usuário
- `navigationItems` (NavigationMenuItem[][]): Items de navegação
- `userDropdownItems` (DropdownItem[][]): Items do menu do usuário

**Events:**
- `close`: Emitido quando o sidebar deve fechar

### AppHeader

Header com breadcrumb, busca e ações.

**Props:**
- `currentPageTitle` (string): Título da página atual
- `breadcrumbItems` (BreadcrumbItem[]): Items do breadcrumb
- `showSearch` (boolean): Mostrar campo de busca
- `showNotifications` (boolean): Mostrar botão de notificações
- `showThemeToggle` (boolean): Mostrar botão de tema

**Events:**
- `search`: Emitido quando o usuário busca
- `notifications`: Emitido quando clica em notificações

**Slots:**
- `actions`: Ações extras no header

### AppFooter

Footer com copyright e links.

**Props:**
- `copyrightText` (string): Texto de copyright
- `footerLinks` (FooterLink[]): Links do footer

**Slots:**
- `default`: Conteúdo extra do footer

## Composable useLayoutState

Use o composable `useLayoutState` para controlar o estado do layout programaticamente:

```vue
<script setup>
const { sidebarOpen, toggleSidebar, setHeaderTitle } = useLayoutState()

// Definir título da página
setHeaderTitle('Minha Página')

// Controlar sidebar
const handleToggle = () => {
  toggleSidebar()
}
</script>
```

## Tipos TypeScript

### User
```typescript
interface User {
  name: string
  email: string
  avatar?: string
}
```

### BreadcrumbItem
```typescript
interface BreadcrumbItem {
  label: string
  icon?: string
  to?: string
}
```

### FooterLink
```typescript
interface FooterLink {
  label: string
  to: string
  external?: boolean
}
```

### DropdownItem
```typescript
interface DropdownItem {
  label: string
  icon?: string
  to?: string
  click?: () => void
}
```

## Customização

### Cores e Tema

As cores são definidas no `app.config.ts`:

```typescript
export default {
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    }
  }
}
```

### Responsividade

O layout é totalmente responsivo:
- **Desktop (lg+)**: Sidebar fixo, header normal
- **Mobile**: Sidebar em overlay, botão de menu, header compacto

### Dark Mode

O layout suporta dark mode automático através do NuxtUI `useColorMode()`.

## Exemplos

### Página com Layout Customizado

```vue
<!-- pages/admin/index.vue -->
<script setup>
definePageMeta({
  layout: 'admin',
  title: 'Admin Dashboard'
})
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <!-- Conteúdo da página -->
  </div>
</template>
```

### Controlando o Sidebar

```vue
<script setup>
const { toggleSidebar, closeSidebar } = useLayoutState()

// Fechar sidebar após ação
const handleAction = () => {
  // fazer algo...
  closeSidebar()
}
</script>
```

### Adicionando Ações no Header

```vue
<!-- layouts/custom.vue -->
<template>
  <AppLayout>
    <template #header-actions>
      <UButton @click="handleExport">Export</UButton>
      <UButton @click="handleImport">Import</UButton>
    </template>
    
    <slot />
  </AppLayout>
</template>
```
