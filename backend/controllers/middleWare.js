const jwt = require("jsonwebtoken");
const middleware = {
    verifyAccessToken: async (req, res, next) => {
        const token = req.headers.accessToken;
        try {
            const decoded = jwt.verify(token,process.env.JWT_ACCESS_KEY);
            req.user = decoded;
            next()
        } catch(err){
            res.clearCookie("accessToken")
            return res.redirect("/");
        }
    },
    verifyUserPermission: async (req, res, next) => {
        const userId = req.user.userId;
        const isAdmin = req.user.admin;

        if (isAdmin || userId === req.params.id) {
            // User has permission, proceed to delete operation
            next();
        } else {
            res.status(403).json("You're not allowed to delete this user");
        }
    },
}
module.exports = middleware;