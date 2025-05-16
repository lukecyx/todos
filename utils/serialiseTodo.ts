import { Todo } from "@prisma/client";

export function serialiseTodo(todo: Todo) {
  return {
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    dueDate: todo.createdAt.toISOString(),
  };
}
