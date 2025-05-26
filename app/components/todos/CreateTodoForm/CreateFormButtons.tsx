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

import toTitleCase from "~/utils/titleCaseString";

import { DatePicker } from "../../DatePicker";
import { parseRelativeSelectedDate } from "../../DatePicker/utils";
import CalendarIcon from "../../icons/Calendar";
import CheckIcon from "../../icons/Check";
import FlagIcon from "../../icons/Flag";

type CreateFormButtonsProps = {
  selectedCategory: string;
  selectedDate: string;
  handleDateChange: (newDate: DateTime) => void;
  handleOnChangeCategory: (e: string) => void;
  categories: Category[];
};

export default function ButtonInputs(props: CreateFormButtonsProps) {
  return (
    <div className="flex gap-1">
      <input type="hidden" name="dueDate" value={props.selectedDate} />
      <Popover>
        {({ open }) => (
          <div className="relative">
            <PopoverButton className="rounded border p-1.5 pr-2  shadow-sm hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <div className="flex flex-row items-center space-x-2">
                <CalendarIcon className="h-4" />
                <span className="text-sm font-bold">
                  {parseRelativeSelectedDate(props.selectedDate) ?? "Today"}
                </span>
              </div>
            </PopoverButton>

            {open && (
              <PopoverPanel className="absolute mt-2 w-80 rounded bg-white p-2 shadow focus:outline-none">
                <DatePicker
                  dateHandler={props.handleDateChange}
                  autoFocusStart
                />
              </PopoverPanel>
            )}
          </div>
        )}
      </Popover>
      <div>
        <Listbox
          value={props.selectedCategory}
          onChange={props.handleOnChangeCategory}
          name="category"
        >
          <ListboxButton className="rounded border p-1.5 shadow-sm hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <div className="flex items-center p-0 text-sm font-bold">
              <FlagIcon className="h-4" />
              {props.selectedCategory
                ? toTitleCase(props.selectedCategory)
                : "Category"}
            </div>
          </ListboxButton>
          <ListboxOptions className="mt-2 w-28 space-y-2 rounded bg-white shadow-sm">
            {props.categories?.map((category) => (
              <ListboxOption
                className="w-full rounded-3xl"
                key={category.id}
                value={category.name}
              >
                {({ selected, focus }) => (
                  <div
                    className={clsx(
                      "flex w-full cursor-default px-2 py-1 justify-center rounded",
                      {
                        "bg-indigo-400 text-white cursor-pointer font-bold":
                          focus,
                      },
                    )}
                  >
                    {toTitleCase(category.name)}
                    {selected && <CheckIcon className="h-4 w-4 flex-1" />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}
