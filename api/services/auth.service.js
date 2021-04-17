const User = require('../../models/user.model')

class AuthService {
    async findUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })

            return user
        } catch (error) {
            console.log("error", error)
            throw new Error({ code: 500, message: "Internal Server error" })
        }
    }

    async createUser(body) {
        try {
            const user = await User.create(body)

            return user
        } catch (error) {
            console.log("error", error)
            throw new Error({ code: 500, message: "Internal Server error" })
        }
    }
}

module.exports = new AuthService()