import { Request, Response } from "express";

import { User } from "../../models"

export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser = req.body;
        const user = await User.create(newUser);
        res.json(user).status(201);
    } catch (err: any) {
        res.json({ error: err.message }).status(400)
    }
}

export const getAllUserController = async (req: Request, res: Response) => {
    const user = await User.find();
    res.json(user).status(201);
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const newUser = req.params.id;
    const user = await User.findById(newUser);
    if (!user) return res.json({ error: "Usuário não encontrado" }).status(400);
    res.json(user).status(201);
}
