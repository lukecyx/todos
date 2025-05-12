import { isUserLoggedIn } from "~/auth/auth";

import NavLink from "./NavLink";

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

async function Nav() {
  const userHasSession = await isUserLoggedIn();

  return (
    <nav className="w-full  p-4">
      <div className="flex justify-between">
        <div>
          <ul className="flex flex-row space-x-2">
            {leftLinks.map((link) => (
              <li key={link.label}>
                <NavLink label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <ul>
            <li>
              {userHasSession ? (
                <NavLink label="My Account" href={"/myaccount"} />
              ) : (
                <NavLink label="Login" href={"/login"} />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
