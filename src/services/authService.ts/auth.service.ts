import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { getJwtSecret } from "../../config";
import { IUser } from "../../interfaces";

type UserRegistrationData = Pick<IUser, "name" | "email" | "password">;

type UserLoginCredentials = Pick<IUser, "email" | "password">;

export const AuthService = {
  async register(userData: UserRegistrationData) {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("E-mail já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return { id: user._id, name: user.name, email: user.email };
  },

  async login(credentials: UserLoginCredentials) {
    const { email, password } = credentials;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      getJwtSecret(),
      { expiresIn: "24h" }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        currentLevel: user.currentLevel || "Fase 1",
        currentSection: user.currentSection,
        currentQuestion: user.currentQuestion,
        trophies: user.trophies,
        totalPoints: user.totalPoints,
        lifes: user.lifes,
        hints: user.hints,
        coins: user.coins,
        record: user.record,
        ownedMusics: user.ownedMusics,
      },
    };
  },
};
