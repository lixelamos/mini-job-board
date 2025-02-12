import { Metadata } from "next";
import AdminNavbar from "./AdminNavbar";

export const metadata: Metadata = {
  title: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
