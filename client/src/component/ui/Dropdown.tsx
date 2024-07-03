import { useRef, useState, useEffect, useCallback } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { FiCheck, FiChevronDown } from "react-icons/fi";

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface DropdownProps {
  id?: string;
  title: string;
  data: DropdownItem[];
  onChange: (value: string | undefined) => void;
  validate?: boolean;
}

const Dropdown = ({
  title,
  data,
  onChange,
  validate = true,
}: DropdownProps) => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useClickOutside({
    ref: dropdownRef,
    callback: () => setIsOpen(false),
  });

  const handleChange = useCallback((item: DropdownItem | null) => {
      setSelectedItem(item);
      onChange(item?.name);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen && event.key === "ArrowDown") {
      setIsOpen(true);
      setFocusedIndex(0);
      event.preventDefault();
      return;
    }

    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        setFocusedIndex((prev) => Math.min(prev + 1, data.length));
        break;
      case "ArrowUp":
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        const selectedItem = focusedIndex === 0 ? null : data[focusedIndex - 1];
        handleChange(selectedItem);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const listItem = listRef.current.children[focusedIndex] as HTMLElement;
      listItem?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`relative pt-5`}
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <button
        className={`bg-white outline-none rounded-lg py-3 px-3 w-full text-left flex items-center justify-between text-primary-200 focus:border-primary-100 focus:ring-4 focus:ring-primary-50 ${
          isOpen && "bg-white border border-primary-100 ring-4 ring-primary-50"
        } ${selectedItem && "text-primary-600 "} ${
          validate ? "ring-1 ring-red-200" : ""
        }`}
        onClick={handleButtonClick}
      >
        {selectedItem?.name || title}
        <FiChevronDown />
      </button>
      {isOpen && (
        <div
          className={`absolute left-0 top-full z-10 w-full rounded-b-xl bg-white min-h-20 -translate-y-1 border-t border-primary-50 ${
            isOpen &&
            "bg-white border border-primary-100 ring-4 ring-primary-50"
          }`}
        >
          <ul ref={listRef}>
            <li
              className={`p-3 hover:bg-primary-50/30 ${
                focusedIndex === 0 ? "bg-primary-50/30" : ""
              }`}
              onClick={() => handleChange(null)}
            >
              Select
            </li>
            {data &&
              data.map((item, index) => (
                <li
                  className={`p-3 flex justify-between items-center hover:bg-primary-50/30 ${
                    selectedItem?.id === item.id ? "bg-primary-50/20" : ""
                  } ${focusedIndex === index + 1 ? "bg-primary-50/50" : ""}`}
                  key={item.id}
                  onClick={() => handleChange(item)}
                >
                  {item.imageUrl && <img src={item.imageUrl} className="w-4" />}
                  {item.name}
                  {selectedItem?.id === item.id && (
                    <FiCheck
                      size={24}
                      className={`font-bold ${
                        selectedItem?.id === item.id ? "text-green-500" : ""
                      }`}
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;