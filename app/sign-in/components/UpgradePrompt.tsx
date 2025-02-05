import { Card } from "@/components/ui/card";
import Link from "next/link";

export const UpgradePrompt = () => (
  <Card className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4 md:space-y-0 space-y-4 py-4 container mx-auto">
    <p className="text-lg font-medium text-muted-foreground text-center">
      You are currently on a Free plan. <br /> Upgrade to enjoy exclusive benefits!
    </p>
    <button className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-white after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
      <Link href="/buy-premium">Purchase Premium</Link>
    </button>
  </Card>
);