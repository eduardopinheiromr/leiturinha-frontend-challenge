import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  setTimeout(() => {
    return res.status(200).json({ message: "Compra efetuada com sucesso!" });
  }, 3000);
};
