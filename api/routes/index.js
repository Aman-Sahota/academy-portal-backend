const router = require('express').Router()

const authRoutes = require('./auth.routes')
const playerRoutes = require('./player.routes')
const stateRoutes = require('./state.routes')

const jwtmiddleware = require('../middleware/jwtmiddleware')

router.use('/auth', authRoutes);
router.use('/player',jwtmiddleware, playerRoutes);
router.use('/state', stateRoutes)

module.exports = router