import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <nav className="flex space-x-4">
            <Link href="/admin" className="px-4 py-2 rounded-md">
              Dashboard
            </Link>
            <Link href="/admin/blocked" className="px-4 py-2 rounded-md">
              Blocked Users
            </Link>
            <Link href="/admin/notes-requests" className="px-4 py-2 rounded-md">
              Notes Requests
            </Link>
            <Link href="/admin/notes-reports" className="px-4 py-2 rounded-md ">
              Notes Reports
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 p-6 font-wotfard tracking-wider">{children}</main>
    </div>
  );
}
