// src/components/TagInput.tsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface TagInputProps {
  tags: string[];
  suggestions: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, suggestions, onTagsChange }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = suggestions.filter(tag => tag.toLowerCase().includes(value.toLowerCase()));
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (!tags.includes(inputValue)) {
          onTagsChange([...tags, inputValue]);
        }
        setInputValue('');
        setFilteredSuggestions([]);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleTagRemove = (tag: string) => {
    onTagsChange(tags.filter(t => t !== tag));
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!tags.includes(suggestion)) {
      onTagsChange([...tags, suggestion]);
    }
    setInputValue('');
    setFilteredSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className='flex gap-3 text-base '>
      {tags.map(tag => (
        <div className="bg-white py-[2px] px-3 gap-3 rounded-md flex  justify-between items-center " key={tag}>
          {tag}
          <button className='h-3 w-3 flex items-center justify-center' type="button" onClick={() => handleTagRemove(tag)}><FiX/></button>
        </div>
      ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag"
        className='bg-neutral outline-none rounded-lg w-full py-3  px-4 text-primary-200 focus:ring-4 focus:ring-primary-50 focus:border focus:border-primary-100'
      />
      {filteredSuggestions.length > 0 && (
        <ul className="bg-white w-full   rounded-xl overflow-hidden shadow-lg">
          {filteredSuggestions.map(suggestion => (
            <li key={suggestion} className='p-2 border-b border-neutral-100 ' onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
