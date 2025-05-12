"use client";

import clsx from "clsx";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

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

function DatePicker({ dateHandler }) {
  const DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;
  const now = DateTime.now();
  // const weeks = getWeeks(now);

  // TODO: Reset to now;
  const [canonicalDate, setCanonicalDate] = useState<DateTime | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [weeks, setWeeks] = useState<ReturnType<typeof getWeeks> | null>(null);
  const [selectedDay, setSelectedDay] = useState<DateTime | null>(null);

  useEffect(() => {
    const now = DateTime.now();
    setCanonicalDate(now);
    setSelectedDate(now);
    setWeeks(getWeeks(now));
  }, []);

  function onClickChevronLeft() {
    // Don't allow to set TODOs in the past.
    if (selectedDate!.month <= now.month) {
      return;
    }

    setSelectedDate((prev) => {
      const newDate = prev!.minus({ month: 1 });
      setWeeks(getWeeks(newDate));
      return newDate;
    });
  }

  function onClickChevronRight() {
    setSelectedDate((prev) => {
      const newDate = prev!.plus({ month: 1 });
      setWeeks(getWeeks(newDate));
      return newDate;
    });
  }

  function onClickDay(dt: DateTime) {
    return function () {
      setSelectedDay(dt);
      dateHandler(dt);
    };
  }

  return (
    <div className="space-y-2">
      <div className="mb-4 flex items-center">
        <ChevronLeft
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={onClickChevronLeft}
          role="button"
          aria-label="Go to previous month"
          tabIndex={0}
        />
        <span className="font-bold">{selectedDate?.toFormat("MMM yyyy")}</span>
        <ChevronRight
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={onClickChevronRight}
          role="button"
          aria-label="Go to next month"
          tabIndex={0}
        />
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
      <div className="grid grid-cols-7 gap-2">
        {weeks?.map((week, i) =>
          week.map((day, j) => (
            <button
              type="button"
              className={clsx(
                "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                {
                  "rounded-full bg-indigo-500 text-white": highlightSelectedDay(
                    now,
                    selectedDay ? selectedDay : now,
                    day,
                  ),

                  "text-stone-400": day.month !== selectedDate?.month,
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500": true,
                },
              )}
              onClick={onClickDay(day)}
              key={`${i}-${j}`}
            >
              {day.day}
            </button>
          )),
        )}
      </div>
    </div>
  );
}

export default DatePicker;
