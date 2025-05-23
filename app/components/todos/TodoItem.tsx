import { Todo as TodoPrisma } from "@prisma/client";

import CategoryPill from "./CategoryPill";

type Category = { name: string };
type TodoProps = Omit<
  TodoPrisma,
  "userId" | "createdAt" | "completed" | "dueDate" | "categoryId"
> & {
  deleteHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dueDate: string;
  category: Category | undefined | null;
};

function TodoItem(props: TodoProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex space-x-2">
        <label htmlFor={`todo-${props.id}`} className="sr-only">
          Select Todo
        </label>
        <div className="flex gap-x-2 align-middle">
          <input
            id={`todo-${props.id}`}
            name="selectedTodo"
            type="checkbox"
            value={props.id}
            className="mt-1 h-4 rounded-full text-indigo-500 focus:ring-indigo-700"
            onChange={props.deleteHandler}
          />
          {props.category && <CategoryPill name={props.category?.name} />}
          <span className="font-bold ">{props.title}</span>
        </div>
      </div>
      <div className="ml-6 space-y-4 p-2">
        <p className="text-sm">{props.description}</p>
      </div>
    </div>
  );
}

export default TodoItem;
