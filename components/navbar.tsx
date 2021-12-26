import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import Button from "./button";
import Logo from "./logo";

const Navbar: FC = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  const navbarBody = (
    <>
      <Link href="/">
        <a className="link">Home</a>
      </Link>
      <Link href="/discover">
        <a className="link">Discover</a>
      </Link>
      {!session ? (
        <>
          <Link href="/sign-in">
            <a className="link">Sign in</a>
          </Link>
          <Link href="/sign-up">
            <a>
              <Button>Sign up</Button>
            </a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/create-story">
            <a className="link">Create story</a>
          </Link>
          <Link href={`/profile/${session.user?.id}`}>
            <a className="link flex items-center gap-2">
              <p>{session.user?.name}</p>
              {session.user && (
                <Image
                  className="element"
                  src={session.user?.image}
                  alt="Avatar"
                  width={24}
                  height={24}
                />
              )}
            </a>
          </Link>
        </>
      )}
    </>
  );

  useEffect(() => {
    let prevScrollY = 0;
    function handleScroll(e: Event) {
      setShow(window.scrollY < prevScrollY);
      prevScrollY = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={classNames(
        "element fixed font-bold bg-teal-400 left-10 right-10 py-4 z-40 transition-all duration-300",
        { "top-4": show },
        { "-top-72": !show }
      )}
    >
      <div className="max-w flex justify-between items-center mx-auto px-hor 2xl:px-0">
        {/* <Link href="/">
        <a>
          <h3 className="text-3xl font-bold">Storyline</h3>
        </a>
      </Link> */}
        <Logo />

        {/* Desktop only */}
        <div className="hidden lg:flex gap-6 items-center">{navbarBody}</div>

        {/* Phone & tablet only */}
        <div className="lg:hidden flex gap-6 items-center">
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
      </div>

      {/* {open && ( */}
      <div
        className={classNames(
          "absolute z-50 top-full left-0 right-0 overflow-hidden transition-all lg:hidden duration-500",
          { "max-h-0": !open },
          { "max-h-60": open }
        )}
      >
        <div
          className={classNames(
            "element flex flex-col gap-6 mt-3 bg-teal-300 px-hor py-4 " +
              "items-start"
            // { "scale-y-0": !open },
            // { "scale-y-100": open }
          )}
        >
          {navbarBody}
        </div>
      </div>
      {/* // )} */}
    </nav>
  );
};

export default Navbar;
