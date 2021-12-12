import classNames from "classnames";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className={classNames("border-t-2 border-gray-800 mx-10 py-4")}>
      <p className="text-center">
        &copy; {new Date().getFullYear()}, Borys Kaczmarek
      </p>
    </footer>
  );
};

export default Footer;
