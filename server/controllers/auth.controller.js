import prisma from "../DB/db.config.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(401).json({ msg: "Passwords do not match" });
        }
        const isUserExist = await prisma.user.findFirst({
            where: { email: email },
        });
        if (isUserExist) {
            return res.status(409).json({ msg: "User already exists" });
        }
        console.log('user nhi mila ab save krte h')
        const hashedPassword = await bcryptjs.hashSync(password, 8);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        console.log('profile images are: ', boyProfilePic, girlProfilePic)
        const newUser = await prisma.user.create({
            data: {
                username,
                email, 
                password: hashedPassword,
                gender,
                profilePicture:
                    gender === "MALE" ? boyProfilePic : girlProfilePic,
            },
        });
        res.status(201).json({
            id: newUser.id,
            email,
            profilePicture: newUser.profilePicture,
            msg: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // const { email, password } = req.body;
        console.log(`auth controller m data aaya h: ${username} ${password}`)
        const isUserExist = await prisma.user.findFirst({
            where: {
                username: username,
                // email: email,
            }
        })
        // console.log(`isUserExist aa rha hai :   ${isUserExist}`);
        // if(!isUserExist) {
        //     return res.status(404).json({error: "User not found"});
        // }
        const isPasswordCorrect = await bcryptjs.compare(password, isUserExist.password);
        console.log("Is Password Correct:", isPasswordCorrect); 
        if(!isPasswordCorrect) {
            return res.status(400).json({error: "Invalid Password"});
        }
        const token = generateToken(isUserExist.id);
        // console.log(`token bana h ye- ${token}`);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
        console.log('Cookie saved');
        
        return res.status(200).json({
            userId: isUserExist.id,
            name:  isUserExist.name,
            profilePic: isUserExist.profilePicture,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error!" });
    }
};

export const logout = async(req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error!" });
    }
}