import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// You should store this in env variables in real apps
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "thisissupersecretaccesstoken";

if (!JWT_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
}
export interface RequestWithUser extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;

  // Token format: Bearer <token> -> accesstoken
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      role: string;
    };

    // Attach the decoded user to req.user
    (req as RequestWithUser).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    
    //check => only admin can fetch all users
    if(decoded.role === "user"){
        return res.status(403).json({
            message: "Access Denied"
        })
    }

    return next(); // Pass control to the next middleware or route
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
