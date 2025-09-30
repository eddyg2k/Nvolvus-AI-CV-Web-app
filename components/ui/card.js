export function Card({ children, className = "" }) {
  return <div className={\`bg-slate-800 p-4 rounded-lg \${className}\`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2 text-base leading-relaxed">{children}</div>;
}