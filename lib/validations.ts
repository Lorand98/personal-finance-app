import { z } from "zod";
import { TRANSACTION_CATEGORIES } from "./constants";

export const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const newTransactionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  category: z.enum(TRANSACTION_CATEGORIES),
  date: z.string(),
  amount: z.number().refine((val) => val !== 0, {
    message: "Amount must not be 0",
  }),
  recurring: z.boolean(),
});
