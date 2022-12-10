import * as bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(raw: string, hash: string) {
  return bcrypt.compareSync(raw, hash);
}
