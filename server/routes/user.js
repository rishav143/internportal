const express = require("express")
const UserModel = require("../models/user")
const AppliedOppurtunity = require("../models/Applied")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (user) {
        return res.status(400).json({ message: "Email already exists" })
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
        username,
        email,
        password: hashedPass
    })
    await newUser.save()
    return res.json({ status: true, message: "User Created" })
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(401).json({ status: false, message: "Password is incorrect" })
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "jwtkey", { expiresIn: "4h" });
    
    // Set cookie with proper settings for cross-domain
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // true in production (HTTPS only)
        sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-domain in production
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
        path: '/'
    });
    
    return res.json({ status: true, message: "Login Successfull", token })
})
const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Cookies received:', req.cookies);
        console.log('Token found:', !!token);
        
        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({ status: false, message: "Auth Failed - No token" })
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET || "jwtkey")
        req.user = decoded;
        console.log('Token verified successfully for user:', decoded.email);
        next()
    } catch (error) {
        console.log('Token verification error:', error.message);
        return res.status(401).json({ status: false, message: "Auth Failed - Invalid token" })
    }
}
router.post("/apply", verifyUser, async (req, res) => {
    try {
        const { oppurtunity } = req.body;
        console.log(oppurtunity)
        const applyOppurtunity = new AppliedOppurtunity({
            userId: req.user.email,
            id: oppurtunity.id,
            profile_name: oppurtunity.profile_name,
            stipend: oppurtunity.stipend.salary,
            company_name: oppurtunity.company_name,
            duration: oppurtunity.duration
        })
        await applyOppurtunity.save();
        res.status(201).json({ message: "Oppurtunity applied successfully" })

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})
router.get("/applied-oppurtunities", verifyUser, async (req, res) => {
    try {
        const appliedOppurtunities = await AppliedOppurtunity.find({ userId: req.user.email })
        res.json(appliedOppurtunities)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.delete("/applied-oppurtunities", async (req, res) => {
    try {
        console.log(req.body.id)
        const user = await AppliedOppurtunity.findOne({ _id: req.body.id })
        if (!user) {
            console.log("error")
            return res.status(400).json({ message: "Opportunity does not exists !" })
        }
        const deleteOpportunity = await AppliedOppurtunity.deleteOne({ _id: req.body.id })
        res.status(200).json({ status: true, message: "Opportunity deleted sucessfully !", oppurtunity: deleteOpportunity })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, message: "Auth Successfull", user: req.user })
})
router.get("/logout", (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/'
    });
    return res.json({ status: true, message: "Logged out successfully" })
})

router.get('/profile', verifyUser, async (req, res) => {
    try {
        const userId = req.user.email;
        // Fetch user details from your database
        const user = await UserModel.findOne({ email: userId })
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }
        res.json({status:true, user});
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// Test endpoint to check cookie functionality
router.get('/test-cookie', (req, res) => {
    console.log('Test cookie endpoint hit');
    console.log('All cookies:', req.cookies);
    console.log('Token cookie:', req.cookies.token);
    
    res.cookie('test', 'test-value', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 1000, // 1 minute
        path: '/'
    });
    
    res.json({ 
        message: 'Test cookie set', 
        cookies: req.cookies,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;