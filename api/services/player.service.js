const Player = require('../../models/player.model')

class PlayerService {
    async listPlayers() {
        try {
            const player = await Player.findAndCountAll()

            return player
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }

    async getPlayer(query) {
        try {
            const player = await Player.findOne({ where: query })

            return player
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }

    async createPlayer(body) {
        try {
            const player = await Player.create(body)

            return player
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }

    async updatePlayer(id, body) {
        try {
            const player = await Player.update(body, { where: { id } })

            return player
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }

    async deletePlayer(id) {
        try {
            await Player.destroy({ where: { id } })
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }
}

module.exports = new PlayerService()