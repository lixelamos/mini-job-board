
import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import H1 from "@/components/ui/h1";
export default async function Home(){
  const jobs =await prisma.job.findMany({
    where: {approved:true},
    orderBy: {createdAt: "desc"},
  });
  return (
    <main className="max -w5x1 m-auto px-3 my-10 space-y-10 px-5">
<div className="space-y-5 text-center">
  <H1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
    Developer Jobs for You
  </H1>
<p className ="text-muted-foreground">Find your next job</p>
</div>
      <section className ="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar />
        < div className="space y-4 grow">
            {jobs.map((job) => (
    < JobListItem job={job} key={job.id} />
  ))}
  </div>
  </section> 

  </main>
  )
}