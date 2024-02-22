import { UserProps } from "@/contexts/authContext";
import { useState } from "react";

interface SearchUserProps {
  users: UserProps[];
}

const SearchUser = ({ users }: SearchUserProps) => {
  const [email, setEmail] = useState("");
  const [listOfUsers, setListOfUsers] = useState<UserProps[]>(users);

  return (
    <div className="w-full mx-auto p-6 bg-white  shadow-md">
      <input
        type="text"
        placeholder="Digite o e-mail do usuário"
        onChange={(e) => {
          const inputEmail = e.target.value;
          setEmail(inputEmail);
          setListOfUsers(
            users.filter((user) =>
              user.email.toLowerCase().includes(inputEmail.toLowerCase())
            )
          );
        }}
        className="w-full p-3 border  mb-4 focus:outline-none focus:ring focus:border-blue-300"
      />

      <div className="max-h-[300]">
        {listOfUsers.length > 0 ? (
          <div className="space-y-4">
            {listOfUsers.map((user) => (
              <div key={user.id} className="bg-gray-200 p-3 ">
                {user.email}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 mt-4">Nenhum usuário encontrado.</div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
