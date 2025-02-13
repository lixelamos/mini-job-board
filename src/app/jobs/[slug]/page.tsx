import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

// Define PageProps interface correctly
interface PageProps {
  params: { slug: string }; // Ensure params is correctly typed
}

// Cache the job fetching function to optimize performance
const getJob = cache(async (slug: string) => {
  return await prisma.job.findUnique({
    where: { slug },
  });
});

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const job = await getJob(params.slug);

  if (!job) {
    return { title: "Job Not Found" };
  }

  return { title: job.title }; // Set page title dynamically
}

// Define the Page component
export default async function Page({ params }: PageProps) {
  const job = await getJob(params.slug);

  if (!job) {
    console.error(`Job with slug "${params.slug}" not found.`);
    return notFound();
  }

  const { applicationEmail, applicationUrl } = job;
  const applicationLink = applicationEmail ? `mailto:${applicationEmail}` : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email.");
    return notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} /> {/* Pass job data to JobPage */}
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
