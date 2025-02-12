
import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import H1 from "@/components/ui/h1";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import { metadata } from "./layout";

interface PageProps{
  searchParams:{
    q?:string;
    type?:string;
    location?:string;
    remote?:string;
  };
}

function getTitle({q,type,location,remote}:JobFilterValues){
  const titlePrefix=q
  ?`${q} jobs`
  :type
  ?`${type} developer Jobs for You`
  :remote
  ?"Remote Developer Jobs for You"
  :"All Developer Jobs for You";
  
  const titleSuffix=location? `in ${location}`: "";
  return `${titlePrefix} ${titleSuffix}`
  }

  export function generateMetadata({ searchParams }: PageProps): Metadata {
    const { q, type, location, remote } = searchParams; // Access properties inside the function
  
    return {
      title: `${getTitle({
        q,
        type,
        location,
        remote: remote === "true",
      })} | Job Finder`,
    };
  }
  

  export default async function Home({
     searchParams }
     : PageProps) {
    const { q, type, location, remote } = await searchParams; // Await searchParams  
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: String(remote) === "true",
  };


  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues}/>
      
  </section> 

  </main>
  );
}