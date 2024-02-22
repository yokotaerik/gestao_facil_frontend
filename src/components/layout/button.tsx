// components/Button.tsx
import { ReactNode, ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export default function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <button
      className={`max-w-xl p-2 border-0  w-full text-white font-bold items-center flex justify-center ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-blue-300"
      }`}
      disabled={loading}
      {...rest}
    >
      {loading && <FaSpinner color="FFF" size={24} className="animate-spin" />}
      {!loading && <span>{children}</span>}
    </button>
  );
}
