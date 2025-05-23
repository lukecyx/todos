import { DateTime } from "luxon";

import { getCurrentUser } from "~/auth/auth";
import { db } from "~/db";
import { serialiseTodo } from "~/utils/serialiseTodo";

import TodoContent from "../components/todos/TodoContent";

async function TodoPage() {
  const user = await getCurrentUser();
  const overdueTodos = await db.todo.findMany({
    where: {
      userId: user.id,
      dueDate: {
        lt: DateTime.local().startOf("day").toJSDate(),
      },
      completed: false,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const todos = await db.todo.findMany({
    where: {
      userId: user.id,
      dueDate: {
        gte: DateTime.local().startOf("day").toJSDate(),
        lte: DateTime.local().endOf("day").toJSDate(),
      },
      completed: false,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categories = await db.category.findMany({});

  const serialisedTodos = todos.map((todo) => serialiseTodo(todo));
  const serialisedOverdueTodos = overdueTodos.map((todo) =>
    serialiseTodo(todo),
  );

  return (
    <TodoContent
      iniitalTodayTodos={serialisedTodos}
      initialOverdueTodos={serialisedOverdueTodos}
      categories={categories}
    />
  );
}

export default TodoPage;
