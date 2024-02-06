import { api } from "@/api/api";
import Router from "next/router";
import { useState } from "react"

interface AddUserFormProps {
    path: string
    id: number
}

const AddUserForm = ({path, id} : AddUserFormProps) => {
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await api.post(`${path}/${id}`, {
                username: email
            });
            setEmail("");
          } catch (error) {
            alert("Error");
          } finally {
            setLoading(false);
          }
    }

    return (
        <form>
            <input type="text" placeholder="Type user e-mail" onChange={(e) => setEmail(e.target.value)}/>
            <button> Confirmar </button>
        </form>
    )
}