import NextAuth, { NextAuthOptions } from "next-auth";
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

        const dbUser = await usersCollection.findOne({ email: user.email });

        if (!dbUser) {
          const insertResult = await usersCollection.insertOne({
            email: user.email,
            name: user.name || "",
            image: user.image || "",
            Blocked: false,
            createdAt: new Date(),
          });

          token.id = insertResult.insertedId.toString();
          token.Blocked = false;
        } else {
          if (!("Blocked" in dbUser)) {
            await usersCollection.updateOne(
              { email: user.email },
              { $set: { Blocked: false } }
            );
          }

          token.id = dbUser._id.toString();
          token.Blocked = dbUser.Blocked ?? false;
        }

        const adminEmails =
          process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim()) ||
          [];
        token.isAdmin = adminEmails.includes(user.email || "");
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
