import { ISection } from "../../interfaces";
import { Section } from "../../models";

type SectionData = Partial<Omit<ISection, "_id">>;

export const SectionService = {
  async create(data: SectionData): Promise<ISection> {
    return Section.create(data);
  },

  async findAll(): Promise<ISection[]> {
    return Section.find().populate("level");
  },

  async findById(id: string): Promise<ISection> {
    const section = await Section.findById(id).populate("level");
    if (!section) {
      throw new Error("Seção não encontrada");
    }
    return section;
  },

  async update(id: string, data: SectionData): Promise<ISection> {
    const updatedSection = await Section.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedSection) {
      throw new Error("Seção não encontrada para atualizar");
    }
    return updatedSection;
  },

  async deleteById(id: string): Promise<void> {
    const result = await Section.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Seção não encontrada para deletar");
    }
  },
};
