import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { useToastStore } from '@store/toastStore';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Find or create a DOM element for the portal
    let element = document.getElementById('toast-portal');
    if (!element) {
      element = document.createElement('div');
      element.id = 'toast-portal';
      document.body.appendChild(element);
    }
    setPortalElement(element);

    // Cleanup function to remove the element when component unmounts
    return () => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  if (toasts.length === 0 || !portalElement) return null;

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const toastContent = (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} px-4 py-3 rounded shadow-md flex items-center justify-between max-w-md`}
        >
          <p>{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className='ml-4 text-white hover:text-gray-200'
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );

  return createPortal(toastContent, portalElement);
};

export default Toast;
