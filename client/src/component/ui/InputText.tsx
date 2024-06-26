import { useState } from "react";

interface InputTextProps {
  type: "text" | "password" | "number";
  label: string;
  name: string;
}

const InputText = ({ type = "text", label, name }: InputTextProps) => {
  const [placeLabel, setPlaceLabel] = useState(false);
  return (
    <div className="relative flex flex-col ">
      <label
        htmlFor={name}
        className={` ml-3   ${
          placeLabel ? "translate-y-[-8px] text-xs text-primary-400" : "translate-y-3 text-md text-primary-200"
        } transition-all absolute `}
      >
        {label}
      </label>
      <input
        type={type}
        className=" bg-primary-50 outline-none rounded-lg w-full py-2 pt-4 px-4 text-primary-600"
        onFocus={() => setPlaceLabel(true)}
        onBlur={(e) => { e.target.value === ''? setPlaceLabel(false): setPlaceLabel(true)}}
      />
    </div>
  );
};

export default InputText;
