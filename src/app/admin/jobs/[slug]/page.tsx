import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

// Use Next.js' expected type for params
import type { PageProps } from "next";

export default async function Page({ params }: PageProps) {
  const { slug } = params as { slug: string }; // Explicitly cast params

  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) return notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
