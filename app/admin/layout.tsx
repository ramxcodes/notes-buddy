import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <nav className="mt-2 flex gap-4">
          <Link href="/admin" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/admin/blocked" className="hover:underline">
            Blocked Users
          </Link>
          <Link href="/admin/notes-requests" className="hover:underline">
            Notes Requests
          </Link>
          <Link href="/admin/notes-reports" className="hover:underline">
            Notes Reports
          </Link>
          <Link href="/admin/search-user" className="hover:underline">
            Search User
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
