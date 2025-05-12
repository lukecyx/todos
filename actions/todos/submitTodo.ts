"use server";

import { redirect } from "next/navigation";

import { getCurrentUser } from "~/auth/auth";
import { db } from "~/db";
import { createTodoSchema } from "~/schemas/todos";

export async function submitTodo(_: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    throw new Error("No formData");
  }

  const todoObj = {
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
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

  redirect("/todos");
}
