import classNames from "classnames";
import { FC } from "react";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  basicStyling?: boolean;
}

const Form: FC<FormProps> = ({
  children,
  basicStyling = true,
  className,
  ...props
}) => {
  return (
    <form
      className={classNames(
        "flex flex-col gap-4 rounded-lg",
        { "element p-6 bg-blue-300": basicStyling },
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
