import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(`req.cookies ye h - ${req.cookies.token}`)

        console.log("token is: ",token);
        if (!token) {
            return res
                .status(401)
                .json({ msg: "Unauthorized - No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ msg: "Invalid Token" });
        }
        console.log(`decoded tokenID is: ${decoded._id}`);
        const user = await prisma.user.findFirst({
            where: {
                id: decoded._id,
            },
        });
        // const passwordExcludedUser = exclude(user, ['password']);
        const { password, ...userWithoutPassword } = user;
        // console.log(`userWithoutPassword is: ${JSON.stringify(userWithoutPassword)}`);
        req.user = userWithoutPassword;
        // console.log(`req.user m kya save hua h dekhte h - ${req.user.email}`)
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// .select(-password);
