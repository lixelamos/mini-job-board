import { Job } from "@prisma/client";
import Image from "next/image";
import CompanyLogoPlaceholder from "@/assets/logo.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns"; // For formatting the date

interface JobListItemProps {
  job: Job;
}

// Function to format salary
const formatMoney = (amount: number) => `$${amount.toLocaleString()}`;

// Function to format the "createdAt" date
const formatDate = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true }); // e.g., "3 days ago"
};

export default async function JobListItem({
  job: {
    title,
    companyName,
    location,
    description,
    salary,
    type,
    companyLogoUrl,
    createdAt,
    locationType,
  },
}: JobListItemProps) {
  return (
    <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || CompanyLogoPlaceholder}
        alt={companyName}
        width={80}
        height={80}
        className="rounded-lg self-center"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock size={16} className="shrink-0" />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        {/* Add any additional elements here (e.g., apply button) */}
      </div>
    </article>
  );
}