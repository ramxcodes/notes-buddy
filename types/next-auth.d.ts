import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      planTier?: string;
      university?: string;
      degree?: string;
      subscriptionEndDate?: string;
      subscriptionStartDate?: string;
      semesters?: string[];
      phoneNumber?: string;
      Blocked?: boolean;
      isAdmin?: boolean;
      razorpayDetails?: {
        orderId: string;
        paymentId: string;
        amount: number;
      };
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    planTier?: string;
    university?: string;
    degree?: string;
    subscriptionEndDate?: string;
    subscriptionStartDate?: string;
    semesters?: string[];
    phoneNumber?: string;
    Blocked?: boolean;
    isAdmin?: boolean;
    razorpayDetails?: {
      orderId: string;
      paymentId: string;
      amount: number;
    };
  }
}
