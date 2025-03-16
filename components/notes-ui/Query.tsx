import { ArrowUpRight } from "lucide-react";

interface QueryProps {
  show?: string;
  title?: string;
  subject?: string;
}

export default function Query({ show, title, subject }: QueryProps) {
  const handleClick = () => {
    if (title && subject) {
      const query = `https://www.google.com/search?q=What+is+${encodeURIComponent(
        title
      )}+in+${encodeURIComponent(subject)}`;
      window.open(query, "_blank");
    }
  };

  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <span className="underline decoration-wavy decoration-[#2c0b8e] dark:decoration-[#e6b3ff] decoration-2 underline-offset-4">
        {show}
      </span>
      <ArrowUpRight size={16} />
    </div>
  );
}
