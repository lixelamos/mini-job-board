import {Label } from "./ui/label";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/job-types";
import { JobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formsData: FormData){
    "use server";
    const values=Object.fromEntries(formsData.entries());
    const {q,type,location,remote}=JobFilterSchema.parse(values);
    const searchParams=new URLSearchParams({
        ...(q &&{q:q.trim()}),
        ...(type &&{type}),
        ...(location &&{location}),
        ...(remote &&{remote}),
    });

    redirect(`/?${searchParams.toString()}`);
}
export default async function JobFilterSidebar() {  
    const distinctLocations = (await prisma.job
        .findMany({
        where: { approved: true }, 
        select: { location: true },
        distinct: ["location"],
    })

   .then((locations) =>
     locations.map(({ location }) => location).filter(Boolean),
    )) as string[];


    return(
        <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">      
          <form action={filterJobs}>
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
        <Label htmlFor="q"> Search </Label>
        <Input id ="q" name ="q" placeholder="Title,Company,etc"></Input>  
        </div>
            <div className="flex flex-col gap-2"  >
                <Label htmlFor="type">Type</Label>
                <Select id ="type" name="type" defaultValue="">
                    {jobTypes.map((type) => (
                        <option key={type} value={type}> 
                        {type}
                        </option>
                    ))}
                </Select>

            </div>
         
        <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select  id ="location" name="location" defaultValue="">
            <option>All locations</option>
            {distinctLocations.map((location) => (
                <option key={location} value={location}> 
                {location}
                </option>
            ))}
            </Select>
        </div>
            <div className="flex items-centre gap-2">
                <input
                id="remote"
                name="remote"
                type="checkbox"
                className="scale-125 accent-black"
                />
                <Label htmlFor="">Remote jobs</Label>  
                </div>
            <Button type="submit" className="w-full">
                Filter jobs
            </Button>
        </div>
        </form>
   </aside>
    );
}