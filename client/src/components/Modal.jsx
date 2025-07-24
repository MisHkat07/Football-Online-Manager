import React, { useEffect } from "react";

const style = `\n@keyframes slideInRightToast {\n  0% {\n    opacity: 0;\n    transform: translateX(120%);\n  }\n  100% {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.toast-slide-in-right {\n  animation: slideInRightToast 0.5s cubic-bezier(0.4,0,0.2,1);\n}\n`;
if (
  typeof document !== "undefined" &&
  !document.getElementById("toast-slide-in-right-style")
) {
  const s = document.createElement("style");
  s.id = "toast-slide-in-right-style";
  s.innerHTML = style;
  document.head.appendChild(s);
}

const Modal = ({
  open,
  onClose,
  title,
  message,
  type = "success",
  input = false,
  inputValue = "",
  setInputValue,
  onSubmit,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);
  if (!open) return null;
  const borderColor = type === "error" ? "border-red-500" : "border-green-500";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";
  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`relative bg-white opacity-80 rounded-lg shadow-2xl p-6 min-w-[350px] max-w-xl border-2 ${borderColor} toast-slide-in-right`}
      >
        <button
          className="absolute top-2 right-2 text-black-600 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2
            className={`text-2xl font-bold mb-2 text-center capitalize ${textColor}`}
          >
            {title}
          </h2>
        )}
        <p className={`mb-2 text-base text-center ${textColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
