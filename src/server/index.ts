import { publicProcedure, router, createCallerFactory, mergeRouters } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { todos } from "../../db/schema";
import { postRouter } from "./routers/post";
import { todosRouter } from "./routers/todos";

const sqlite = new Database("database.db");
export const db = drizzle(sqlite, {
  schema: {
    todos,
  },
});

migrate(db, { migrationsFolder: "./drizzle" });


export const appRouter = mergeRouters(
    todosRouter, 
    postRouter
  )

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
