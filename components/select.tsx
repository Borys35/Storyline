import classNames from "classnames";
import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {}

const Select: FC<Props> = ({ children, className, ...props }) => {
  return (
    <select
      className={classNames(
        "element block outline-none focusable rounded-lg bg-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
