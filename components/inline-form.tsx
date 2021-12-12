import classNames from "classnames";
import React, { FC } from "react";
import Button, { ButtonProps } from "./button";
import Field, { FieldProps } from "./field";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  fieldProps: FieldProps;
  buttonProps: ButtonProps & { text: string };
}

const InlineForm: FC<FormProps> = ({
  fieldProps,
  buttonProps,
  className,
  ...props
}) => {
  const { text, ...buttonRest } = buttonProps;

  return (
    <form
      className={classNames(
        "flex items-end gap-6 p-6 rounded-lg bg-blue-300",
        className
      )}
      {...props}
    >
      <Field {...fieldProps} /> 
      <Button {...buttonRest}>{text}</Button>
    </form>
  );
};

export default InlineForm;
