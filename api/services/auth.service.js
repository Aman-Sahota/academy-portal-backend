const User = require('../../models/user.model')

class AuthService {
    async findUserByEmail(email) {
        try {
            console.log(222, email)
            const user = await User.findOne({
                where: {
                    email
                }
            })

            return user
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }

    async createUser(body) {
        try {
            const user = await User.create(body)

            return user
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }
}

module.exports = new AuthService()