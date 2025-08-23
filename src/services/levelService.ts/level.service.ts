import { ILevel } from "../../interfaces";
import { Level } from "../../models";

type LevelData = Partial<Omit<ILevel, "_id">>;

export const LevelService = {
  async create(data: LevelData): Promise<ILevel> {
    return Level.create(data);
  },

  async findAll(): Promise<ILevel[]> {
    return Level.find().sort({ order: "asc" });
  },

  async findById(id: string): Promise<ILevel> {
    const level = await Level.findById(id);
    if (!level) {
      throw new Error("Nível não encontrado");
    }
    return level;
  },

  async update(id: string, data: LevelData): Promise<ILevel> {
    const updatedLevel = await Level.findByIdAndUpdate(id, data, { new: true });
    if (!updatedLevel) {
      throw new Error("Nível não encontrado para atualizar");
    }
    return updatedLevel;
  },

  async deleteById(id: string): Promise<void> {
    const result = await Level.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Nível não encontrado para deletar");
    }
  },
};
