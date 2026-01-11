import { User } from "../../models/User.Model.js";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/jwt.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required data"
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const payload = {
            name: user.name,
            email: user.email
        }

        const jwtToken = createToken(payload);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: jwtToken
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
