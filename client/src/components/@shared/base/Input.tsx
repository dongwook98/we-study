import { InputHTMLAttributes, forwardRef } from 'react';

import classNames from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      fullWidth = true,
      helperText,
      id,
      required,
      ...rest
    },
    ref,
  ) => {
    const inputId =
      id || `input-${rest.name || Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={classNames('mb-4', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={classNames(
            'appearance-none relative block px-4 py-3 border border-border rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm',
            {
              'w-full': fullWidth,
              'border-red-500 focus:ring-red-500 focus:border-red-500': error,
            },
            className,
          )}
          {...rest}
        />
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
        {helperText && !error && (
          <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
