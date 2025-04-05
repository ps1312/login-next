import { pgTable, text, timestamp, numeric, bigserial } from 'drizzle-orm/pg-core';

export const expenses = pgTable('expenses', {
  id: bigserial({ mode: 'number'}).primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  amount: numeric({mode: 'number'}).notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  userId: text('user_id').notNull(),
});