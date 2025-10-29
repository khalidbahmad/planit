import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, AlertCircleIcon, XIcon, InfoIcon, AlertTriangleIcon } from 'lucide-react';
// Toast Context
const ToastContext = createContext();
/**
 * ToastProvider component provides toast functionality to its children
 */
export function ToastProvider({
  children
}) {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success', duration = 5000) => {
    const id = Date.now();
    setToasts(prev => [...prev, {
      id,
      message,
      type,
      duration
    }]);
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  };
  const removeToast = id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  const value = {
    addToast,
    removeToast
  };
  return <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>;
}
/**
 * useToast hook provides toast functionality
 * @returns {Object} Toast functions (success, error, warning, info)
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  const {
    addToast
  } = context;
  return {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration)
  };
}
/**
 * ToastContainer component displays toasts
 */
function ToastContainer({
  toasts,
  removeToast
}) {
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map(toast => <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />)}
      </AnimatePresence>
    </div>;
}
/**
 * Toast component displays a single toast notification
 */
function Toast({
  id,
  message,
  type,
  onClose
}) {
  const icons = {
    success: <CheckCircleIcon className="text-green-500" size={20} />,
    error: <AlertCircleIcon className="text-red-500" size={20} />,
    warning: <AlertTriangleIcon className="text-yellow-500" size={20} />,
    info: <InfoIcon className="text-blue-500" size={20} />
  };
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20,
    scale: 0.8
  }} animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }} exit={{
    opacity: 0,
    y: 20,
    scale: 0.8
  }} transition={{
    duration: 0.2
  }} className={`rounded-lg shadow-md border p-4 ${bgColors[type]} backdrop-blur-sm`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
          <XIcon size={16} />
        </button>
      </div>
    </motion.div>;
}