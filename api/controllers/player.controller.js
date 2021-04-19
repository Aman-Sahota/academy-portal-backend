const PlayerService = require('../services/player.service')

const PlayerSchema = {
    name: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false }, email: true },
    password: { presence: { allowEmpty: false }, length: { minimum: 6 } },
}

class PlayerController {
    async getPlayer(req, res) {
        try {
            const id = req.params.id
            if (id) {
                const player = await PlayerService.getPlayer({ id })
                if (!player) {
                    throw new Error(JSON.stringify({ code: 400, message: "Requested Player Not Found" }))
                }

                return res.status(200).json({ success: true, data: player })
            }

            const playerList = await PlayerService.listPlayers();

            res.status(200).json({ success: true, data: playerList })
        } catch (error) {
            console.log(1212, error)
            error = JSON.parse(error.message)
            res.status(error.code).json({
                success: false,
                message: error.message,
                data: error.data
            })
        }
    }

    async createPlayer(req, res) {
        try {
            let requestBody = Object.assign({}, req.body);

            const validationResult = await validator.validate(requestBody, PlayerSchema)
            if (validationResult) {
                throw new Error(JSON.stringify({ code: 400, message: 'Validation Error', data: validationResult }))
            }
            
        } catch (error) {
            console.log(1212, error)
            error = JSON.parse(error.message)
            res.status(error.code).json({
                success: false,
                message: error.message,
                data: error.data
            })
        }
    }

    async updatePlayer(req, res) {
        try {
            const id = req.params.id

            const player = await PlayerService.getPlayer({ id })
            if (!player) {
                throw new Error(JSON.stringify({ code: 400, message: "Requested Player Not Found" }))
            }

            let requestBody = Object.assign({}, req.body);

            const validationResult = await validator.validate(requestBody, PlayerSchema)
            if (validationResult) {
                throw new Error(JSON.stringify({ code: 400, message: 'Validation Error', data: validationResult }))
            }

        } catch (error) {
            console.log(1212, error)
            error = JSON.parse(error.message)
            res.status(error.code).json({
                success: false,
                message: error.message,
                data: error.data
            })
        }
    }

    async deletePlayer(req, res) {
        try {
            const id = req.params.id

            await PlayerService.deletePlayer(id)

            res.status(200).json({ success: true })
        } catch (error) {
            console.log(1212, error)
            error = JSON.parse(error.message)
            res.status(error.code).json({
                success: false,
                message: error.message,
                data: error.data
            })
        }
    }
}

module.exports = new PlayerController()