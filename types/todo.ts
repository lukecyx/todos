import { z } from "zod";

import { createTodoSchema } from "~/schemas/todos";

// don't do this ??? why
export type createTodo = z.infer<typeof createTodoSchema>;

export type OptimisticTodo = {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: string;
  dueDate: string;
  completed: boolean;
};

export type SerialisedTodo = Omit<Todo, "createdAt" | "dueDate"> & {
  createdAt: string;
  dueDate: string;
};
