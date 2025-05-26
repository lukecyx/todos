"use client";

import { Category } from "@prisma/client";
import { DateTime } from "luxon";
import { FormEvent, useActionState, useState } from "react";

import { submitTodo } from "~/actions/todos/submitTodo";

import ButtonInputs from "./CreateFormButtons";

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
            className="h-10 w-full rounded-sm border border-gray-300 bg-slate-100 font-bold text-gray-800 placeholder:text-gray-600  focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="h-10 w-full rounded-sm border  border-gray-300 bg-slate-100 text-sm text-gray-800 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="description"
            id="description"
            type="text"
            placeholder="Description"
          />
        </div>
        <ButtonInputs
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleOnChangeCategory={handleOnChangeCategory}
          categories={props.categories}
        />
        <div className="mt-8">
          <div className="flex justify-end space-x-2">
            <button
              className="w-28 rounded-sm border bg-zinc-200 p-2 font-semibold shadow-sm hover:bg-zinc-300  focus:outline-none  focus:ring-2 focus:ring-indigo-600"
              type="button"
              onClick={props.closeHandler}
            >
              Cancel
            </button>
            <button
              className="w-28 rounded-sm bg-indigo-400 p-2 font-semibold text-white shadow-sm hover:bg-indigo-500  focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
