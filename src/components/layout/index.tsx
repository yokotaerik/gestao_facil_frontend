// components/Layout.tsx
import React, { ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <Head>
        <title>Meu Site</title>
      </Head>
      <nav className="bg-teal-500 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <a className="text-lg font-bold hover:underline" href="/">
              Página Inicial
            </a>
          </div>
          <div className="flex space-x-4">
            <a className="hover:underline" href="/sobre">
              Sobre
            </a>
            <a className="hover:underline" href="/contato">
              Contato
            </a>
          </div>
        </div>
      </nav>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-teal-500 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Meu Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
