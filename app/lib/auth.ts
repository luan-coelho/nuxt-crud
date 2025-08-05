import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { schema } from '~~/server/database/schema'
import { db } from '../../server/utils/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "pg" or "mysql"
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})
