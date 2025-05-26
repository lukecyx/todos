import { type Prisma } from "@prisma/client";

import { db } from "~/db";

export default async function updateUniqueTodo(
  where: Prisma.TodoWhereUniqueInput,
  data: Prisma.TodoUpdateInput,
) {
  return await db.todo.update({
    where,
    data,
  });
}
