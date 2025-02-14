import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

// Define PageProps correctly
interface PageProps {
  params: { slug: string }; // Ensure params is correctly typed
}

export default async function Page({ params }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug }, // Use params.slug directly
  });

  if (!job) {
    notFound(); // Ensure notFound() is properly handled
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
