export const Avatar = ({ src, alt, fallback, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-24 h-24 text-xl'
  };

  const selectedSize = sizes[size] || sizes.md;

  return (
    <div className={`relative rounded-full overflow-hidden shrink-0 bg-surface-elevated flex items-center justify-center font-semibold text-accent-blue ${selectedSize} ${className}`}>
      {src ? (
        <img src={src} alt={alt || 'avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback || '?'}</span>
      )}
    </div>
  );
};
