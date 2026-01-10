import { User } from "../../models/User.Model.js";
import bcrypt from "bcrypt";

export const SignUp = async(req, res) => {
    try {
    const { name, email, password } = req.body;
    const SALT_ROUNDS = 5;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required data"
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let createdUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    // To not return passwords
    delete createdUser._doc.password;

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createdUser
    })
    
} catch(e) {
    console.log(e);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}

}
