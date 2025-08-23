import bcrypt from "bcryptjs";
import { User, AnswerLog } from "../../models";
import { IUser } from "../../interfaces";

type UserUpdateData = Partial<Omit<IUser, "_id">>;

export const UserService = {
  async findAll(): Promise<Omit<IUser, "password">[]> {
    return User.find().select("-password");
  },

  async findById(id: string): Promise<Omit<IUser, "password">> {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  },

  async update(
    id: string,
    data: UserUpdateData
  ): Promise<Omit<IUser, "password">> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      throw new Error("Usuário não encontrado para atualizar");
    }
    return updatedUser;
  },

  async deleteById(userId: string): Promise<void> {
    const [userDeleteResult] = await Promise.all([
      User.findByIdAndDelete(userId),
      AnswerLog.deleteMany({ user: userId }),
    ]);

    if (!userDeleteResult) {
      throw new Error("Usuário não encontrado para deletar");
    }
  },
};
