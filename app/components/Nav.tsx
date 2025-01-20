"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const leftLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Todos",
    href: "/todos",
  },
];

const rightLinks = [
  {
    label: "My Account",
    href: "/register",
  },
];

function isActiveLink(pathname: string, href: string) {
  return pathname === href;
}

function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full  p-4">
      <div className="flex justify-between">
        <div className="flex flex-row">
          <ul className="flex flex-row space-x-4">
            {leftLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className={clsx(
                    "text-xl font-semibold text-gray-800 decoration-4 hover:text-indigo-600 hover:underline hover:underline-offset-4 focus:outline-0 focus-visible:ring-2 focus-visible:ring-indigo-600",
                    {
                      "border-b-4 border-indigo-600 pb-2 transition-all":
                        isActiveLink(pathname, link.href),
                    },
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <ul>
            {rightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className={clsx(
                    "text-xl font-semibold text-gray-800 decoration-4 hover:text-indigo-600 hover:underline hover:underline-offset-4 focus:outline-0 focus-visible:ring-2 focus-visible:ring-indigo-600",
                    {
                      "border-b-4 border-indigo-600 pb-2 transition-all":
                        isActiveLink(pathname, "/register"),
                    },
                  )}
                  href={link.href}
                >
                  Login
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );

  return (
    <nav className="bg-uk-bg-secondary w-full p-4">
      <div className="flex justify-between">
        <div className="flex flex-row">
          <ul className="flex flex-row space-x-4">
            {leftLinks.map((link) => (
              <li key={link.label}>
                <Link
                  className={clsx(
                    "text-semibold text-uk-link hover:text-uk-link-active focus-visible:bg-uk-focus text-2xl decoration-4 hover:underline hover:underline-offset-4 focus:outline-0",
                    {
                      "border-uk-link border-b-4 pb-4 transition-all":
                        isActiveLink(pathname, link.href),
                    },
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <ul>
            {rightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className={clsx(
                    "text-semibold text-uk-link hover:text-uk-link-active focus-visible:bg-uk-focus text-2xl decoration-4 hover:underline hover:underline-offset-4 focus:outline-0",
                    {
                      "border-uk-link border-b-4 pb-4 transition-all":
                        isActiveLink(pathname, "/myaccount"),
                    },
                  )}
                  href={link.href}
                >
                  My Account
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
