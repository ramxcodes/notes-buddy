import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UpgradePromptProps {
  message: string;
}

export default function UpgradePrompt({ message }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-center font-wotfard">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold bg-gradient-to-b from-[#eb7474] to-[#b82d2d] text-transparent bg-clip-text py-2 text-center">
        Access Denied <span className="text-white">⚠️</span>
      </h1>
      <p className="text-lg mb-6">{message}</p>
      <Button
        variant="outline"
        className="px-6 py-3 rounded-lg font-gilroy font-semibold hover:bg-black/85 transition-colors duration-300 ease-in-out hover:text-white"
      >
        <Link href="/buy-premium">Purchase Premium to Unlock 🔓</Link>
      </Button>
    </div>
  );
}
