var express = require('express')
var router = express.Router();

router.get('/allbatches', function (req, res) {
    
    res.send({
        code: 0,
        message: 'v1 running'
    })
})


router.get('/batch/:name', function (req, res) {
    res.send({
        code: 0,
        message: 'v1 running'
    })
})


router.post('/newbatch', function (req, res) {
    res.send({
        code: 0,
        message: 'v1 running'
    })
})


module.exports = router;
