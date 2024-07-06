// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "../../../../../db/schema";
import { Adapter } from "next-auth/adapters";


const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: 
      clientSecret: 
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  secret: "sdfasdfasdfasdfasdfasdfas",
});

export { handler as GET, handler as POST };
