import React from "react";

interface RadioProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({ name, value, label, checked, onChange }) => {
  return (
    <label className="flex gap-2 items-center">
      <div className="grid place-items-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer
            col-start-1 row-start-1
            appearance-none shrink-0
            w-6 h-6 border-4 border-primary-100 rounded-full
            focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-primary-300
            disabled:border-gray-400
          "
        />
        <div className="col-start-1 row-start-1 w-2 h-2 rounded-full peer-checked:bg-primary-400" />
      </div>
      {label}
    </label>
  );
};

export default Radio;
