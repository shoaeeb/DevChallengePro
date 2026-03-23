import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/mongodb";
import { User, type IUser } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile) {
        const ghProfile = profile as { id: number; login: string };
        await connectDB();
        await User.findOneAndUpdate(
          { githubId: String(ghProfile.id) },
          {
            githubId: String(ghProfile.id),
            username: ghProfile.login ?? user.name ?? "",
            email: user.email ?? undefined,
            avatarUrl: user.image ?? "",
            profileUrl: `https://github.com/${ghProfile.login}`,
          },
          { upsert: true, new: true }
        );
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string; isPro?: boolean }).id = token.sub;
        // Fetch isPro from DB on each session refresh
        await connectDB();
        const dbUser = await User.findOne({ githubId: token.sub }).lean<IUser>();
        // isPro is only true if proExpiresAt is in the future
        const isProActive =
          dbUser?.isPro === true &&
          dbUser?.proExpiresAt != null &&
          new Date(dbUser.proExpiresAt) > new Date();
        (session.user as { id?: string; isPro?: boolean }).isPro = isProActive;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
