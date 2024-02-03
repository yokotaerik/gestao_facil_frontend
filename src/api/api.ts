// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

import axios from "axios"

export const api = axios.create(
  {
    baseURL: "http://localhost:8080"
  }
)