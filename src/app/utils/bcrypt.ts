import { compare, hash } from "bcrypt";

export const comparePassword = async (password: string, passwordHash: string) => {
  return await compare(password, passwordHash);
};

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};
