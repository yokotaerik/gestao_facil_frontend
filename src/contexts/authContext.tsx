import { api } from "@/api/api";
import { AxiosError } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export type UserProps = {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
};

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
  error?: string;
  loading: boolean;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/user/me");
      const { id, name, surname, username, email } = response.data;

      setUser({ id, name, surname, username, email });
      setError("");

    } catch (error) {
      console.error("Error fetching user information:", error);
      signOut();
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
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      setIsAuthenticated(true);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      await fetchUserData();
      
      Router.push("/dashboard");
    } catch (error: AxiosError | any) {
      if (error.response.status === 401) {
        setError("E-mail or password wrong");
      } else if (error.request) {
        setError("Error making request.");
      } else {
        setError("Error during processing.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function signUp(data: SignUpProps) {
    setLoading(true);
    try {
      if (
        data.email === "" ||
        data.password === "" ||
        data.name === "" ||
        data.surname === "" ||
        data.confirmPassword === ""
      ) {
        setError("Please fill in all fields.");
        return;
      }

      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await api.post("/auth/register", {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      alert("Successfully registered");
      setError("");

      Router.push("/login");
    } catch (error: AxiosError | any) {
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError("Error making request.");
      } else {
        setError("Error during processing.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      destroyCookie(undefined, "@nextauth.token");
      setIsAuthenticated(false);
      setUser(undefined);
      Router.push("/login");
      setError("")
    } catch {
      console.log("Error logging out");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
