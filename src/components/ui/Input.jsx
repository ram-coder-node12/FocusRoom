import React from 'react';

export const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
      <input
        ref={ref}
        className={`bg-surface-elevated border ${error ? 'border-danger' : 'border-border'} rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors`}
        {...props}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
