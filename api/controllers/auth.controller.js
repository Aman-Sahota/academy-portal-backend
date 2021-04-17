const AuthService = require('../services/auth.service');
const validator = require('../utils/validator');
const { encryptPassword, comparePassword, generateToken } = require('../utils/helper')

class AuthController {
    async register(req, res) {
        try {
            let requestBody = Object.assign({}, req.body);

            const validationResult = await validator.validate(requestBody, {
                first_name: { presence: { allowEmpty: false } },
                email: { presence: { allowEmpty: false }, email: true },
                password: { presence: { allowEmpty: false }, length: { minimum: 6 } },
            })

            if (validationResult) {
                throw new Error({ code: 400, message: `Validation Error - ${validationResult}` })
            }

            const findUser = await AuthService.findUserByEmail(requestBody.email)
            if (findUser) {
                throw new Error({ code: 400, message: 'Email already exists' })
            }

            requestBody.password = await encryptPassword(requestBody.password);

            const createdUser = await AuthService.createUser(requestBody)

            res.status(200).json({ success: true, data: { user: createdUser, token: await generateToken(createdUser) } })

        } catch ({ message, code }) {
            res.status(code).json({
                success: false,
                error: message
            })
        }
    }

    async login(req, res) {
        try {
            let requestBody = Object.assign({}, req.body);

            const validationResult = await validator.validate(requestBody, {
                email: { presence: { allowEmpty: false }, email: true },
                password: { presence: { allowEmpty: false } },
            })

            if (validationResult) {
                throw new Error({ code: 400, message: `Validation Error - ${validationResult}` })
            }

            const findUser = await AuthService.findUserByEmail(requestBody.email)
            if (!findUser) {
                throw new Error({ code: 400, message: 'User not found' })
            }

            const isPwdMatched = await comparePassword(requestBody.password, findUser.password)
            if (!isPwdMatched) {
                throw new Error({ code: 401, message: "Email or password is incorrect" })
            }

            res.status(200).json({ success: true, data: { user: findUser, token: await generateToken(findUser) } })
        } catch ({ message, code }) {
            res.status(code).json({
                success: false,
                error: message
            })
        }
    }
}

module.exports = new AuthController()