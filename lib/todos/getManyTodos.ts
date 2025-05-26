import { type Prisma } from "@prisma/client";

import { db } from "~/db";

export default async function getManyTodos(
  args: Omit<Prisma.TodoFindManyArgs, "where"> & {
    where?: Prisma.TodoWhereInput;
  } = {},
) {
  return await db.todo.findMany(args);
}
