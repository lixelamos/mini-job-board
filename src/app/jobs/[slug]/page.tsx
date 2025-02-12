import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// Define the PageProps interface
interface PageProps {
  params: { slug: string }; // `params` is required
}

// Cache the job fetching function to avoid redundant database calls
const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  return job || null;
});

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Fetch the job data asynchronously
  const job = await getJob(params.slug);

  if (!job) {
    return { title: "Job Not Found" };
  }

  return { title: job.title }; // Set the page title to the job title
}

// Define the Page component
export default async function Page({ params }: PageProps) {
  // Fetch the job data asynchronously
  const job = await getJob(params.slug);

  if (!job) {
    console.error(`Job with slug "${params.slug}" not found.`);
    notFound();
  }

  const { applicationEmail, applicationUrl } = job;
  const applicationLink = applicationEmail ? `mailto:${applicationEmail}` : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email.");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} /> {/* Render the JobPage component with job data */}
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}