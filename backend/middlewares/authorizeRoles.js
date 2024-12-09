export const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!req.isAuthenticated()) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required role(s): ${roles.join(", ")}`
            });
        }
        next();
    };
};