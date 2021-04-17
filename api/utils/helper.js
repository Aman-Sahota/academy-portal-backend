require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
    encryptPassword: async function(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash
    },
    comparePassword: async function(password, hash) {
        if (typeof password !== 'string') {
            password = password.toString();
        }
        return await bcrypt.compare(password, hash)
    },

    generateToken: async function(payload, duration = '6 hours') {
        let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration })
        return token
    },

    verifyToken: async function(token) {
        token = token.replace('Bearer ', '')
        let payload = await jwt.verify(token, process.env.JWT_SECRET)
        return payload
    }
}