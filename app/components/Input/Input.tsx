"use client";

interface OptionFieldsProps {
  label: string;
  value: string;
}

interface OptionsRequiredProps {
  value: boolean;
  message: string;
}

interface OptionsProps {
  optionFields?: OptionFieldsProps[];
  width?: number;
  required?: OptionsRequiredProps;
}

interface InputProps<T> {
  defaultValue: string;
  field: T;
  type?: string;
  options?: OptionsProps;
}

const Input = <T,>({ type, field, options }: InputProps<T>) => {
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
      input = input = (
        <input
          {...field}
          type="text"
          className={`w-[${options?.width || 100}%] rounded-xl p-2 text-black`}
        />
      );
      break;
  }

  return input;
};

export default Input;
