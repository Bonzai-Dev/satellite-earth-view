import { forwardRef } from "react";

export interface InputProps {
  title: string;
  type: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ title, type, placeholder }, ref) => {
    return (
      <div>
        <p>{title}</p>
        <input
          ref={ref}
          className="rounded-md ml-3 text-gray-800"
          type={type}
          defaultValue={"25544"}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default Input;
