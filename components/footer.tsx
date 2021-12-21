import classNames from "classnames";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer
      className={classNames(
        "element rounded-b-none rounded-t-3xl border-t-2 px-10 py-8 bg-sky-200"
      )}
    >
      <p className="text-center">
        &copy; {new Date().getFullYear()}, Borys Kaczmarek
      </p>
    </footer>
  );
};

export default Footer;
