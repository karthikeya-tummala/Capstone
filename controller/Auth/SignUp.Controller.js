import { User } from "../../models/User.Model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const SALT_ROUNDS = process.env.BCRPYT_SALT_ROUNDS;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required data"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use"
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        let createdUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // To not return passwords
        const userResponse = createdUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userResponse
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}
