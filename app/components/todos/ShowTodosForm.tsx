"use client";
import { useState } from "react";

import PlusIcon from "../icons/Plus";

import TodoForm from "./CreateTodoForm";

type ShowTodosFormProps = {
  buttonText: string;
  buttonTextStyles?: string;
  buttonStyles: string;
};

export default function ShowTodosForm(props: ShowTodosFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  function handleShowTodosForm() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      {!isVisible ? (
        // TODO: this button needs to come as a prop.
        <button
          type="button"
          className={props.buttonStyles}
          onClick={handleShowTodosForm}
        >
          <PlusIcon className="h-4" />
          <span className={props.buttonTextStyles}>{props.buttonText}</span>
        </button>
      ) : (
        <TodoForm closeHandler={handleShowTodosForm} />
      )}
    </>
  );
}
