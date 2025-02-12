import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma"; 
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobResultsProps{
    filterValues :JobFilterValues;
}




export default  async function JobResults({ 
    filterValues:{q,type,location,remote},
}:JobResultsProps){
        const searchString =q
        ?.split("")
        .filter(word=>word.length>0)
        .join("& ");
    
    const searchFilter:Prisma.JobWhereInput= searchString
    ?{
        OR:[
            {title:{search: searchString}},
            {companyName:{search: searchString}},
            {type:{search: searchString}},
            {location:{search: searchString}},
            {locationType:{search: searchString}},


        ],
    }:{};
    const where: Prisma.JobWhereInput={
        AND: [
            searchFilter,
            type?{type}:{},
            location?{location}:{},
            remote?{location:"Remote"}:{},
            {approved:true},
        ]
    }


    const jobs =await prisma.job.findMany({ 
        where: {approved:true},
        orderBy: {createdAt: "desc"},
      });
    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
                <JobListItem job={job}  />
                </Link>
            ))}
            {jobs.length === 0 && (
                <p className="text-center m-auto">No jobs found</p>
            )}
        </div>
    )
}