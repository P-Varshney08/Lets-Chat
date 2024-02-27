import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";

export const protectRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTcwODk3MTE4MSwiZXhwIjoxNzA5MDU3NTgxfQ.I31aLgk3X93j0C1nhpHtPZeFNaLDrPJJuc7HRBtkFJs"
        
        console.log(token);
        if (!token) {
            return res
                .status(401)
                .json({ msg: "Unauthorized - No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ msg: "Invalid Token" });
        }
        // console.log(`decoded token is: ${decoded}`)
        console.log(`decoded tokenID is: ${decoded._id}`);
        const user = await prisma.user.findFirst({
            where: {
                id: decoded._id,
            },
        });
        // const passwordExcludedUser = exclude(user, ['password']);
        const { password, ...userWithoutPassword } = user;
        console.log(`userWithoutPassword is: ${userWithoutPassword}`);
        req.user = userWithoutPassword;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// .select(-password);
