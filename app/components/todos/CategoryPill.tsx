import clsx from "clsx";
import toTitleCase from "~/utils/titleCaseString";

type CategoryPillProps = {
  name: string;
};

export default function CategoryPill(props: CategoryPillProps) {
  return (
    <div
      className={clsx("rounded-lg pl-0.5 pr-0.5", {
        "bg-teal-300": props.name === "home",
        "bg-sky-300": props.name === "work",
        "bg-green-300": props.name === "fitness",
        "bg-yellow-300": props.name === "learning",
      })}
    >
      <span className="p-1 text-sm font-bold">{toTitleCase(props.name)}</span>
    </div>
  );
}
