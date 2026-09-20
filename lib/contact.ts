import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please add your name.").max(80),
  email: z.string().trim().email("Please use a valid email address.").max(120),
  message: z.string().trim().min(20, "Tell me a little more (at least 20 characters). ").max(3000),
  company: z.string().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
