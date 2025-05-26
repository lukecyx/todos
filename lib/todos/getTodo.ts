import { type Prisma } from "@prisma/client";

import { db } from "~/db";

export default async function getUniqueTodo(
  where: Prisma.TodoWhereUniqueInput,
) {
  return await db.todo.findFirst({ where });
}
