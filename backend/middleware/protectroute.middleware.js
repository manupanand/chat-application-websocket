const { generateTokenCookie, verifyToken } = require('../config/generatetoken');
const User = require('../model/user.model');
const logger = require('./logger.middleware');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            logger.error("Error - unauthorized token");
            return res.status(401).json({ error: "Unauthorized - no token provided" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            logger.error("Unauthorized - Invalid token provided");
            return res.status(401).json({ error: "Unauthorized - Invalid token provided" });
        }

        const user = await User.findById(decoded.userId).select("-password"); // Remove password
        if (!user) {
            logger.error("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        logger.error("Error in authenticating token (user/protect-route middleware)", error);
        res.status(500).json({
            message: "Error in verifying user / protect-middleware"
        });
    }
};

module.exports = protectRoute; // Export the middleware outside the try-catch block
