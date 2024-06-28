import React, { useState, forwardRef } from 'react';

interface InputTextProps {
  type: "text" | "password" | "number";
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(({ type = "text", label, name, value, onChange }, ref) => {
  const [placeLabel, setPlaceLabel] = useState(false);
  return (
    <div className="relative flex flex-col ">
      <label
        htmlFor={name}
        className={` ml-3 ${
          placeLabel ? "translate-y-[-8px] text-xs text-primary-400" : "translate-y-3 text-md text-primary-200"
        } transition-all absolute `}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-primary-50 outline-none rounded-lg w-full py-2 pt-4 px-4 text-primary-600"
        onFocus={() => setPlaceLabel(true)}
        onBlur={(e) => { e.target.value === '' ? setPlaceLabel(false) : setPlaceLabel(true) }}
        ref={ref}
      />
    </div>
  );
});

export default InputText;
