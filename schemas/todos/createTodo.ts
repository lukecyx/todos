import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string(),
  category: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.enum(["home", "work", "fitness", "learning"]).optional(),
  ),
});
