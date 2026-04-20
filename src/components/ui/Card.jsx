export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`glass-panel rounded-2xl p-6 glass-panel-hover ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
