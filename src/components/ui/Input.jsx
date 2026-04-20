import React from 'react';

export const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>}
      <input
        ref={ref}
        className={`bg-black/20 backdrop-blur-sm border ${error ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10 focus:border-accent focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]'} rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
