const router = require('express').Router()
const StateController = require('../controllers/state.controller')

router.get('/', StateController.getStates)

module.exports = router