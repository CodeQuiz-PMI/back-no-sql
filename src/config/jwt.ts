export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error(
      "Erro crítico: A variável de ambiente JWT_SECRET não está definida."
    );
    process.exit(1);
  }
  return secret;
};
