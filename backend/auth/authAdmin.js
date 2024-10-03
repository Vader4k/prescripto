import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, Admins only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
