import { useState } from "react";
import ArrowIcon from "../assets/arrow";
import Option, { OptionType } from "./option";

interface SelectProps {
  options: OptionType[];
  selectedOption: OptionType;
  onSelect: (option: string) => void;
}

export const Select = ({ options, selectedOption, onSelect }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleSelect(option: OptionType) {
    setIsOpen(false);
    onSelect(option.name);
  }

  return (
    <div className="relative inline-block w-full">
      <div
        className="cursor-pointer w-full h-10 rounded-lg p-2 mb-3 border border-gray-300 flex items-center justify-between"
        onClick={handleToggle}
      >
        <Option option={selectedOption} />
        <ArrowIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md overflow-hidden">
          {options.map((option) => (
            <Option
              key={option.name}
              option={option}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer transition-all duration-300"
            />
          ))}
        </div>
      )}
    </div>
  );
};
