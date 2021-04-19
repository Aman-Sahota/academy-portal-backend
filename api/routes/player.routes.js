const PlayerController = require('../controllers/player.controller')
const PlayerUpload = require('../middleware/multer')

const router = require('express').Router()

router.route('/:id?')
    .get(PlayerController.getPlayer)
    .post(PlayerUpload.any(), PlayerController.createPlayer)
    .put(PlayerUpload.any(), PlayerController.updatePlayer)
    .delete(PlayerController.deletePlayer)

module.exports = router