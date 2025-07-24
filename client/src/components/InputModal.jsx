import React, { useEffect, useRef } from "react";

const InputModal = ({
  open,
  onClose,
  title,
  label,
  value,
  onChange,
  onSubmit,
  type = "number",
  error,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent">
      <div className="relative not-only: bg-white rounded-lg shadow-2xl p-8 min-w-[350px] max-w-md border-2 border-blue-500">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center capitalize">
          {title}
        </h2>
        <input
          ref={inputRef}
          type={type}
                  className="border glass-input rounded px-3 py-2 mb-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Asking Price"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={0}
        />
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-2"
          onClick={onSubmit}
        >
          Set Price
        </button>
      </div>
    </div>
  );
};

export default InputModal;
