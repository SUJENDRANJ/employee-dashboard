import { useEffect } from "react";
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const isError = type === "error";

  return (
    <div
      className={`toast-enter fixed bottom-5 right-5 left-5 sm:left-auto z-50 border px-4 py-3 text-sm flex items-center gap-3 shadow-lg
        bg-ink text-paper dark:bg-surface2 dark:text-paper
        ${isError ? "border-rust dark:border-rust-light" : "border-terminal dark:border-terminal-light"}`}
    >
      <span
        className={
          isError
            ? "text-rust dark:text-rust-light"
            : "text-terminal dark:text-terminal-light"
        }
      >
        {isError ? "[ERR]" : "[OK]"}
      </span>
      <span className="font-mono flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-muted dark:text-muted-light hover:text-signal ml-2 text-xs"
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
