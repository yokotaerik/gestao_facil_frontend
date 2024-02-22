import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link";
import Button from "../layout/button";

export function LoginForm() {
  const { signIn, loading, error } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    await signIn({ email, password });
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm mx-auto mt-8 p-4 bg-white  shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          E-mail
        </label>
        <input
          type="email"
          id="email"
          className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button type="submit" loading={loading}>
        Sign In
      </Button>
      <div className="mt-2">
        <p>
          Not have an account yet?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign up here!
          </Link>
        </p>
      </div>
    </form>
  );
}
