// components/Layout.tsx
import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-200">
      <Head>
        <title>Meu Site</title>
      </Head>
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/dashboard">
              <p className="text-lg font-bold hover:underline">Dashboard</p>
            </Link>
          </div>
          <div className="flex space-x-4">
            {user != null ? (
              <div className="flex gap-2">
                <label>{user.name} {user.surname}</label>
                <button onClick={signOut}> Sair </button>
              </div>
            ) : (
              <Link href="/login">
                <p className="hover:underline">Entrar</p>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="min-h-screen min-w-screen">{children}</main>
      <footer className="bg-blue-600 p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Meu Site. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
