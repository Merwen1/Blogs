import React, { ChangeEventHandler, useEffect } from "react";
import { RegisterOptions } from "react-hook-form";

interface Props {
  value: string;
  name: string;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  pattern: string;
  type: string;
  maxLength: number;
  isRequired: boolean | false;
  register: (name: string, rules?: RegisterOptions | undefined) => void; // Adjust register function type
  validationRules?: RegisterOptions; // Add validation rules
}
const TextField = (props: Props) => {
  useEffect(() => {
    if (props.register && props.validationRules) {
      props.register(props.name, props.validationRules);
    } else {
      props.register(props.name); // If no validationRules provided, register without rules
    }
  }, [props.name, props.register, props.validationRules]);
  return (
    <>
      <input
        required={props.isRequired}
        className="flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border"
        type={props.type}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        pattern={props.pattern}
        onChange={props.handleChange}
        maxLength={props.maxLength}
        title="Enter this field please."
      />
    </>
  );
};

export default TextField;
