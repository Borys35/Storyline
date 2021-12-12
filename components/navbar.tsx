import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC, useState } from "react";
import Button from "./button";

const Navbar: FC = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const navbarBody = (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      {!session ? (
        <>
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
          <Link href="/sign-up">
            <a>
              <Button>Sign up</Button>
            </a>
          </Link>
        </>
      ) : (
        <Link href="/my-profile">
          <a>{session.user?.name}</a>
        </Link>
      )}
    </>
  );

  return (
    <nav className="relative flex justify-between items-center bg-purple-600 text-white px-10 py-4">
      <Link href="/">
        <a>
          <h3 className="text-3xl font-bold">Storyline</h3>
        </a>
      </Link>

      {/* Desktop only */}
      <div className="hidden md:flex gap-4 items-center">{navbarBody}</div>

      {/* Phone & tablet only */}
      <div className="md:hidden flex gap-4 items-center">
        <span className="cursor-pointer" onClick={() => setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {open && (
        <div className="flex flex-col md:hidden gap-4 absolute top-full bg-purple-500 left-0 right-0 px-10 py-4 items-start">
          {navbarBody}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
