const StateService = require('../services/state.service');

class StateController {
    async getStates(req, res) {
        try {
            const states = await StateService.getStates(req.query.keyword)

            res.status(200).json({ success: true, data: states })
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

module.exports = new StateController()