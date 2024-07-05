import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  post: {
    create: publicProcedure
      .input(
        z.object({
          title: z.string(),
        })
      )
      .mutation((opts) => {
        const { input } = opts;
        return { status: true, ...input };
      }),

    list: publicProcedure.query(() => {
      return [];
    }),
  },
});
