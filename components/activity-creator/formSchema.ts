import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Activity name should be atleast 3 chars" }),
  description: z.string().max(100).optional(),
  visibleFor: z.coerce.number().min(1).max(7),
});

export type FormInputs = z.infer<typeof formSchema>;
