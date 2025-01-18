import { Button } from "@/components/ui/button";

interface UpgradePromptProps {
  message: string;
}

export default function UpgradePrompt({ message }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">{message}</p>
      <Button className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
        <a href="/buy-premium" className="text-white">
          Upgrade Your Plan
        </a>
      </Button>
    </div>
  );
}
