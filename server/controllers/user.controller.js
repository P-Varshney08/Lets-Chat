import prisma from "../DB/db.config.js";

export const getUsersForSidebar = async(req, res) =>{
    try {
        const loggedUserId = req.user.id;
        const allUsers = await prisma.user.findMany({
            where: {
                NOT: {
                    id: loggedUserId,
                }
            }
        })
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error); 
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}