"use server";

import { createTodoSchema } from "~/schemas/todos";
import { db } from "~/db";
import { getCurrentUser } from "~/auth/auth";

export async function submitTodo(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("No formData");
  }

  const todoObj = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const result = createTodoSchema.safeParse(todoObj);

  if (!result.success) {
    return result.error.formErrors;
  }

  const user = await getCurrentUser();

  await db.todo.create({
    data: {
      ...result.data,
      createdBy: {
        connect: { id: user.id },
      },
    },
  });
}
