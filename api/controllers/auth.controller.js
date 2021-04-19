const AuthService = require('../services/auth.service');
const validator = require('../utils/validator');
const { encryptPassword, comparePassword, generateToken } = require('../utils/helper')

class AuthController {
    async register(req, res) {
        try {
            let requestBody = Object.assign({}, req.body);

            const validationResult = await validator.validate(requestBody, {
                name: { presence: { allowEmpty: false } },
                email: { presence: { allowEmpty: false }, email: true },
                password: { presence: { allowEmpty: false }, length: { minimum: 6 } },
            })

            if (validationResult) {
                throw new Error(JSON.stringify({ code: 400, message: 'Validation Error', data: validationResult }))
            }

            const findUser = await AuthService.findUserByEmail(requestBody.email)
            if (findUser) {
                throw new Error(JSON.stringify({ code: 400, message: 'Email already exists' }))
            }

            requestBody.password = await encryptPassword(requestBody.password);

            const createdUser = await AuthService.createUser(requestBody)

            res.status(200).json({ success: true, data: { user: createdUser, token: await generateToken(createdUser.dataValues) } })

        } catch (error) {
            error = JSON.parse(error.message)
            res.status(error.code).json({
                success: false,
                message: error.message,
                data: error.data
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
                throw new Error(JSON.stringify({ code: 400, message: 'Validation Error', data: validationResult }))
            }

            const findUser = await AuthService.findUserByEmail(requestBody.email)
            if (!findUser) {
                throw new Error(JSON.stringify({ code: 400, message: 'Email or password is incorrect' }))
            } else {
                const isPwdMatched = await comparePassword(requestBody.password, findUser.password)
                if (!isPwdMatched) {
                    throw new Error(JSON.stringify({ code: 401, message: "Email or password is incorrect" }))
                }
            }

            res.status(200).json({ success: true, data: { user: findUser, token: await generateToken(findUser.dataValues) } })
        } catch (error) {
            error = JSON.parse(error.message)
            res.status(error.code).json({
                success: false,
                message: error.message,
                data: error.data
            })
        }
    }
}

module.exports = new AuthController()