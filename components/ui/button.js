export function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "px-4 py-2 rounded-lg font-semibold bg-sky-500 text-black hover:bg-sky-400 transition-colors " +
        className
      }
    >
      {children}
    </button>
  );
}
