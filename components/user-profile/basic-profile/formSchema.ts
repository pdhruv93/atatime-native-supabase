import { z } from "zod";

export const formSchema = z.object({
  displayName: z.string().trim().min(1, { message: "Required" }).max(20),
  bio: z.string().trim().max(100).optional(),
  age: z.coerce
    .number()
    .min(14, { message: "You should be atleast 14years old to use" })
    .optional(),
  whatsappNumber: z.string().trim().max(15).optional(),
  instagramHandle: z.string().trim().max(30).optional(),
});

export type FormInputs = z.infer<typeof formSchema>;
