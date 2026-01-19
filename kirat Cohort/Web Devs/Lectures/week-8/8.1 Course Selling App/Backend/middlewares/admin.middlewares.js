const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const adminMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    const decode = jwt.verify( token, process.env.JWT_SECRET_FOR_ADMIN);

    if(decode) {
        req.adminId = decode.id
        next();
    }
    else {
        res.status(403).json({
            message : 'you are not signed in '
        });
    }
}

module.exports = { adminMiddleware }