import {
  LucideArrowDownLeft,
  LucideArrowUpRight,
  LucideUsers,
} from "lucide-react";

export default function Card({
  value,
  percentageIncrease,
  label,
}: {
  value: number | undefined;
  percentageIncrease: number | undefined;
  label: string;
}) {
  return (
    <div className="p-3 h-28 shadow-md flex-1 rounded-md flex justify-between flex-col bg-[#fff]">
      <div className="flex items-center space-x-2">
        <LucideUsers />
        <p className="text-sm">{label}</p>
      </div>
      <p className="text-3xl font-bold flex items-center">
        {value}
        <span className="text-xs font-normal px-2 flex items-center self-end mb-1">
          {percentageIncrease}{" "}
          {percentageIncrease && percentageIncrease > 0 ? (
            <LucideArrowUpRight height={14} />
          ) : (
            <LucideArrowDownLeft height={14} />
          )}{" "}
          in the last month
        </span>
      </p>
    </div>
  );
}
