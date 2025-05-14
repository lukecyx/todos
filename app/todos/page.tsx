import { DateTime } from "luxon";

import { getCurrentUser } from "~/auth/auth";
import { db } from "~/db";

import TodoContent from "../components/todos/TodoContent";
import { serialiseTodo } from "~/utils/serialiseTodo";

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
  });

  const serialisedTodos = todos.map((todo) => serialiseTodo(todo));
  const serialisedOverdueTodos = overdueTodos.map((todo) =>
    serialiseTodo(todo),
  );

  return (
    <TodoContent
      iniitalTodayTodos={serialisedTodos}
      initialOverdueTodos={serialisedOverdueTodos}
    />
  );
}

export default TodoPage;
