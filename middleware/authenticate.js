import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET_KEY;

export const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return next();

  const token = auth.split(" ")[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = { email: decoded.email };
  } catch {
    return res.status(401).json({ 
        success: false,
        message: "Invalid or expired token" 
    });
  }

  next();
};
