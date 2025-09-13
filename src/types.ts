import { z } from "zod"

export const AirtablePortraitFieldsSchema = z.object({
    Name: z.string().optional(),
    Summary: z.string().optional(),
    "Display Room": z.string().optional(),
    "Birth Year": z.string().optional(),
    "Medium of portrait": z.string().optional(),
    Gender: z.string().optional(),
    Link: z.string().optional(),
    Title: z.string().optional(),
  })

export type AirtablePortraitFields = z.infer<typeof AirtablePortraitFieldsSchema>