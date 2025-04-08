import { RefObject, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { useClickOutside } from '../../../hooks/useClickOutside';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  name?: string;
  className?: string;
  disabled?: boolean;
}

function Select({
  label,
  options,
  value = '',
  onChange,
  placeholder = '선택해주세요',
  error,
  required,
  name,
  className = '',
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 훅 사용
  useClickOutside(selectRef as RefObject<HTMLDivElement>, () =>
    setIsOpen(false),
  );

  // 선택된 옵션 찾기
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  // 값이 변경되면 내부 상태 업데이트
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className='w-full'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <div ref={selectRef} className='relative'>
        {/* 히든 네이티브 select (폼 제출 및 접근성용) */}
        <select
          name={name}
          value={selectedValue}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          className='sr-only'
          aria-hidden='true'
          tabIndex={-1}
        >
          <option value=''>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* 커스텀 UI */}
        <div
          className={`w-full px-4 py-3 border border-border rounded-md flex justify-between items-center cursor-pointer bg-white sm:text-sm
            ${isOpen ? 'ring-1 ring-primary border-primary' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}
            ${className}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role='combobox'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls='select-dropdown'
          aria-labelledby={label ? 'select-label' : undefined}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              !disabled && setIsOpen(!isOpen);
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          <span
            id='select-label'
            className={!selectedOption ? 'text-gray-500' : ''}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon
            size={18}
            className={`transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <ul
            id='select-dropdown'
            className='absolute z-(--dropdown-z) mt-1 w-full bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto p-2'
            role='listbox'
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={classNames(
                  'px-3 py-2 cursor-pointer flex items-center justify-between rounded-md hover:bg-gray-100',
                  option.value === selectedValue &&
                    'text-primary-active font-semibold hover:bg-primary-hover hover:text-white',
                )}
                onClick={() => handleSelect(option)}
                role='option'
                aria-selected={option.value === selectedValue}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
              >
                {option.label}
                {option.value === selectedValue && (
                  <CheckIcon size={16} className='text-black' />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
}

export default Select;
