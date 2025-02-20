import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

interface PageProps {
  params: { slug: string };
}
export default async function Page({ params }: PageProps) { // ✅ Use the correct type
  console.log("Params received:", params);

  const job = await prisma.job.findUnique({
    where: { slug: params.slug }, // ✅ Access params.slug correctly
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job?.job} />
      <AdminSidebar job={job?.job} />
    </main>
  );
}
