"use server";

import { db } from "~/db";

export async function completeTodo(id: string) {
  await db.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: true,
    },
  });
}
