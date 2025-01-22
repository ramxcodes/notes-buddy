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
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const db = await clientPromise;
        const usersCollection = db.db().collection("users");

        const dbUser = await usersCollection.findOne({ email: token.email });

        if (!dbUser) {
          await usersCollection.insertOne({
            email: token.email,
            name: token.name || "",
            image: token.picture || "",
            Blocked: false,
            createdAt: new Date(),
          });
        } else if (!("Blocked" in dbUser)) {
          await usersCollection.updateOne(
            { email: token.email },
            { $set: { Blocked: false } }
          );
        }

        token.id = dbUser?._id;
        token.Blocked = dbUser?.Blocked ?? false;
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
      };
      return session;
    },
  },
};
