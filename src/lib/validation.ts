import { z } from "zod";



export const JobFilterSchema=z.object({
    q:z.string().optional(),
    type:z.string().optional(),
    location:z.string().optional(),
    remote:z.string().optional(),

});

export type JobFilterValues=z.infer<typeof JobFilterSchema>;
