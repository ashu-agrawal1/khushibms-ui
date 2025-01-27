import React from "react";

export default function InputBox({
  label,
  type,
  name,
  value,
  onChange,
  colspan,
  id,
}) {
  return (
    <div className={`col-span-${colspan || 2}`}>
      <label className="block text-lg font-medium text-white">
        {label || ""}
      </label>
      <input
        type={type || "text"}
        name={name || ""}
        value={value || ""}
        onChange={onChange || ""}
        id={id || ""}
        className="block w-full rounded-lg px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
    </div>
  );
}
