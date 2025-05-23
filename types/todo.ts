import { Todo } from "@prisma/client";
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
  category?: { name: string } | null;
};

// move to constants
export const TODO_CATEGORIES = ["home", "work", "fitness", "learning"] as const;

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  home: "teal-400",
  work: "indigo-800",
  fitness: "green-300",
  learning: "yellow-300",
} as const;
