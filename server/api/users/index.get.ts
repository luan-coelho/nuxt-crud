import { user } from '#server/database/schema/auth-schema'
import { useDrizzle } from '#server/utils/drizzle'

export default defineEventHandler(async _event => {
  try {
    const users = await useDrizzle().select().from(user)

    return {
      success: true,
      data: users,
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor',
    })
  }
})
