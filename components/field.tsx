import React, { FC } from "react";
import { FieldError } from "react-hook-form";
import Input, { InputProps } from "./input";

export interface FieldProps {
  label?: string;
  inputProps?: InputProps;
  type?: string;
  tip?: string;
  error?: FieldError;
}

const Field: FC<FieldProps> = ({ label, inputProps, type, tip, error }) => {
  return (
    <div className="flex flex-col flex-1 gap-0.5">
      {label && <label>{label}</label>}
      <Input type={type} {...inputProps} />
      {tip && <span className="text-gray-700 text-xs">{tip}</span>}
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  );
};
Field.displayName = "Field";

export default Field;
