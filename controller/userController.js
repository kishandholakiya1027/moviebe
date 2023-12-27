const User = require("../model/user");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "User does not exist" });
        if(user?.password !== req?.body?.password) return res.status(400).json({ message: "Password does not match" });
        await jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => {
            if (err) return res.status(500).json({ message: err.message });
            return res.status(200).json({ token, user });
        })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const addUser = async (req, res) => {
    try {
        console.log("🚀 ~ file: userController.js:20 ~ addUser ~ req.body:", req.body)
        const user = await User.create(req.body);
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }Í
}

module.exports = {
    login,
    addUser
}