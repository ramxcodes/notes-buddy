/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@/components/ui/card";
import React from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  planTier: string;
  image?: string;
  referralCode?: string;
  redemption?: string;
  phoneNumber?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}

interface UserCardProps {
  user: IUser;
  topNote?: { noteSlug: string; count: number };
}

const UserCard: React.FC<UserCardProps> = ({ user, topNote }) => {
  return (
    <Card className="max-w-md mx-auto shadow rounded p-6 flex flex-col items-center">
      <img
        src={user.image || "/default-profile.png"}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-bold">{user.name}</h2>
      {topNote && (
        <p className="text-sm text-center">
          Top Note: {topNote.noteSlug} ({topNote.count} visits)
        </p>
      )}
      <div className="mt-4 space-y-1 text-left">
        <p className="text-sm">Plan: {user.planTier}</p>
        <p className="text-sm">Phone: {user.phoneNumber || "N/A"}</p>
        {user.subscriptionStartDate && user.subscriptionEndDate && (
          <p className="text-sm">
            Subscription:{" "}
            {new Date(user.subscriptionStartDate).toLocaleDateString()} -{" "}
            {new Date(user.subscriptionEndDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
