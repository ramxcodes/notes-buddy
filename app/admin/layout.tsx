"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChartBig,
  BookPlusIcon,
  LucideBookLock,
  NotebookIcon,
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold hidden md:block">Admin Panel</h1>
          <nav className="flex space-x-4">
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-md flex gap-2 items-center justify-center  ${
                pathname === "/admin" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              <BarChartBig /> <span className="hidden md:block">Dashboard</span>
            </Link>
            <Link
              href="/admin/blocked"
              className={`px-4 py-2 rounded-md flex gap-2 items-center justify-center ${
                pathname === "/admin/blocked"
                  ? "border-b-2 border-blue-500"
                  : ""
              }`}
            >
              <LucideBookLock /> <span className="hidden md:block">Blocked Users</span>
            </Link>
            <Link
              href="/admin/notes-requests"
              className={`px-4 py-2 rounded-md flex gap-2 items-center justify-center ${
                pathname === "/admin/notes-requests"
                  ? "border-b-2 border-blue-500"
                  : ""
              }`}
            >
              <BookPlusIcon /> <span className="hidden md:block">Notes Requests</span>
            </Link>
            <Link
              href="/admin/notes-reports"
              className={`px-4 py-2 rounded-md flex gap-2 items-center justify-center ${
                pathname === "/admin/notes-reports"
                  ? "border-b-2 border-blue-500"
                  : ""
              }`}
            >
              <NotebookIcon /> <span className="hidden md:block">Notes Reports</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-6 font-wotfard tracking-wider">{children}</main>
    </div>
  );
}
