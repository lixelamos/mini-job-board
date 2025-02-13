import { Job } from "@prisma/client";
import { formatMoney, formatDate, relativeDate } from "@/lib/utils";
import Image from "next/image";
import CompanyLogoPlaceholder from "@/assets/logo.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Badge from "./Badge";

 
interface JobListItemProps {
  job: Job;
}

export default async function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
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
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
        {/* Add any additional elements here (e.g., apply button) */}
      </div>
    </article>
  );
}