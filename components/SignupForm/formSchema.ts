import { z } from "zod";

export const formSchema = z.object({
  displayName: z.string().trim().min(1, { message: "Required" }).max(50),
  email: z.string().email(),
});

export type FormInputs = z.infer<typeof formSchema>;
