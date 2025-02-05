import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthButtonsProps {
  onSignOut: () => void;
}

export const AuthButtons = ({ onSignOut }: AuthButtonsProps) => (
  <div className="flex flex-col space-x-0 space-y-4 md:space-y-0 md:flex md:flex-row md:space-x-4">
    <Button
      variant={"outline"}
      onClick={onSignOut}
      className="px-4 py-2 bg-red-600"
    >
      Sign Out
    </Button>
    <Button variant={"secondary"} className="px-4 py-2">
      <Link href="/notes">View Notes</Link>
    </Button>
  </div>
);