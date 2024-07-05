import { publicProcedure, router, createCallerFactory } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { todos } from "../../db/schema";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";

const sqlite = new Database("database.db");
const db = drizzle(sqlite, {
  schema: {
    todos,
  },
});

migrate(db, { migrationsFolder: "./drizzle" });

export const appRouter = router({
  allTodos: publicProcedure.query(() =>
    db.query.todos.findMany({
      orderBy: desc(todos.id),
    })
  ),
  addTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.insert(todos).values({ todo: input }).execute();
    return true;
  }),

  doneTodo:publicProcedure.input(z.object({id:z.number(), done:z.number()})).mutation(async({input})=>{
    await db.update(todos).set({done:input.done}).where(eq(todos.id, input.id))
    return true
  })
});

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
