import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = z
  .union([z.string().regex(/^\d+$/, "Must be a number").max(9, "Number can't be longer than 9 digits"), z.string().length(0)]);

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine(
    (file) => !file || file.size < 1024 * 1024 * 2,
    "File must be less than 2MB"
  );

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.string().length(0)),
    applicationUrl: z.string().max(100).url().optional().or(z.string().length(0)),
  })
  .refine(
    (data) => data.applicationEmail || data.applicationUrl,
    {
      message: "Email or URL is required",
      path: ["applicationEmail"],
    }
  );

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) => data.locationType === "Remote" || data.location,
    {
      message: "Location is required",
      path: ["location"],
    }
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine((value) => jobTypes.includes(value), "Invalid Job type"),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    salary: numericRequiredString,
    description: z.string().max(1000),})
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const JobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof JobFilterSchema>;
