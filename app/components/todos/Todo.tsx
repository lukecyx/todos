import { z } from "zod";

import { createTodoSchema } from "~/schemas/todos";
import PlusIcon from "../icons/Plus";

type TodoProps = z.infer<typeof createTodoSchema>;

function Todo(props: TodoProps) {
  return (
    <div className="flex flex-col bg-slate-100 p-4">
      <div className="flex space-x-2">
        <label htmlFor={`todo-${props.id}`} className="sr-only">
          Select Todo
        </label>
        {/* TODO: This input needs to clear the todo */}
        {/* I.e. it needs to mark it as completed */}
        <input
          id={`todo-${props.id}`}
          name="selectedTodo"
          type="checkbox"
          className="mt-1 h-4 rounded-full text-indigo-500 focus:ring-indigo-700"
        />
        <span>{props.title}</span>
      </div>
      <div className="ml-6 space-y-4">
        <p>{props.description}</p>
        <button
          type="button"
          className="flex flex-row items-center  text-gray-600 hover:bg-slate-300 hover:text-gray-800"
        >
          <PlusIcon className="h-4" />
          <span className="text-sm">Add sub-task</span>
        </button>
      </div>
    </div>
  );
}

export default Todo;
