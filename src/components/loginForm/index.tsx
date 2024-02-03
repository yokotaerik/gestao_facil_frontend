// components/LoginForm.tsx
import { useContext, useState } from "react";
import Button from "../button";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link";

export function LoginForm() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (email === "" || password === "") {
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    // Simular demora
    setTimeout(async () => {
      setLoading(false);
      await signIn(data);
    }, 1000);
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm mx-auto mt-8 p-4 bg-white rounded shadow-md"
    >
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
      <div className="mb-6">
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
      <Button type="submit" loading={loading}>
        Entrar
      </Button>
      <Link href={"/register"}> <label> Registre-se aqui! </label> </Link> 
    </form>
  );
}
