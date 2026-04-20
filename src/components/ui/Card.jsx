export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-surface border border-border rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-black/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
