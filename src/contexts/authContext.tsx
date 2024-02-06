import { api } from "@/api/api";
import { AxiosError } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

export type UserProps = {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/user/me");
      const { id, name, surname, username, email } = response.data;

      setUser({
        id,
        name,
        surname,
        username,
        email,
      });
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
      signOut(); // Se houver um erro, faça logout
    }
  };

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      fetchUserData();
    } else {
      signOut(); 
    }
  }, []);

  async function signIn(data: SignInProps) {
    // Faz a requisicao de login para o back-end
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Pega as constantes da resposta
      const { token } = response.data;

      // Salva os cookies
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      setIsAuthenticated(true);

      // Define o token como header padrao apos o login
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      fetchUserData();
      Router.push("/dashboard");
    } catch (error: AxiosError | any) {
      if (error.response) {
        // O backend respondeu com um código de status diferente de 2xx
        console.error("Erro:", error.response.data.message);
      } else if (error.request) {
        // Erro ao fazer a solicitação
        console.error("Erro ao fazer a solicitação:", error.request);
      } else {
        // Erro durante o processamento
        console.error("Erro durante o processamento:", error.message);
      }
    }
  }

  async function signUp(data: SignUpProps) {
    // Faz a requisicao de registro
    try {
      const response = await api.post("/auth/register", {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      alert("Registrado com sucesso");
      Router.push("/login");
    } catch (error: AxiosError | any) {
      if (error.response) {
        // O backend respondeu com um código de status diferente de 2xx
        console.error("Erro:", error.response.data.message);
      } else if (error.request) {
        // Erro ao fazer a solicitação
        console.error("Erro ao fazer a solicitação:", error.request);
      } else {
        // Erro durante o processamento
        console.error("Erro durante o processamento:", error.message);
      }
    }
  }

  async function signOut() {
    try {
      destroyCookie(undefined, "@nextauth.token");
      setIsAuthenticated(false);
      setUser(undefined);
      Router.push("/login");
    } catch {
      console.log("Erro ao deslogar");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
