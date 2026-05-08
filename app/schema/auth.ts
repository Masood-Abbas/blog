import z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(2).max(30),
});
