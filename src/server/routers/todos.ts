import {
    router,
    publicProcedure,
} from '../trpc'

import {db} from '../index'
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { todos } from '../../../db/schema';

export const todosRouter = router({
    allTodos: publicProcedure.query(() =>
      db.query.todos.findMany({
        orderBy: desc(todos.id),
      })
    ),
    addTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
      await db.insert(todos).values({ todo: input }).execute();
      return true;
    }),
    doneTodo: publicProcedure.input(z.object({ id: z.number(), done: z.number() })).mutation(async ({ input }) => {
      await db.update(todos).set({ done: input.done }).where(eq(todos.id, input.id))
      return true
    }),
    x:{
      y:publicProcedure.query(()=> 'yza')
    }
    
  })