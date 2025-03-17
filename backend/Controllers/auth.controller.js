
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../utils/generateTokenAndSetCookie");
// const { sendVerificationEmail , sendWelcomeEmail} = require("../mailtrap/email");

const signup = async (req, res) => {
    
    const { name, email, password,userType } = req.body;

try {
        
    if(!name || !email || !password || !userType) {
        return res.status(400).json({ message: "All fields are required" });
    ``}

    const userAlreadyExists = await User.findOne({ email });
    if(userAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
        name,
        email,
        password: hashedPassword,
        userType,
        verificationToken,
        verificationExpire: Date.now() + 60 * 60 *1000, // 10 minutes
    });

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    // await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({ 
        success: true,
        message: "User registered successfully",
        user: {
            ...user._doc,
            password: undefined,
        }
    });

} catch (error) {
    
}


};


// const verifyEmail = async (req, res) => {

//     const {code} = req.body;
//     try {
        
//         const user = await User.findOne({ 
//             verificationToken: code, 
//             verificationExpire: { $gt: Date.now() } 
//         });

//         if(!user) {
//             return res.status(400).json({ message: "Invalid or expired verification code" });
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined;
//         user.verificationExpire = undefined;
//         await user.save();

//         await sendWelcomeEmail(user.email, user.name);

//     } catch (error) {
//         throw new Error(error.message );
//     }
// };

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate request
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(res, user._id);

        // Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined, // Exclude password from response
            },
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    res.send("Logout route");
};

module.exports = { signup, login, logout };