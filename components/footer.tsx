import classNames from "classnames";
import { FC } from "react";
import Logo from "./logo";

const Footer: FC = () => {
  return (
    <footer
      className={classNames(
        "element rounded-b-none rounded-t-3xl border-t-2 py-8 bg-sky-200"
      )}
    >
      <div className="max-w mx-auto flex flex-col px-hor">
        <div className="flex justify-between md:items-center">
          <Logo />
          <div className="flex flex-col md:flex-row items-start gap-4">
            <a href="mailto:boryskac10@gmail.com" className="link font-bold">
              E-mail
            </a>
            <a
              href="https://borys35.github.io/"
              target="_blank"
              className="link font-bold"
              rel="noreferrer"
            >
              Personal Website
            </a>
            <a
              href="https://github.com/Borys35/Storyline"
              target="_blank"
              className="link font-bold"
              rel="noreferrer"
            >
              Project Repo
            </a>
          </div>
        </div>
        <p className="mt-4">
          &copy; {new Date().getFullYear()}, Borys Kaczmarek
        </p>
      </div>
    </footer>
  );
};

export default Footer;
