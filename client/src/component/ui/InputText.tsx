import React, { useState, forwardRef, useEffect } from 'react';

interface InputTextProps {
  type: "text" | "password" | "number";
  label: string;
  name: string;
  value?: string;
  validate?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(({ type = "text", label, name, value, onChange, validate=false }, ref) => {
  const [placeLabel, setPlaceLabel] = useState(false);
  useEffect(()=>{
    setPlaceLabel(true)
  },[value])
  return (
    <div className="relative flex flex-col pt-5 ">
      <label
        htmlFor={name}
        className={`  ${
          placeLabel ? "translate-y-[-20px] text-xs text-primary-500" : "ml-3 translate-y-3 text-md text-neutral-400"
        } transition-all absolute `}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`bg-neutral outline-none rounded-lg w-full py-3  px-4 text-primary-200 focus:ring-4 focus:ring-primary-50 focus:border focus:border-primary-100 ${validate? 'ring-1 ring-red-200':''}`}
        onFocus={() => setPlaceLabel(true)}
        onBlur={(e) => { e.target.value === '' ? setPlaceLabel(false) : setPlaceLabel(true) }}
        ref={ref}
      />
    </div>
  );
});

export default InputText;
