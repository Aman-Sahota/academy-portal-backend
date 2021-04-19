const State = require('../../models/state.model')
const Op = require('sequelize').Op

class StateService {
    async getStates(keyword='') {
        try {
            const states = await State.findAll({
                where:{
                    name: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })

            return states
        } catch (error) {
            throw new Error(JSON.stringify({ code: 500, message: `Internal Server error-${error.message}` }))
        }
    }
}

module.exports = new StateService()