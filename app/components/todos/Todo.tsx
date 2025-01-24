import { z } from "zod";

import { createTodoSchema } from "~/schemas/todos";
import PlusIcon from "../icons/Plus";

type TodoProps = z.infer<typeof createTodoSchema>;

function Todo(props: TodoProps) {
  return (
    <div className="flex space-x-2 bg-slate-100 p-4">
      <div className="float-start flex pt-0.5">
        <input
          className="mt-1 h-4 rounded-full text-indigo-500 focus:ring-indigo-700"
          type="checkbox"
        />
      </div>
      <div className="mt-1 flex flex-col space-y-4">
        <div className="flex h-full flex-col">
          <span className="font-bold" role="heading" aria-level={2}>
            {props.title}
          </span>
          <p className="">{props.description}</p>
        </div>
        <div className="pr-4 pt-4">
          <button className="flex flex-row items-center  text-gray-600 hover:bg-slate-300 hover:text-gray-800">
            <PlusIcon className="h-4" />
            <span className="text-sm">Add sub-task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
