"use client";

import { DateTime } from "luxon";
import { getWeeks } from "./utils";
import clsx from "clsx";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import { useEffect, useState } from "react";

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
    <div className="w-72">
      <div className="mb-4 flex w-full space-x-2">
        <ChevronLeft
          onClick={onClickChevronLeft}
          role="button"
          aria-label="Go to previous month"
        />
        <span className="font-bold">{selectedDate?.toFormat("MMM yyyy")}</span>
        <ChevronRight
          onClick={onClickChevronRight}
          role="button"
          aria-label="Go to next month"
        />
      </div>
      <div className="flex space-x-2">
        {DAYS.map((day, idx) => (
          <div
            className="flex h-8 w-8 items-center justify-center  text-gray-500"
            key={idx}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-72">
        {weeks?.map((weeks, i) => (
          <div className="space-x-2 space-y-2" key={i}>
            {weeks.map((day, j) => (
              <button
                type="button"
                className={clsx("h-8 w-8 text-gray-800 hover:bg-gray-100", {
                  "rounded-full bg-indigo-500 text-white": false,
                })}
                onClick={onClickDay(day)}
                key={j}
              >
                <span
                  className={clsx("flex items-center justify-center", {
                    "rounded-full bg-indigo-500 text-white hover:bg-indigo-700":
                      highlightSelectedDay(
                        now,
                        selectedDay ? selectedDay : now,
                        day,
                      ),
                    "text-stone-400": day.month !== selectedDate?.month,
                  })}
                >
                  {day.day}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatePicker;
