import { api } from "@/pages/api/api";
import { AxiosError } from "axios";
import { Router, useRouter } from "next/router";
import React, { ReactNode, createContext, useState } from "react";


type AuthContextData = {
    user?: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
}

export type UserProps = {
    id: number;
    fullName: string;
    username: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode
}


type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const AuthContext = createContext({} as AuthContextData);
const router = useRouter();


export function AuthProvider({children} : AuthProviderProps){
    const [user, setUser ] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn(data:SignInProps) {
        // Faz a requisicao de login para o back-end
        try{
            const response = await api.post("/auth/login",
                {
                    email: data.email,
                    password: data.password,
                }
            );


            // Pega as constantes da resposta
            const { token, id, username, fullName } = response.data;

            // Define o token como header padrao apos o login
            api.defaults.headers['Authorization'] = `Bearer ${token}`;


            // Define as informacoes basicas do usuario
            setUser({
                id,
                fullName,
                username,
                email: data.email,
            });
        }
        catch (error: AxiosError | any) {
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
    };

    async function signUp(data:SignUpProps){
        // Faz a requisicao de registro
        try{
            const response = await api.post("/auth/register",
                {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }
            );

            alert("Registrado com sucesso")
            router.push("/login")
        }
        catch (error: AxiosError | any) {
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

    async function signOut(){
        try{
            api.defaults.headers['Authorization'] = null;
            router.push("/login")
        }
        catch{
            console.log("Erro ao deslogar")
        }
    }

    const value = {
        user,
        isAuthenticated
    };
    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}