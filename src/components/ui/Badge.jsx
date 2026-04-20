export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-surface-elevated text-text-primary',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    danger: 'bg-danger/10 text-danger border border-danger/20',
    accent: 'bg-accent/10 text-accent-blue border border-accent/20'
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${currentVariant} ${className}`}>
      {children}
    </span>
  );
};
