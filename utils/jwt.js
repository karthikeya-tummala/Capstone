import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET_KEY;

export const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

export const getUserFromRequest = (req) => {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const token = auth.split(" ")[1];
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
};
