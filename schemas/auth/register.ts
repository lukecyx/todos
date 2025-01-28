import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password cannot be greater than 32 charracters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password cannot be greater than 32 charracters"),
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password cannot be greater than 32 charracters"),
});
