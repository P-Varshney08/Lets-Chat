import jwt from "jsonwebtoken"

// export const generateToken = (req, res) => {
//     const token = jwt.sign({ _id: "meriID" }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" }).json({msg: "cookie saved"});
// }
export const generateToken = (userId) => {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
}