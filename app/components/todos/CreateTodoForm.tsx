"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Category } from "@prisma/client";
import clsx from "clsx";
import { DateTime } from "luxon";
import { FormEvent, useActionState, useState } from "react";

import { submitTodo } from "~/actions/todos/submitTodo";

import DatePicker from "../DatePicker/DatePicker";
import { parseRelativeSelectedDate } from "../DatePicker/utils";
import CalendarIcon from "../icons/Calendar";
import CheckIcon from "../icons/Check";
import FlagIcon from "../icons/Flag";

type TodoFormProps = {
  closeHandler: () => void;
  addTodoHandler: (formData: FormData) => void;
  categories: Category[];
};

function TodoForm(props: TodoFormProps) {
  const [prevState, action, pending] = useActionState(submitTodo, null); //eslint-disable-line
  const [selectedDate, setSelectedDate] = useState(DateTime.now().toString());
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDateChange = (newDate: DateTime) => {
    setSelectedDate(newDate.toString());
  };

  function handleOnSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.addTodoHandler(formData);
  }

  function handleOnChangeCategory(e: string): void {
    setSelectedCategory(e);
  }

  return (
    <div className="flex flex-col border bg-slate-50 shadow-md">
      <form className="p-4" onSubmit={handleOnSubmit}>
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
        <div className="flex">
          <input type="hidden" name="dueDate" value={selectedDate} />
          <Popover>
            {({ open }) => (
              <div className="relative">
                <PopoverButton className="pr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <div className="flex flex-row items-center space-x-2">
                    <CalendarIcon className="h-4" />
                    <span className="text-sm font-bold">
                      {parseRelativeSelectedDate(selectedDate) ?? "Today"}
                    </span>
                  </div>
                </PopoverButton>

                {open && (
                  <PopoverPanel className="absolute mt-2 w-80 rounded bg-white p-2 shadow focus:outline-none">
                    <DatePicker dateHandler={handleDateChange} autoFocusStart />
                  </PopoverPanel>
                )}
              </div>
            )}
          </Popover>
          <div>
            <Listbox
              value={selectedCategory}
              onChange={handleOnChangeCategory}
              name="category"
            >
              <ListboxButton>
                <div className="flex items-center p-0 text-sm font-bold">
                  <FlagIcon className="h-4" />
                  {selectedCategory ? selectedCategory : "Category"}
                </div>
              </ListboxButton>
              <ListboxOptions className="mt-2 w-28 space-y-2 rounded bg-white shadow-sm">
                {props.categories?.map((category) => (
                  <ListboxOption
                    className="w-full"
                    key={category.id}
                    value={category.name}
                  >
                    {({ selected, focus }) => (
                      <div
                        className={clsx(
                          "flex w-full cursor-default justify-between items-center px-2 py-1 text-center",
                          {
                            "bg-indigo-400 text-white cursor-pointer font-bold":
                              focus,
                          },
                        )}
                      >
                        <span className="w-4/5">{category.name}</span>
                        {selected && <CheckIcon className="h-4 w-4 flex-1" />}
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-end space-x-2">
            <button
              className="w-28 rounded-sm border bg-gray-200 p-2 font-semibold text-gray-800 shadow-sm hover:bg-gray-400  focus:outline-none  focus:ring-4 focus:ring-gray-400"
              type="button"
              onClick={props.closeHandler}
            >
              Cancel
            </button>
            <button
              className="w-28 rounded-sm bg-indigo-500 p-2 font-semibold text-white shadow-sm hover:bg-indigo-700  focus:outline-none focus:ring-4 focus:ring-indigo-700"
              type="submit"
            >
              {pending ? "Adding..." : "Add task"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
