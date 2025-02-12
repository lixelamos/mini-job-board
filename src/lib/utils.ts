
import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict, format } from "date-fns";
import { twMerge } from "tailwind-merge";

// Merge Tailwind CSS classes dynamically
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a number into a currency string (USD)
export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Get a human-readable relative date string
export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

// Format a date into a specific string format
export function formatDate(date: Date, dateFormat: string = "MM/dd/yyyy") {
  return format(date, dateFormat);
}

// Convert a string into a URL-friendly slug
export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

// Check if a user has an admin role
export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}