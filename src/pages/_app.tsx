import Layout from "@/components/layout/layout";
import { AuthProvider } from "@/contexts/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </AuthProvider>
  );
}
