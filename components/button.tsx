import classNames from "classnames";
import Link from "next/link";
import React, { FC } from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  primary?: boolean;
  href?: string;
  to?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  primary = false,
  disabled = false,
  href,
  to,
  onClick,
  className,
  ...props
}) => {
  const classes = classNames(
    "py-2 px-6 rounded-md transition focus:ring-4 text-black inline-block",
    {
      "bg-blue-400 hover:bg-blue-500 focus:bg-blue-600": primary,
      "bg-white hover:bg-gray-100 focus:bg-gray-200": !primary,
      "opacity-40 pointer-events-none": disabled,
    },
    className
  );

  if (href)
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );

  if (to)
    return (
      <Link href={to} {...props}>
        <a className={classes}>{children}</a>
      </Link>
    );

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
