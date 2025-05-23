"use client";

import { SerialisedTodo } from "~/types/todo";

import CheckCircleIcon from "../icons/CheckCircle";

import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: SerialisedTodo[];
  title: string;
  handleTodoDelete: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TodoList(props: TodoListProps) {
  return (
    <div>
      {props.todos.length ? (
        <div>
          <h1 className="text-2xl font-bold">{props.title}</h1>
          <div className="flex">
            <div className="flex flex-row items-center">
              <CheckCircleIcon className="h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {props.todos.length} tasks
              </span>
            </div>
          </div>
          <div>
            {/* TODO: handle todos empty state */}
            {props.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description ?? null}
                dueDate={todo.dueDate}
                category={todo.category}
                deleteHandler={props.handleTodoDelete}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
