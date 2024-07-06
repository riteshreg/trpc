import { httpBatchLink } from "@trpc/client";
import {  createCaller} from "@/server";

export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: "https://trpc-five.vercel.app/api/trpc",
    }),
  ],
});
