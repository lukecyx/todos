import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});
