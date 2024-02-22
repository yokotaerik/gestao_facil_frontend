import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import { FiLogOut, FiUser, FiGrid, FiFilePlus } from "react-icons/fi";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-t from-white to-slate-200">
      <Head>
        <title>Manage your project!</title>
      </Head>
      <nav className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-4">
        {user ? (
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <p className="text-lg font-bold flex items-center">
                  <FiGrid className="mr-2" /> Dashboard
                </p>
              </Link>
              <Link href="/create_project">
                <p className="text-lg font-bold flex items-center">
                  <FiFilePlus className="mr-2" /> Create a new project!
                </p>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">
                Hi, {user.name} {user.surname}!
              </span>
              <button
                className="flex items-center text-sm font-medium"
                onClick={signOut}
                title="Sign Out"
              >
                <FiLogOut className="mr-1 text-2xl" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="font-bold text-xl"> Easy project </h1>
          </div>
        )}
      </nav>
      <main className="container mx-auto flex-1">{children}</main>
    </div>
  );
};

export default Layout;
