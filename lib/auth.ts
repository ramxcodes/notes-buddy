import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const db = await clientPromise;
      const usersCollection = db.db().collection("users");

      if (user) {
        const email = user.email || token.email;

        let dbUser = await usersCollection.findOne({ email });

        if (!dbUser) {
          const result = await usersCollection.insertOne({
            email,
            name: user.name || token.name || "",
            image: user.image || token.picture || "",
            Blocked: false,
            createdAt: new Date(),
          });
          dbUser = { _id: result.insertedId, Blocked: false };
        } else {
          if (
            account &&
            (!dbUser.provider || dbUser.provider !== account.provider)
          ) {
            await usersCollection.updateOne(
              { email },
              { $set: { provider: account.provider } }
            );
          }
        }

        token.id = dbUser._id?.toString() || token.id;
        token.Blocked = dbUser.Blocked ?? false;
        token.email = email;
        token.name = user.name || token.name;

        const adminEmails =
          process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
        token.isAdmin = adminEmails.includes(email || "");
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email || "",
        name: token.name || "",
        image: token.picture || "",
        Blocked: token.Blocked as boolean,
        isAdmin: token.isAdmin as boolean,
      };
      return session;
    },
  },
};
