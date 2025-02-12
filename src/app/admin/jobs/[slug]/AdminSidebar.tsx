"use client";

import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "./actions";
import Link from "next/link";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  console.log("AdminSidebar is rendering for job:", job); // Debug log

  return (
    <aside className="border p-4 bg-gray-100 rounded-md">
      <nav className="mb-4 space-y-2">
        <Link href="/candidate" className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center">
          Candidate Jobs
        </Link>
        <Link href="/company" className="block bg-purple-500 text-white p-2 rounded hover:bg-purple-600 text-center">
          Company Jobs
        </Link>
      </nav>

      {job.approved ? (
        <span className="text-center font-semibold text-green-500">Approved</span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className="mt-2">
      <input type="hidden" name="jobId" value={jobId} />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Approve
      </button>
      {formState?.error && <p className="text-sm text-red-500">{formState.error}</p>}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="mt-2">
      <input type="hidden" name="jobId" value={jobId} />
      <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
        Delete
      </button>
      {formState?.error && <p className="text-sm text-red-500">{formState.error}</p>}
    </form>
  );
}
