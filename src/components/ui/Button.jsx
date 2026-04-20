export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    secondary: 'bg-surface-elevated text-text-primary hover:bg-surface-hover',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover',
    danger: 'bg-danger text-white hover:bg-red-600'
  };
  
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  const currentVariant = variants[variant] || variants.primary;
  const currentSize = sizes[size] || sizes.md;

  return (
    <button 
      className={`${baseClasses} ${currentVariant} ${currentSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
