"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveLink } from "~/utils";

type NavLinkProps = {
  label: string;
  href: string;
};

function NavLink(props: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      className={clsx(
        "pl-2 pr-2 text-xl font-semibold text-gray-800 decoration-4 hover:text-indigo-400 hover:underline hover:underline-offset-4 focus:outline-0 focus-visible:ring-2 focus-visible:ring-indigo-400 focus:outline-none",
        {
          "border-b-4 border-indigo-400 pb-2 transition-all": isActiveLink(
            pathname,
            props.href,
          ),
        },
      )}
      href={props.href}
    >
      {props.label}
    </Link>
  );
}

export default NavLink;
