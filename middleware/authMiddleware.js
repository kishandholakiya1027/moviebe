const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const token = req.header('Authorization');
console.log("🚀 ~ file: authMiddleware.js:4 ~ verifyToken ~ token:", token)
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const {user} = jwt.verify(token, process.env.JWT_SECRET_KEY);
 console.log("🚀 ~ file: authMiddleware.js:7 ~ verifyToken ~ user:", user)
 req.user = user
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;