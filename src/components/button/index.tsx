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
      className="bg-teal-500 max-w-xl p-2 border-0 rounded w-full text-white font-bold items-center flex justify-center"
      disabled={loading}
      {...rest}
    >
      {loading && (
        <FaSpinner
          color="FFF"
          size={24}
          className="animate-spin"
        />
      )}
      {!loading && <span>{children}</span>}
    </button>
  );
}
