// components/RegisterForm.tsx
import { useContext, useState } from "react";
import Button from "../layout/button";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link";

export function RegisterForm() {
  const { signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (email === "" || password === "" || name === "" || surname === "" || confirmPassword === "") {
      return;
    }

    setLoading(true);

    let data = {
      name,
      surname,
      email,
      password,
      confirmPassword,
    };

    // Simular demora
    setTimeout(async () => {
      setLoading(false);
      await signUp(data);
    }, 1000);
  }

  return (
    <form onSubmit={handleRegister} className="w-full max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nome
        </label>
        <input
          type="text"
          id="name"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="surname" className="block text-gray-700 text-sm font-bold mb-2">
          Sobrenome
        </label>
        <input
          type="text"
          id="surname"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          E-mail
        </label>
        <input
          type="text"
          id="email"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Senha
        </label>
        <input
          type="password"
          id="password"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
          Confirmar Senha
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type="submit" loading={loading}>
        Registrar
      </Button>
      <p className="mt-2 text-gray-700">
        Já possui uma conta?{" "}
        <Link href="/login">
         <label className="text-teal-500">Entre aqui!</label>
        </Link>
      </p>
    </form>
  );
}
