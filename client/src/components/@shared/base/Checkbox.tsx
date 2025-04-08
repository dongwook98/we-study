import React, { ChangeEvent, InputHTMLAttributes } from 'react';

import { CheckIcon } from 'lucide-react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  className?: string;
}

function Checkbox({
  label,
  checked = false,
  onChange,
  className = '',
  disabled = false,
  ...props
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e, e.target.checked);
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className='relative flex items-center'>
        <input
          type='checkbox'
          className='sr-only'
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center mr-2 transition-colors
            ${
              checked ? 'bg-primary border-primary' : 'bg-white border-gray-300'
            }
            ${disabled ? 'bg-gray-200' : ''}
          `}
        >
          {checked && <CheckIcon size={14} className='text-white' />}
        </div>
      </div>
      {label && <span className='text-sm'>{label}</span>}
    </label>
  );
}

export default Checkbox;
