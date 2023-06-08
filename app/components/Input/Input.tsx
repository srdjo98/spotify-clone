"use client";

interface OptionFieldsProps {
  label: string;
  value: string;
}

interface InputProps {
  type: string;
  defaultValue: string;
  field: any;
  options?: {
    optionFields?: OptionFieldsProps[];
    width?: number;
    required?: {
      value: boolean;
      message: string;
    };
  };
}

const Input = ({ type, field, options }: InputProps) => {
  let input;

  switch (type) {
    case "checkbox":
      input = (
        <input
          {...field}
          type="checkbox"
          className={`w-[${options?.width || 100}%] rounded-xl p-2 text-black`}
        />
      );
      break;
    case "radio":
      input = (
        <input
          {...field}
          type="radio"
          v
          className={`w-[${options?.width || 100}%] rounded-xl p-2 text-black`}
        />
      );
      break;
    case "text":
      input = (
        <input
          {...field}
          type="text"
          className={`w-[${options?.width || 100}%] rounded-xl p-2 text-black`}
        />
      );
      break;
    case "select":
      input = (
        <select
          {...field}
          className={`w-[${options?.width || 100}%] rounded-xl p-2 text-black`}
        >
          <option value="">Select</option>
          {options?.optionFields &&
            options.optionFields.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      );
      break;
    default:
      input = null;
  }

  return input;
};

export default Input;
