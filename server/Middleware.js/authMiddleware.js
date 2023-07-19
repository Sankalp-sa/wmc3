import jwt from "jsonwebtoken";

// Protect routes token based
export const requireSignIn = async (req, res, next) => {
    
    try {
        const decoded = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }   
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Login Error",
            error: err.message,
        });
    }
}