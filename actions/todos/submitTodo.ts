"use server";

import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getCurrentUser } from "~/auth/auth";
import { db } from "~/db";
import { createTodoSchema } from "~/schemas/todos";

type SubmitTodoSuccess = {
  success: true;
  data: Todo;
};

type PossibleFieldErrors = {
  title?: string[] | undefined;
  description?: string[] | undefined;
  dueDate?: string[] | undefined;
};

type SubmitTodoError = {
  success: false;
  formErrors: PossibleFieldErrors;
};

type SubmitTodoResponse = Promise<SubmitTodoSuccess | SubmitTodoError>;

export async function submitTodo(
  _: unknown,
  formData: unknown,
): SubmitTodoResponse {
  if (!(formData instanceof FormData)) {
    throw new Error("No formData");
  }

  const todoObj = {
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
    category: formData.get("category"),
  };

  const result = createTodoSchema.safeParse(todoObj);

  if (!result.success) {
    return { success: false, formErrors: result.error.flatten().fieldErrors };
  }

  const user = await getCurrentUser();

  const { category, ...rest } = result.data;

  const newTodo = await db.todo.create({
    data: {
      ...rest,
      createdBy: {
        connect: { id: user.id },
      },
      ...(category && {
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      }),
    },
    include: {
      category: true,
    },
  });

  revalidatePath("/todos");

  return { success: true, data: newTodo };
}
