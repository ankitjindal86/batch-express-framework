var express = require('express')
    ,router = express.Router();

router.get('/v1', function (req, res) {
    res.send({
        code: 0,
        message: 'v1 running'
    })
});

router.use('/v1/jobs', require('./jobs'));

module.exports = router;

