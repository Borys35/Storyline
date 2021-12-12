import classNames from "classnames";
import { FC } from "react";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  // ref: MutableRefObject<Element>;
}

const Form: FC<FormProps> = ({ children, className, ...props }) => {
  return (
    <form
      className={classNames(
        "flex flex-col gap-6 w-96 lg:w-4/12 p-6 rounded-lg bg-blue-300",
        className
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
