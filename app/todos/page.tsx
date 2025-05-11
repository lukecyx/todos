import TodoForm from "../components/todos/CreateTodoForm";
import Todo from "../components/todos/Todo";
import { db } from "~/db";
import { getCurrentUser } from "~/auth/auth";
import CheckCircleIcon from "../components/icons/CheckCircle";

async function TodoPage() {
  const user = await getCurrentUser();
  const todos = await db.todo.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <span className="text-2xl font-bold" role="heading" aria-level={1}>
          Today
        </span>
        <div className="flex">
          <div className="flex flex-row items-center">
            <CheckCircleIcon className="h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{todos.length} tasks</span>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: handle todos empty state */}
        {todos &&
          todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description ?? undefined}
            />
          ))}

        <TodoForm />
      </div>
    </div>
  );
}

export default TodoPage;
