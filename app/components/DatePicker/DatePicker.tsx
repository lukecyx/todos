"use client";

import clsx from "clsx";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";

import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";

import { getWeeks } from "./utils";

// TODO: Refactor so it's sensible
function highlightSelectedDay(
  initialDay: DateTime,
  selectedDate: DateTime,
  renderingDate: DateTime,
) {
  if (selectedDate) {
    return (
      selectedDate.day === renderingDate.day &&
      selectedDate.month === renderingDate.month
    );
  }

  return (
    initialDay.day === renderingDate.day &&
    initialDay.month === renderingDate.month
  );
}

type DatePickerProps = {
  dateHandler: (dt: DateTime) => void;
  autoFocusStart?: boolean;
};

export default function DatePicker(props: DatePickerProps) {
  const DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;
  const now = DateTime.now();

  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
  const [focusedDate, setFocusedDate] = useState<DateTime | null>(null);
  const [weeks, setWeeks] = useState<ReturnType<typeof getWeeks>>(
    getWeeks(DateTime.now()),
  );
  const [selectedDay, setSelectedDay] = useState<DateTime | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const focusedDateRef = useRef<DateTime | null>(null);
  const leftChevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, [focusedDate]);

  useEffect(() => {
    if (props.autoFocus && leftChevronRef.current) {
      leftChevronRef.current?.focus();
    }
  }, [props.autoFocus]);

  function onClickChevronLeft() {
    setSelectedDate((prev) => {
      const newDate = prev!.minus({ month: 1 });
      setWeeks(getWeeks(newDate));
      return newDate;
    });
  }

  function onKeyDownChevronLeft(e: React.KeyboardEvent<SVGSVGElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      setSelectedDate((prev) => {
        const newDate = prev!.minus({ month: 1 });
        setWeeks(getWeeks(newDate));
        return newDate;
      });
    }
  }

  function onClickChevronRight() {
    setSelectedDate((prev) => {
      const newDate = prev!.plus({ month: 1 });
      setWeeks(getWeeks(newDate));
      return newDate;
    });
  }

  function onKeyDownChevronRight(e: React.KeyboardEvent<SVGSVGElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      setSelectedDate((prev) => {
        const newDate = prev!.minus({ month: 1 });
        setWeeks(getWeeks(newDate));
        return newDate;
      });
    }
  }

  function onClickDay(dt: DateTime) {
    return function () {
      focusedDateRef.current = dt;
      setFocusedDate(dt);
      setSelectedDay(dt);
      props.dateHandler(dt);
    };
  }

  function handleCalendarKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const navigationKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Enter",
    ];

    if (!navigationKeys.includes(e.key)) {
      return;
    }

    e.preventDefault();

    // Default to selectedDate to do calcs on
    let newDate = selectedDate;

    // Use a temporary focus date to handle the focus date
    // being null when the datepicker first opens.
    let tmpFocusedDate;
    if (!focusedDate) {
      tmpFocusedDate = selectedDate;
    } else {
      tmpFocusedDate = focusedDate;
    }

    switch (e.key) {
      case "ArrowLeft":
        newDate = tmpFocusedDate.minus({ days: 1 });

        break;
      case "ArrowRight":
        newDate = tmpFocusedDate.plus({ days: 1 });

        break;
      case "ArrowUp":
        newDate = tmpFocusedDate.minus({ weeks: 1 });

        break;

      case "ArrowDown":
        newDate = tmpFocusedDate.plus({ weeks: 1 });
        break;

      case "Enter":
        newDate = tmpFocusedDate;
        setSelectedDay(newDate);
        props.dateHandler(newDate);

        break;

      default:
        return;
    }

    if (newDate.month !== focusedDate?.month) {
      setWeeks(getWeeks(newDate));
    }

    focusedDateRef.current = newDate;
    setFocusedDate(newDate);
  }

  function onClickResetToday() {
    const now = DateTime.now();
    focusedDateRef.current = now;
    setFocusedDate(now);
    setSelectedDay(now);
    props.dateHandler(now);
  }

  return (
    <div className="space-y-2">
      <div className="mb-4 flex items-center">
        {/* TODO: Wrap chevrons in buttons */}
        <ChevronLeft
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ref={leftChevronRef}
          onClick={onClickChevronLeft}
          onKeyDown={onKeyDownChevronLeft}
          role="button"
          aria-label="Go to previous month"
          tabIndex={0}
        />
        <span className="font-bold">{selectedDate?.toFormat("MMM yyyy")}</span>
        <ChevronRight
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={onClickChevronRight}
          onKeyDown={onKeyDownChevronRight}
          role="button"
          aria-label="Go to next month"
          tabIndex={0}
        />
        {}
        <button
          className="flex-1 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="button"
          onClick={onClickResetToday}
        >
          Reset to today
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day, idx) => (
          <div
            className="flex h-8 w-8 items-center justify-center font-medium text-gray-500"
            key={idx}
          >
            {day}
          </div>
        ))}
      </div>
      <div
        role="grid"
        className="grid grid-cols-7 gap-2"
        onKeyDown={handleCalendarKeyDown}
      >
        {weeks?.map((week, i) =>
          week.map((day, j) => {
            const isFocusedDate = focusedDate?.hasSame(day, "day");
            const enableTabIndex = () => {
              console.log("focusedDate", focusedDate);
              console.log(selectedDay?.hasSame(day, "day"));
              if (!focusedDate) {
                return now.hasSame(day, "day") ? 0 : -1;
              }

              return isFocusedDate ? 0 : -1;
            };
            return (
              <button
                type="button"
                role="gridcell"
                tabIndex={enableTabIndex()}
                ref={isFocusedDate ? buttonRef : null}
                aria-selected={selectedDay?.hasSame(day, "day")}
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500",
                  {
                    "rounded-full bg-indigo-500 text-white":
                      highlightSelectedDay(
                        now,
                        selectedDay ? selectedDay : now,
                        day,
                      ),

                    "text-stone-400": day.month !== selectedDate?.month,
                    "ring-2 ring-indigo-500": isFocusedDate,
                  },
                )}
                onClick={onClickDay(day)}
                key={`${i}-${j}`}
              >
                {day.day}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
