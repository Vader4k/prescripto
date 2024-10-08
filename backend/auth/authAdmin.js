import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.atoken;
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized, Admins only" });
      }

      req.user = decoded;
      next();
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      if (jwtError.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token has expired" });
      }
      return res
        .status(401)
        .json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    console.error("General error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
