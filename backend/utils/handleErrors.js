// Handling user authentication error

export const handleAuthenticationError = (res) => {
    res.status(401).json({
        success: false,
        message: 'User is not authenticated',
    });
};

export const handleError = (res,error) => {
    res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
    });
}