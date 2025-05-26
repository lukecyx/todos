"use server";

import { updateUniqueTodo } from "~/lib/todos";

export async function completeTodo(id: string) {
  return await updateUniqueTodo({ id }, { completed: true });
}
