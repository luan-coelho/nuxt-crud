import { user } from '#server/database/schema/auth-schema'
import { useDrizzle } from '#server/utils/drizzle'

export default defineEventHandler(async _event => {
  try {
    // Verificar se já existem usuários
    const existingUsers = await useDrizzle().select().from(user)

    if (existingUsers.length > 0) {
      return {
        success: true,
        message: 'Usuários já existem no banco de dados',
        count: existingUsers.length,
      }
    }

    // Criar usuários de exemplo
    const sampleUsers = [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@exemplo.com',
        emailVerified: true,
        image: 'https://github.com/nuxt.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@exemplo.com',
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Pedro Oliveira',
        email: 'pedro@exemplo.com',
        emailVerified: true,
        image: 'https://github.com/benjamincanac.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await useDrizzle().insert(user).values(sampleUsers)

    return {
      success: true,
      message: 'Usuários de exemplo criados com sucesso',
      count: sampleUsers.length,
    }
  } catch (error) {
    console.error('Erro ao criar usuários de exemplo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    })
  }
})
