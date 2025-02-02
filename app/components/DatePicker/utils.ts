import { type DateTime } from "luxon";

function getDateStringPart(dt: DateTime) {
  return dt.toString().split("T")[0];
}

export function getDays(now: DateTime) {
  const startOfMonth = now.startOf("month");
  const endOfMonth = now.endOf("month");
  const out = [];

  for (let i = 0; i < endOfMonth.day; i++) {
    const dt = startOfMonth.plus({ days: i });
    const dateStringPart = getDateStringPart(dt);
    // out.push({
    //   dateStringPart,
    //   ...dt.toObject(),
    // });
    out.push(dt);
  }

  if (startOfMonth.weekday != 1) {
    const daysToPad = startOfMonth.weekday - 1;
    for (let i = 0; i < daysToPad; i++) {
      const dt = startOfMonth.minus({ days: i + 1 });
      const dateStringPart = getDateStringPart(dt);
      out.unshift(dt);
      // out.unshift({
      //   dateStringPart,
      //   ...dt.toObject(),
      // });
    }
  }

  if (endOfMonth.weekday != 7) {
    const daysToPad = 7 - endOfMonth.weekday;
    for (let i = 0; i < daysToPad; i++) {
      const dt = endOfMonth.plus({ day: i + 1 });
      const dateStringPart = getDateStringPart(dt);
      // out.push({
      //   dateStringPart,
      //   ...dt.toObject(),
      // });
      out.push(dt);
    }
  }

  return out;
}

export function getWeeks(now: DateTime) {
  const days = getDays(now.startOf("month"));
  const out = [];

  while (days.length) {
    const week = days.splice(0, 7);
    out.push(week);
  }
  return out;
}

export function isInCurrentMonth(now: DateTime, selectedDay: DateTime) {
  return selectedDay.month === now.month;
}
