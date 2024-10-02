const router = require('express').Router()

function getRoot(req, res) {
    res.json('Healthcheck')
}
router.route('/').get(getRoot)

module.exports = router;