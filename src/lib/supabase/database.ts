import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as dotenv from 'dotenv'

import * as schema from '../../../migrations/schema'

dotenv.config({ path: '.env' })

if (!process.env.DATABASE_URL) {
  console.log('🔻 Cannot find database url!')
}

const databaseClient = postgres(process.env.DATABASE_URL as string, { max: 1 })

const database = drizzle(databaseClient, { schema })

const migrateDatabase = async () => {
  try {
    console.log('🟡 Migrating client!')

    await migrate(database, { migrationsFolder: 'migrations' })

    console.log('🟢 Successfully migrated client!')
  } catch (error) {
    console.log('🔴 Error while trying to migrate client!')
  }
}

migrateDatabase()

export default database
