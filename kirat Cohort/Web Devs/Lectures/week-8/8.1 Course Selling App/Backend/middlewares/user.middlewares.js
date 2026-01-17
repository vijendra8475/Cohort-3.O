const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const userMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    const decode = jwt.verify( token, process.env.JWT_SECRET);

    if(decode) {
        req.userId = decode.id
        next();
    }
    res.status(403).json({
        message : 'you are not signed in '
    })
}

module.exports = { userMiddleware }