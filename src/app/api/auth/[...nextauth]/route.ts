import { config } from "@/app/utils/config";
import { createDefaultData } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

interface Props {
  user: User | AdapterUser;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecreat,
    }),
    // ...add more providers here
  ],
  /* If call the signin() run this page  */
  pages: {
    signIn: "/auth/signIn",
  },
  /* Come back form google */
  callbacks: {
    async signIn({ user }: Props) {
      const dbUser = await prisma.user.findFirst({
        where: { email: user.email as string },
      });
      if (!dbUser) {
        await createDefaultData(user);
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
