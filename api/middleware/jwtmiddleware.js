const { verifyToken } = require("../utils/helper");

module.exports = async function (req, res, next) {

    try {
        if (!req.headers.authorization) throw new Error('Token is required')

        const token = req.headers.authorization;
        let decoded = await verifyToken(token);

        req._userDetails = decoded

        next();
    } catch (error) {
        return res.status(450).json({ error });
    }

}