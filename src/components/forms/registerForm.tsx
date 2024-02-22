import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link";
import Button from "../layout/button";

export function RegisterForm() {
  const { signUp, loading, error } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e: { preventDefault: () => void }) {
    e.preventDefault();

    let data = {
      name,
      surname,
      email,
      password,
      confirmPassword,
    };

    await signUp(data);
  }

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-sm mx-auto mt-8 p-4 bg-white  shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full border  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="surname"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Surname
        </label>
        <input
          type="text"
          id="surname"
          className="w-full border  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full border  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button type="submit" loading={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
      <p className="mt-2 text-gray-700">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          <label className="text-teal-500">Sign in here!</label>
        </Link>
      </p>
    </form>
  );
}
