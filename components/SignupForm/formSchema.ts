import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormInputs = z.infer<typeof formSchema>;
