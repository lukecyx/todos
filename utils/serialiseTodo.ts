import { Todo } from "@prisma/client";

import { SerialisedTodo } from "~/types/todo";

export function serialiseTodo(todo: Todo): SerialisedTodo {
  return {
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    dueDate: todo.dueDate.toISOString(),
  };
}
