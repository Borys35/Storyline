import classNames from "classnames";
import React, { FC } from "react";

export interface InputProps {}

const Input: FC<any> = React.forwardRef(({ type, ...props }, ref) => {
  if (type === "textarea")
    return (
      <textarea
        ref={ref}
        type={type}
        className="outline-none focus:ring-4 rounded-lg px-4 py-2"
        {...props}
      ></textarea>
    );

  return (
    <input
      ref={ref}
      type={type}
      className={classNames("outline-none focus:ring-4 rounded-lg px-4 py-2", {
        "w-fit": type === "checkbox" || type === "radio",
      })}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
