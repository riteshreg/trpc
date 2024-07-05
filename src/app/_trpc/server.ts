import { httpBatchLink } from "@trpc/client";
import {  createCaller} from "@/server";

export const serverClient = createCaller({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
