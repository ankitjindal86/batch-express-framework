
var router = require('express').Router()
    , batch = require('../model/batch');


router.get('/', function (req, res) {

    batch.getAllJobs(function (response) {
        if (response.code === 0) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    });
})


router.get('/:jobId', function (req, res) {

    batch.findJob(req.query.jobId,
        function (response) {
            if (err) {
                res.status(200).json(response);
            } else {
                res.status(500).json(response);
            }
        });
})


router.post('/', function (req, res) {
    batch.createJob(req.body)
        .then((successmsg) => {
            res.status(200).json({
                code: 0,
                message: successmsg,
            })
        })
        .error((errmsg) => {
            res.status(500).json({
                code: -1,
                message: err.message,
            });
        })
});

module.exports = router
