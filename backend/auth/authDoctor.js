import jwt from 'jsonwebtoken'

export const authDoctor = async (req, res, next) => {
    try {
      const token = req.headers.dtoken;
      
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        if (decoded.role !== 'doctor') {
          return res
            .status(403)
            .json({ success: false, message: "Not authorized, doctors only" });
        }
  
        req.user = {docId: decoded.docId};
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
  