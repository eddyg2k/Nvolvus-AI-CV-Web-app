export function Card({ children, className = "" }) {
  return <div className={"rounded-2xl " + className}>{children}</div>;
}
export function CardContent({ children }) {
  return <div className="mt-1 text-base leading-relaxed">{children}</div>;
}
