import { type Prisma } from "@prisma/client";

import { db } from "~/db";

export default async function createTodo(data: Prisma.TodoCreateInput) {
  return await db.todo.create({
    data,
    include: { createdBy: true, category: true },
  });
}
