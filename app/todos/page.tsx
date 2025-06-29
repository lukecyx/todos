import { DateTime } from "luxon";

import { getCurrentUser } from "~/lib/auth/auth";
import { getAllCategories } from "~/lib/categories";
import { getManyTodos } from "~/lib/todos";
import { serialiseTodo } from "~/utils/serialiseTodo";

import TodoContent from "../components/Todos/TodoContent";

async function TodoPage() {
  const user = await getCurrentUser();

  const overdueTodos = await getManyTodos({
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

  const todos = await getManyTodos({
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

  const categories = await getAllCategories();

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
