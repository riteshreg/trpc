import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { accounts, sessions, todos, users, verificationTokens} from "../../db/schema";
import { postRouter } from "./routers/post";
import { todosRouter } from "./routers/todos";
import {
  createCallerFactory,
  mergeRouters
} from "./trpc";

const sqlite = new Database("database.db");
export const db = drizzle(sqlite, {
  schema: {
    todos,
    users,
    accounts,
    sessions,
    verificationTokens
  },
});

migrate(db, { migrationsFolder: "./drizzle" });

export const appRouter = mergeRouters(todosRouter, postRouter);

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
