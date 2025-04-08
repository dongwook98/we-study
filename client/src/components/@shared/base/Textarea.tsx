import { TextareaHTMLAttributes } from 'react';

import classNames from 'classnames';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

function Textarea({
  label,
  error,
  fullWidth = true,
  helperText,
  id,
  className,
  required,
  ...rest
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <textarea
        className={classNames(
          'appearance-none relative block px-4 py-3 border border-border rounded-md placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm',
          {
            'w-full': fullWidth,
            'border-red-500 focus:ring-red-500 focus:border-red-500': error,
          },
          className,
        )}
        {...rest}
        id={id}
      ></textarea>
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      {helperText && !error && (
        <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
      )}
    </div>
  );
}

export default Textarea;
