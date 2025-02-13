import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

// Ensure Next.js correctly recognizes PageProps
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) return notFound(); // Ensure `notFound()` is properly returned

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
