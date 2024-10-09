import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded + "this is decoded")

      if (decoded.role !== 'user') {
        return res
          .status(403)
          .json({ success: false, message: "You are not a registred user" });
      }

    req.user = {id: decoded.data};
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
