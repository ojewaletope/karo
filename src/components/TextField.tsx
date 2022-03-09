import React from "react";

interface TextFieldProps {
  type: string;
  className: string;
  placeholder: string;
  id: string;
  value: string | undefined;
  onChange: any;
  name: string;
  disabled?: boolean;
}
export const TextField = ({
  type,
  className,
  placeholder,
  id,
  value,
  name,
  onChange,
  disabled,
}: TextFieldProps) => {
  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};
