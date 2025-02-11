"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRightFromSquare,
  BarChartBig,
  BookPlusIcon,
  Eye,
  LucideBookLock,
  NotebookIcon,
  TicketPercent,
  Users,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: BarChartBig, label: "Dashboard" },
  { href: "/admin/blocked", icon: LucideBookLock, label: "Blocked Users" },
  {
    href: "/admin/notes-requests",
    icon: BookPlusIcon,
    label: "Notes Requests",
  },
  { href: "/admin/notes-reports", icon: NotebookIcon, label: "Notes Reports" },
  { href: "/admin/notes-usage", icon: Eye, label: "Notes Analytics" },
  { href: "/admin/coupons", icon: TicketPercent, label: "Coupon Management" },
  {
    href: "/admin/referrals",
    icon: ArrowUpRightFromSquare,
    label: "Referrals",
  },
  { href: "/admin/leaderboard", icon: Users, label: "Leaderboard" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Admin Panel</h1>

          <nav className="hidden md:flex space-x-4">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md flex gap-2 items-center justify-center ${
                  pathname === href ? "border-b-2 border-blue-500" : ""
                }`}
              >
                <Icon />
                <span className="hidden md:block">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden border-t mt-2 flex flex-col space-y-2">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-md flex gap-2 items-center ${
                  pathname === href ? "border-b-2 border-blue-500" : ""
                }`}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 p-6 font-wotfard tracking-wider">{children}</main>
    </div>
  );
}
