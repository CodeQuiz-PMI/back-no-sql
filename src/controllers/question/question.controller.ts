import { Request, Response } from "express";
import { Question } from "../../models";
// import axios from "axios";

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido." });
    }
  }
};

export const getAllQuestionController = async (_: Request, res: Response) => {
  const questions = await Question.find().populate("section");
  res.status(200).json(questions);
};

export const getQuestionByIdController = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const question = await Question.findById(req.params.id).populate("section");
  if (!question)
    return res.status(404).json({ error: "Questão não encontrada" });
  res.status(200).json(question);
};

export const updateQuestionController = async (req: Request, res: Response) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json(question);
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// export const codeQuestionController = async (req: Request, res: Response) => {
//   const { code, language = "python" } = req.body;

//   try {
//     const pistonResponse = await axios.post(
//       "https://emkc.org/api/v2/piston/execute",
//       {
//         language,
//         version: "*",
//         files: [{ name: "main.py", content: code }],
//       }
//     );

//     return res.json(pistonResponse.data);
//   } catch (err) {
//     console.error("Erro ao chamar Piston:", err);
//     return res.status(500).json({ error: "Erro ao executar código" });
//   }
// };
