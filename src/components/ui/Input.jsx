/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

const Input = React.forwardRef(({ id, label, type, name, onChange, value, placeholder, required }, ref) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-semibold leading-6 text-gray-900 mb-2"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        autoComplete="off"
        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 mb-4"
      />
    </>
  );
});

export default Input;
