import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const { Pool } = pkg;
import { pgTable, integer, varchar, timestamp, text, array } from 'drizzle-orm/pg-core';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle({ client: pool });


  export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
  });
  
  export const productsTable = pgTable('product', {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      referencia: varchar({ length: 255 }).notNull(),
      color: varchar({ length: 255 }).notNull(),
      producto: varchar({ length: 255 }).notNull(),
      costo:varchar({ length: 255 }),
      precio:varchar({ length: 255 }),
      cantidad:varchar({ length: 255 }),
      marca: varchar({ length: 255 }).notNull(),
      imagenes: text("images").array().notNull(), 
      importado: varchar({ length: 255 }).notNull(),
      talla:varchar({ length: 255 }),
      genero:varchar({ length: 255 }),
      timestamp: timestamp(),
  })