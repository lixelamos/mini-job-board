"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="px-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className="font-semibold underline">
          Admin Dashboard
        </Link>
        <div className="space-x-2">
          <button
            onClick={() => {
              // Redirect to homepage (can be adjusted if needed)
              window.location.href = "/";
            }}
            className="underline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
