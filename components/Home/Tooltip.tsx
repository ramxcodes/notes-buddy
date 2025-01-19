import { AnimatedTooltip } from "../ui/animated-tooltip";

export default function Tooltip() {
  const people = [
    {
      id: 1,
      name: "Swati Mehta",
      designation: "Student @MU",
      image:
        "/avatar/3.jpg",
    },
    {
      id: 2,
      name: "Dolly",
      designation: "Student AI/ML",
      image:
        "/avatar/2.jpg",
    },
    {
      id: 3,
      name: "Ishan",
      designation: "Student @Medicaps University",
      image:
        "/avatar/5.jpg",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
