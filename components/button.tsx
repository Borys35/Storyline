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
    "element py-2 px-6 rounded-md transition focusable " +
      "text-black inline-block font-bold",
    {
      "bg-primary text-white hover:brightness-110": primary,
      "bg-white hover:brightness-90": !primary,
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
      <Link href={to}>
        <a className={classes} {...props}>
          {children}
        </a>
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
