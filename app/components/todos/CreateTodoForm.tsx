"use client";

import { Popover } from "@headlessui/react";
import { DateTime } from "luxon";
import { useActionState, useState } from "react";

import { submitTodo } from "~/actions/todos/submitTodo";

import DatePicker from "../DatePicker/DatePicker";
import CalendarIcon from "../icons/Calendar";

type TodoFormProps = {
  closeHandler: () => void;
};

function TodoForm(props: TodoFormProps) {
  const [prevState, action, pending] = useActionState(submitTodo, null);
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (newDate: DateTime) => {
    setSelectedDate(newDate.toString());
  };

  return (
    <div className="flex flex-col border bg-slate-50 shadow-md">
      <form className="p-4" action={action}>
        <div className="mb-8 space-y-2">
          <label className="sr-only" htmlFor="title">
            Title
          </label>
          <input
            className="h-10 w-full rounded-sm border border-gray-300 bg-slate-100 font-bold text-gray-800 placeholder:text-gray-600  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            name="title"
            id="title"
            type="text"
            required
            placeholder="Wash the dishes"
          />
          <label className="sr-only" htmlFor="description">
            Description
          </label>
          <input
            className="h-10 w-full rounded-sm border  border-gray-300 bg-slate-100 text-sm text-gray-800 placeholder:text-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            name="description"
            id="description"
            type="text"
            placeholder="Description"
          />
        </div>
        <input type="hidden" name="dueDate" value={selectedDate} />
        <Popover>
          <Popover.Button>
            <div className="flex flex-row items-center space-x-2">
              <CalendarIcon className="h-4" />
              <span className="text-sm font-bold">
                {DateTime.fromISO(selectedDate).toRelative()}
              </span>
            </div>
          </Popover.Button>
          <Popover.Panel className="w-80 p-2 shadow">
            <DatePicker dateHandler={handleDateChange} />
          </Popover.Panel>
        </Popover>

        <div className="mt-8">
          <div className="flex justify-end space-x-2">
            <button
              className="w-28 rounded-sm border bg-gray-200 p-2 font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus:border-gray-400 focus:outline-gray-400 focus:ring-4 focus:ring-gray-400"
              type="button"
              onClick={props.closeHandler}
            >
              Cancel
            </button>
            <button
              className="w-28 rounded-sm bg-indigo-500 p-2 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:border-indigo-700 focus:outline-indigo-700 focus:ring-4 focus:ring-indigo-700"
              type="submit"
            >
              Add task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
