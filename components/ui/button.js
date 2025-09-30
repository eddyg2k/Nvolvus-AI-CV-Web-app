export function Button({ children, onClick, variant = "default", className = "" }) {
  return (
    <button
      onClick={onClick}
      className={\`\${className} px-4 py-2 rounded font-semibold transition-colors duration-200 \${variant === 'default' ? 'bg-sky-500 text-black hover:bg-sky-400' : ''}\`}
    >
      {children}
    </button>
  );
}