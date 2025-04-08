import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastOption {
  duration?: number;
  type?: ToastType;
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (option: ToastOption) => void;
  removeToast: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (option: ToastOption) => {
    const id = nextId++;
    const type = option.type || 'info';
    const duration = option.duration || 3000;

    set((state) => ({
      toasts: [...state.toasts, { id, message: option.message, type }],
    }));

    // Automatically remove toast after specified duration
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
