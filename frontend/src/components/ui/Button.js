import React from 'react';
import { motion } from 'framer-motion';
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200'
  };
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  return <motion.button type={type} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`} onClick={onClick} disabled={disabled} whileTap={{
    scale: disabled ? 1 : 0.98
  }}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>;
}