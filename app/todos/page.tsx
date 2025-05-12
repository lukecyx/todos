import { DateTime } from "luxon";

import { getCurrentUser } from "~/auth/auth";
import { db } from "~/db";

import ShowTodosForm from "../components/todos/ShowTodosForm";
import TodoList from "../components/todos/TodoList";

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

  return (
    <div className="ml-6 mt-4">
      <TodoList title="Overdue" todos={overdueTodos} />
      <TodoList title="Today" todos={todos} />
      <ShowTodosForm
        buttonText="Add task"
        buttonStyles="flex flex-row items-center  text-gray-600 hover:bg-slate-300 hover:text-gray-800 pr-1.5 pt-0.5 pb-0.5"
      />
    </div>
  );
}

export default TodoPage;
